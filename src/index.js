import express from 'express';
import renderer from './helpers/renderer';
import createStore from './createStore';

const app = express();

app.use(express.static('public'));

app.get('*',(req,res)=>{
	const store = createStore();
	res.send(renderer(req,store));
});


app.listen(3000,()=>{
	console.log("Server started on port 3000");
});

