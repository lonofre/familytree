const personTable = `
    CREATE TABLE IF NOT EXISTS person ( 
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        name            VARCHAR,
        lastname        VARCHAR,
        birthdate        VARCHAR
    )`;

export default [personTable];