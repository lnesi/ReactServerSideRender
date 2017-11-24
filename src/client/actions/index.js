export const FETCH_USERS='fetch_users';
//api is the axios instance we pass with redux thunk
//If i need to make a request to something that is not the api that runs throught the proxy i need to import the original axios library
export const fetchUsers = ()=>async (dispatch,getState,api)=>{
	const res = await api.get('/users');
	dispatch({
		type:FETCH_USERS,
		payload:res
	});
}