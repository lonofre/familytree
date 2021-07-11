import Database from 'better-sqlite3';
import process from 'process';
import tables from './tables';
import { PersonDao, PersonDaoImp } from './person';

// DB Configuration
const db = new Database('familytree.db', { 
    verbose: console.log
});

export const personDao : PersonDao = new PersonDaoImp(db);

/**
 * Creates the tables if it's needed
 */
export function createTables(){    
    const statements = tables.map(table => db.prepare(table));
    const create = db.transaction(() => {
        statements.forEach(statement => statement.run());
    });
    create();
}




process.on('exit', () => db.close);