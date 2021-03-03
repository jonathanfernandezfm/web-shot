require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { screenshot } = require('./api/screenshot');
const { ethermine_graph } = require('./api/graph-ethermine');
const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
	res.json({ message: 'This api is for specific and personal use' });
});

app.get('/ethermine-shot', async (req, res) => {
	const image = await ethermine_graph(req);
	res.writeHead(200, { 'Content-Type': 'image/png' });
	res.end(image, 'binary');
});

app.listen(port, () => {
	console.log(`Server listening at ${port}`);
});
