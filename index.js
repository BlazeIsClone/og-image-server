const chromium = require("chrome-aws-lambda");
const express = require("express");
const url = require("url");
require("dotenv").config();

const fetchData = require("./fetchData");

const app = express();
const port = 3080;

const API = process.env.API_ENTRY_POINT;
const endpoint = `${API}/theme`;

app.get("/og-image", async (req, res) => {
  const { title } = url.parse(req.url, true).query;

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  const { response: themeData } = await fetchData(endpoint);

  const styles = `
	@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

	body {
    background: url(${themeData.theme_metadata_ogimg});
		color: ${themeData.theme_appearance_on_primary};
		font-family: 'Ubuntu', sans-serif;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	main {
		margin-top: 220px;
	}

	h1 {
		font-size: 46px;
		font-weight: 700;
		margin-bottom: 0;
	}

	h5 {
		font-weight: 900;
		margin-bottom: 0;
		font-size: 24px;
		margin-top: 15px;
	}`;

  const renderString = (encodedString) => encodedString.replace(/\*/g, " ");

  const getContent = () =>
    `<html>
			<head>
				<style>${styles}</style>
			<head>
			<body>
				<main>
					<h1>${renderString(title)}</h1>
					<h5>Maya Creations</h5>
				</main>
			</body>
		</html>`;

  const html = getContent();
  await page.setContent(html);
  await page.setViewport({ width: 1200, height: 630 });
  const imageBuffer = await page.screenshot();
  await browser.close();

  res.setHeader("Content-Type", "image/jpg");
  res.setHeader(
    "Cache-Control",
    `public, immutable, no-transform, s-maxage=2592000, max-age=2592000`
  );

  res.send(imageBuffer);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
