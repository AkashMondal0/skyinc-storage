import express from 'express';
import dotenv from 'dotenv';
import FileRouter from './routes/File';

dotenv.config();
const host = process.env.PRODUCTION_HOST || 'http://localhost:4001';
const port = process.env.PORT || 4001;   

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/file', FileRouter)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server running at ${host}`);
});