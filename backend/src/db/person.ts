import { Database } from 'better-sqlite3';

interface Person{
    id: number;
    name: String;
    lastname: String;
    birthdate: String;  
}

export interface PersonDao {
    
    /**
     * Adds a person to the database
     * @param person 
     * @returns true if the operation was succesfull, otherwise false
     */
    addPerson(person: Person): boolean;

    /**
     * Gets a person from the database
     * @param id
     * @returns a object Person
     */
    find(id: number): Person;

    /**
     * Deletes a person given her id
     * @param id 
     * @returns true if the operation was succesfull, otherwise false
     */
    deletePerson(id: number): boolean;
}



export class PersonDaoImp implements PersonDao{
    
    db: Database;

    constructor(db : Database){
        this.db = db;
    }


    addPerson(person: Person): boolean {
        const statment = this.db.prepare('INSERT INTO person (name, lastname, birthdate) VALUES (?,?,?)');
        const info = statment.run();
        return info.changes > 0;
    }

    find(id: number): Person {
        const statment = this.db.prepare('SELECT * FROM person WHERE id = ?');
        const person = statment.get(id);
        return person;
    }

    deletePerson(id: number): boolean {
        throw new Error('Method not implemented.');
    }

}
