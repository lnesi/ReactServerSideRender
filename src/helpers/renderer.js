import React from "react";
import { renderToString } from "react-dom/server";
import Routes from "../client/Routes";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";

export default (request, store) => {
	const content = renderToString(
		<Provider store={store}>
			<StaticRouter location={request.path} context={{}}>
				<Routes />
			</StaticRouter>
		</Provider>
	);
	return `
		<html>
			<head></head>
			<body>
				<div id="root">${content}</div>
				<script src="bundle.js"></script>
			</body>
		</html>
	`;
};