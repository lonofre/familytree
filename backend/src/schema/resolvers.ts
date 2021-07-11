import { personDao } from "../db";

const resolvers = {
    Query: {
        person: (parent: any, {id}: any) => {
            const person = personDao.find(id);
            return person;
        }
    }
};

export default resolvers;