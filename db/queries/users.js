import db from "#db/client"



/*this will create a user and add it into our database.*/
export async function createUser(username, password){
    const sql =
    `
    INSERT INTO users 
    (username, password)
    VALUES ($1, $2)
    RETURNING *
    `;
    const {
        rows:[user]
    } = await db.query(sql, [username, password]);
    return user;
}

/*This will be used to verify credentials*/
export async function getUserByUsername(username){
    const sql =
    `
    SELECT * FROM users WHERE username = $1
    `;
    const {
        rows: [user],
    } = await db.query(sql, [username]);
    return user;
}

export async function getUserById(id){
    const sql =`
    SELECT * FROM users
    WHERE id = $1 `;
    const {
        rows: [user]
    } = await db.query(sql, [id]);
    return user;
}
