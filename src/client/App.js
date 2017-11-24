import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { fetchCurrentUser } from './actions';
import {connect} from 'react-redux';

const App=({route})=>{
	return <div>
		<Header/>
		{renderRoutes(route.routes)}
	</div>
}

export default {
	component:connect(null,{fetchCurrentUser})(App),
	loadData:({dispatch})=>dispatch(fetchCurrentUser())
};