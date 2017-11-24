import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";
class UsersListPage extends Component {
	componentDidMount() {
		 this.props.fetchUsers();
	}
	renderUsers() {
		return this.props.users.map(user => {
			return <li key={user.id}>{user.name}</li>;
		});
	}

	render() {
		return (
			<div>
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