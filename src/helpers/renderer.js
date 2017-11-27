import React from "react";
import { renderToString } from "react-dom/server";
import Routes from "../client/Routes";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";

//This function will escape the state to avoid XSS attaks
import serialize from "serialize-javascript";

export default (request, store, context) => {
	const content = renderToString(
		<Provider store={store}>
			<StaticRouter location={request.path} context={context}>
				<div>{renderRoutes(Routes)}</div>
			</StaticRouter>
		</Provider>
	);
	const helmet = Helmet.renderStatic();
	return `
		<html>
			<head>
				${helmet.title.toString()}
				${helmet.meta.toString()}
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
			</head>
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