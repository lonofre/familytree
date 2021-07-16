import { Database, Integer } from 'better-sqlite3';

/**
 * A person with basic information to identify
 */
interface Person{
    id: number;
    name: string;
    lastname: string;
    birthdate: string;  
}


/**
 * Someone related to a person
 */
interface Relative {
    // This is correct, ot it's necessary to add child-parent ??? to replicate the db ????
    kindship: string,
    person: Person
}

export interface PersonDao {
    
    /**
     * Adds a person to the database
     * @param person 
     * @returns true if the operation was succesfull, otherwise false
     */
    addPerson(person: Person): Person;

    /**
     * Gets a person from the database WITH her relatives
     * @param id
     * @returns a object Person
     */
    find(id: number): Person;

    /**
     * Gets all person in the Database 
     * WITHOUT their relatives
     * @returns a list of Person
     */
    findAll(): Person[];

    /**
     * Gets the person's relatives, such as parents,
     * step-parents and adoptive parents
     * @return all relatives to that person
     */
    relatives(id: number): Relative[];

    /**
     * Deletes a person given her id
     * @param id 
     * @returns true if the operation was succesfull, otherwise false
     */
    deletePerson(id: number): Person;
}



export class PersonDaoImp implements PersonDao{
    
    db: Database;

    constructor(db : Database){
        this.db = db;
    }


    addPerson(person: Person): Person {
        const statement = this.db.prepare('INSERT INTO person (name, lastname, birthdate) VALUES (?,?,?)');
        const {name, lastname, birthdate} = person;
        const info = statement.run(name, lastname, birthdate);
        
        const lastId : string = info.lastInsertRowid.toString();
        const personInDB: Person = this.find(parseInt(lastId, 10));
        return personInDB;
    }

    find(id: number): Person {
        const statement = this.db.prepare('SELECT * FROM person WHERE id = ?');
        let person = statement.get(id);
        let relatives = this.relatives(id);
        person = {...person, ...{relatives: relatives}};
        return person;
    }

    findAll(): Person[] {
        const statement = this.db.prepare('SELECT * FROM person');
        const persons = statement.all();
        return persons;
    }

    deletePerson(id: number): Person {
        throw new Error('Method not implemented.');
    }

    relatives(id: number): Relative[] {
        const query = `
            SELECT person.*, relative.kindship
            FROM person
            INNER JOIN relative
            ON person.id = relative.parentId
            WHERE  relative.childId = ?
        `;
        const statement = this.db.prepare(query);
        const results = statement.all(id);

        // This is because returns a row and we want
        // an object - dic
        const relatives = results.map(result => {
            const {id, name, lastname, birthdate, kindship} = result;
            return {
                person: {id, name, lastname, birthdate},
                kindship: kindship
            }
        });
        return relatives;
    }
}
