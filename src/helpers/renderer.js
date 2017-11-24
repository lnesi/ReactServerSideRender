import React from "react";
import { renderToString } from "react-dom/server";
import Routes from "../client/Routes";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from 'react-router-config'

//This function will escape the state to avoid XSS attaks
import serialize from 'serialize-javascript';

export default (request, store) => {
	const content = renderToString(
		<Provider store={store}>
			<StaticRouter location={request.path} context={{}}>
				<div>{renderRoutes(Routes)}</div>
			</StaticRouter>
		</Provider>
	);
	return `
		<html>
			<head></head>
			<body>
				<div id="root">${content}</div>
				<script>
					window.INITIAL_STATE = ${serialize(store.getState())}
				</script>
				<script src="bundle.js"></script>
			</body>
		</html>
	`;
};