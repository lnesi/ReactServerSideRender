import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdmins } from "../actions";
import requireAuth from "../components/hocs/requireAuth";

class AdminsListPage extends Component {
	componentDidMount() {
		this.props.fetchAdmins();
	}
	renderAdmins() {
		return this.props.admins.map(admin => {
			return <li key={admin.id}>{admin.name}</li>;
		});
	}

	render() {
		return (
			<div>
				<p>Protected list of admins:</p>
				<ul>{this.renderAdmins()}</ul>
			</div>
		);
	}
}

function mapStateToProps({ admins }) {
	return { admins };
}

function loadData(store) {
	return store.dispatch(fetchAdmins());
}

export default {
	component: connect(mapStateToProps, { fetchAdmins })(requireAuth(AdminsListPage)),
	loadData
};