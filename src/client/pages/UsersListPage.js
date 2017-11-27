import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";
import { Helmet } from "react-helmet";

class UsersListPage extends Component {
	componentDidMount() {
		this.props.fetchUsers();
	}
	renderUsers() {
		return this.props.users.map(user => {
			return <li key={user.id}>{user.name}</li>;
		});
	}
	head(){
		//React helmet expects only 1 single expression for content so we need to use es6 template string
		return (
			<Helmet>
				<title>{`${this.props.users.length} Users Loaded`} </title>
				<meta property="og:title" content="Users App" />
			</Helmet>	
		)
	}
	render() {
		return (
			<div>
				{this.head()}
				<p>Here's is a list of users:</p>
				<ul>{this.renderUsers()}</ul>
			</div>
		);
	}
}

function mapStateToProps({ users }) {
	return { users };
}

function loadData(store) {
	return store.dispatch(fetchUsers());
}

export default {
	component: connect(mapStateToProps, { fetchUsers })(UsersListPage),
	loadData
};