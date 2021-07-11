import { gql } from "apollo-server-core";

const typeDefs = gql`
    type Person {
        id: ID!,
        name: String,
        lastname: String
        birthdate: String
    }

    type Query {
        person(id: ID!): Person
    }

    type Mutation {
        addPerson: Person
    }
`;

export default typeDefs;