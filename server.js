// server.js
import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
