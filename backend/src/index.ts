import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createTables } from './db';
import { typeDefs, resolvers } from './schema';


createTables();

const app = express();
const PORT: number = 3000;

const server : ApolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

server.start();
server.applyMiddleware({ app });

app.get('/', (req, res) => {
    res.send('Hello there');
});

app.listen(PORT, () => {
    console.log(`🚀 Listen on PORT ${PORT} `);    
    console.log(`🍿 GraphQL on http://localhost:${PORT}${server.graphqlPath}`);
});