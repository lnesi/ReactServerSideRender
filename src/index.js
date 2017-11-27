//Define helpers functions needed by babel to be able to use async await sintax
import "babel-polyfill";

import express from "express";
import proxy from 'express-http-proxy';
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import Routes from "./client/Routes";
import { matchRoutes } from "react-router-config";

const app = express();
//Setup proxy to make sthe render server forward the calls to our api so the cookie creation on auth is based on the main domain of the render server
app.use('/api',proxy('http://react-ssr-api.herokuapp.com',{
	proxyReqOptDecorator(opts){
		opts.headers['x-forwarded-host']='localhost:3000';
		return opts;
	}
}));

// We are going to attach the cookie that comes from the request to the render server and tell axios on the server side needs to use this cookie
// Basically axios is the key to differantiate from axios on browser level. 
//to do this we need ti use the extra argument of redux thunk create the instance of axios with custom settings and pass it as an extra atrgument to thunk
// for the server we woill do tis in the create store helper file


app.use(express.static("public"));

app.get("*", (req, res) => {
	const store = createStore(req);
	//Determine what components needs to be render depending on the route.
	//We need to know what component is needed to fetch the necesary data to create a initial store before render the app to be serve
	const promises=matchRoutes(Routes,req.path).map(({route})=>{
		return route.loadData ? route.loadData(store):null;
	}).map(promise=>{
		if(promise){
			return new Promise((resolve,reject)=>{
				promise.then(resolve).catch(resolve);
			});
		}

	});
	

	Promise.all(promises).then(()=>{
		const context = {};
		const content = renderer(req, store,context);
		if(context.url){
			return res.redirect(301,context.url);
		}
		if(context.notFound){
			res.status(404);
		}
		res.send(content);
	});
	
});

app.listen(3000, () => {
	console.log("Server started on port 3000");
});