const puppeteer = require('puppeteer');

module.exports = {
	screenshot: async (req) => {
		try {
			const url = req.query.url;
			let selector = req.query.selector;

			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.goto(url);

			if (!selector) selector = 'html';

			await page.waitForSelector('#checkbox');
			await page.evaluate(() => {
				document.querySelector('#checkbox')?.parentElement?.click();
			});

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
