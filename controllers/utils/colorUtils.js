const fetchOptions = (type, src) => {
	const raw = JSON.stringify({
		user_app_id: {
			user_id: process.env.USER_ID,
			app_id: process.env.APP_ID,
		},
		inputs: [
			{
				data: {
					image: {
						[type]: src,
					},
				},
			},
		],
	});

	const requestOptions = {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: "Key " + process.env.PAT,
		},
		body: raw,
	};

	return requestOptions;
};

module.exports = { fetchOptions };
