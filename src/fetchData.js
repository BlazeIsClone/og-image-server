const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = async (url) => {
  if (!url) return;

  const request = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => console.error(error));

  try {
    let response = await request.json();
    return { response };
  } catch {
    console.error("error fetching data");
    return { error: true };
  }
};
