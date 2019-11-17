import React from 'react';
import { RouteComponent } from './routes';
import { registerUser } from './actions/addUsers';
import { setCurrentUser } from './actions/setCurrentUser';
import { connect } from 'react-redux';

const users = [{
	id: 1,
	email: "test@gmail.com",
	password: "123",
	first_name: "Test",
	last_name: "Test",
	token: "D8THE409OPQ"
}, {
	id: 2,
	email: "admin@gmail.com",
	password: "123",
	first_name: "Admin",
	last_name: "Admin",
	token: "D8THE509OPQ"
}, {
	id: 3,
	email: "user@gmail.com",
	password: "123",
	first_name: "User",
	last_name: "User",
	token: "D8THE609OPQ"
}]

class App extends React.Component {

	componentDidMount() {
		for(let user of users) {
			registerUser("users", user);
		}
		if(localStorage.getItem("user")) {
			const { dispatch } = this.props;
			dispatch(setCurrentUser(JSON.parse(localStorage.getItem("user"))));
		}
	}
	
	render() {
		return (
			<RouteComponent />
		);
	}

}

export default connect()(App);