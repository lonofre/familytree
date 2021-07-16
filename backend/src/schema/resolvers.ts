import { personDao } from "../db";

const resolvers = {
    Query: {
        person: (parent: any, {id}: any) => {
            const person = personDao.find(id);
            const relatives = personDao.relatives(id);
            const personWithRelatives = {...person, relatives};
            return personWithRelatives;
        },
        persons: () => {
            const persons = personDao.findAll();
            return persons;
        }
    },
    Mutation: {
        addPerson: (parent: any, {person}: any) => {
            const result = personDao.addPerson(person);
            return result;
        }
    }
};

export default resolvers;