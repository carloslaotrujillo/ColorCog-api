const getColorsFromUrl = () => (req, res) => {
	res.send("Get Colors From Url");
};

const getColorsFromFile = () => (req, res) => {
	res.send("Get Colors From File");
};

module.exports = {
	getColorsFromUrl: getColorsFromUrl,
	getColorsFromFile: getColorsFromFile,
};
