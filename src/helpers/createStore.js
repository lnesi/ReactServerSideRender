import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../client/reducers";
import axios from "axios";


export default request => {
	//The base url here is the full http url to api
	//We pass the cookie from the request to the SSR server and we passit to the API servr wiith axios
	const axiosInstance = axios.create({
		baseURL: "http://react-ssr-api.herokuapp.com",
		headers: {
			cookie: request.get("cookie") || ""
		}
	});
	const store = createStore(
		reducers,
		{},
		applyMiddleware(thunk.withExtraArgument(axiosInstance))
	);
	return store;
};