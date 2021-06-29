import express from 'express';

const app = express();
const PORT: number = 3000;

app.get('/', (req, res) => {
    res.send('Hello there');
});

app.listen(PORT, () => {
    console.log(`🚀🚀🚀 Listen on PORT ${PORT} `);    
});