const puppeteer = require('puppeteer');
const axios = require('axios');

module.exports = {
	ethermine_graph: async (req) => {
		try {
			const url = req.query.url;

			const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
			const page = await browser.newPage();
			await page.goto(url, {
				waitUntil: 'load',
				timeout: 0,
			});

			await page.waitForSelector('#checkbox');
			await page.evaluate(() => {
				document.querySelector('#checkbox')?.parentElement?.click();
			});

			const selector = 'svg.highcharts-root';
			await page.waitForSelector(selector);
			const rect = await page.evaluate((selector) => {
				const element = document.querySelector(selector);
				if (!element) return null;
				const { x, y, width, height } = element.getBoundingClientRect();
				return { left: x, top: y, width, height, id: element.id };
			}, selector);

			if (!rect) throw Error(`Could not find element that matches selector: ${selector}.`);

			const image = await page.screenshot({
				clip: {
					x: rect.left,
					y: rect.top,
					width: rect.width,
					height: rect.height,
				},
			});

			await browser.close();

			return image;
		} catch (err) {
			throw err;
		}
	},
};
