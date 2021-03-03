require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { image } = require('./api/image');
const { ethermine_graph } = require('./api/graph-ethermine');
const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
	res.json({ message: 'This api is for specific and personal use' });
});

app.get('/image.png', async (req, res) => {
	const img = await image();
	res.writeHead(200, { 'Content-Type': 'image/png' });
	res.end(img, 'binary');
});

app.get('/ethermine-shot', async (req, res) => {
	await ethermine_graph(req);
	res.status(200).json({});
});

app.listen(port, () => {
	console.log(`Server listening at ${port}`);
});
