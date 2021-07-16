const personTable = `
    CREATE TABLE IF NOT EXISTS person ( 
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        name            VARCHAR,
        lastname        VARCHAR,
        birthdate        VARCHAR
    )`;

const relativeTable = `
    CREATE TABLE IF NOT EXISTS relative (
        parentId          INTEGER,
        childId           INTEGER,
        kindship          STRING,
        FOREIGN KEY (parentId) REFERENCES person(id),
        FOREIGN KEY (childId)  REFERENCES childId(id)
    )
`;

const tables = [personTable, relativeTable];

export default tables;