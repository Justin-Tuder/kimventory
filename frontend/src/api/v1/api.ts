import axios from 'axios';
import { _API_URL } from '../../global/Global';

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
