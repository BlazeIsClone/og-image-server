const chromium = require("chrome-aws-lambda");
const url = require("url");
require("dotenv").config();

const template = require("./template");
const fetchData = require("./fetchData");

const API = process.env.API_ENTRY_POINT;
const endpoint = `${API}/theme`;

const server = async (req, res) => {
  const { title } = url.parse(req.url, true).query;
  const { response: themeData } = await fetchData(endpoint);

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  const html = template(themeData, title);
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
};

module.exports = server;
