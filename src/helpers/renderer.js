import React from 'react';
import {renderToString} from 'react-dom/server';
import Routes from '../client/Routes';
import { StaticRouter } from 'react-router-dom';



export default (request,store)=>{
	const content= renderToString(
		<StaticRouter location={request.path} context={{}}>
			<Routes />
		</StaticRouter>
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
}