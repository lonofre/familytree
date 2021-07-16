import { gql } from "apollo-server-core";

const typeDefs = gql`
    
    """
    The who belongs to a family
    """
    type Person {
        id: ID!,
        name: String,
        lastname: String
        birthdate: String
        relatives: [Relative]
    }

    """
    Kinship between a two family members
    """
    enum Kindship {
        FATHER,
        MOTHER,
        STEPMOTHER,
        STEPFATHER,
        ADOPTIVE_FATHER,
        ADOPTIVE_MOTHER,
        UNKNWON
    }

    """
    This is useful to make connections between people,
    similar to a directed graph
    """
    type Relative {
        kindship: Kindship
        person: Person
    }

    """
    Just the input
    """
    input PersonInput {
        id: ID,
        name: String,
        lastname: String
        birthdate: String
    }


    type Query {
        
        """
        Searchs for a person given her id
        """
        person(id: ID!): Person

        """
        Gets all persons
        """
        persons: [Person]
    }

    type Mutation {
        
        """
        Adds a person to the database
        """
        addPerson(person: PersonInput): Person


    }
`

export default typeDefs;