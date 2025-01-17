import axios from 'axios';

const _API_URL = 'http://localhost:8000/api/v1';

const post = async (url: string, data: object) => {
	try {
		let serverResponse = {};
		await axios
			.create({ baseURL: _API_URL })
			.post(url, data)
			.then((response) => {
				serverResponse = response.data;
			})
			.catch((error) => {
				serverResponse = error.response.data;
			});

		return serverResponse;
	} catch (error) {
		return error;
	}
};

export { post };

export default axios.create({
	baseURL: _API_URL,
});
