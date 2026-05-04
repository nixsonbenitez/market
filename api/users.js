import express from "express";
import bcrypt from "bcrypt"
import {createUser} from "#db/queries/users"
import {createToken} from "#utils/jwt"
import { getUserByUsername } from "#db/queries/users";

const router = express.Router();

export default router;


//This will have conditions incase fields aren't filed out and hash the password for our database. if conditions are good, token will be attached.
router.post("/register", async (req, res) => {
    if(!req.body)   return res.status(400).send("need both username and password!")

    const {username, password} = req.body;
    if(!username|| !password)
        return res.status(400).send("We need both a username and a password")
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser(username, hashedPassword);
    const token = createToken({id: user.id})

    res.status(201).send(token);
})

//Similar to the register, however here, we will do a bcrypt.compare to make sure passwords match for the token to be verified and sent
//We also set a condition for the username as well.
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).send("Both fields must be filled")
    
    const user = await getUserByUsername(username);
    if(!user) return res.status(401).send("No user match!")
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) return res.status(401).send("Try again")

    const token = createToken ({id: user.id})
    res.send(token)
})
