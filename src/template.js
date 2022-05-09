const renderString = (encodedString) => decodeURIComponent(encodedString);

const template = (themeData, title) => {
  return `<html>
			<head>
				<style>${styles(themeData)}</style>
			<head>
			<body>
				<main>
					<h1>${renderString(title)}</h1>
					<h5>Maya Creations</h5>
				</main>
			</body>
		</html>`;
};

const styles = (themeData) => {
  return `
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
};

module.exports = template;
