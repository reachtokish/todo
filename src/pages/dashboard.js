import React from 'react';
import { connect } from 'react-redux';
import Header from './../components/header';
import AddTodoForm from './../components/addTodoForm';
import AddBucketForm from './../components/addBucketForm';
import { DashboardContext } from './../context';
import Sidebar from './../components/sidebar';
import TodoList from './../components/todoList';
import { setCurrentUser } from './../actions/setCurrentUser';
import { getAllBucket } from './../actions/bucket';
import { getAllTodo } from './../actions/todo';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todoFormVisible: false,
			bucketFormVisible: false,
			status: "not done"
		}

		this.handleChange = this.handleChange.bind(this);

	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	toggleModal(key, value) {
		this.setState({
			[key]: value
		})
	}

	componentDidMount() {
		const { dispatch } = this.props;
		if(localStorage.getItem("user")) {
			const { dispatch } = this.props;
			dispatch(setCurrentUser(JSON.parse(localStorage.getItem("user"))))
				.then(
					res => {
						dispatch(getAllBucket())
							.then(
								res => {
									dispatch(getAllTodo());
								}
							);
					}
				);
		}
	}

	render() {
		const { todoFormVisible, bucketFormVisible, status } = this.state;
		return (
			<main>
				<Header />
				<DashboardContext.Provider
					value={{
						toggleModal: (key, value) => this.toggleModal(key, value)
					}}
				>
					{todoFormVisible && <AddTodoForm />}
					{bucketFormVisible && <AddBucketForm />}
					<Sidebar />
					<div className="body_content">
						<div className="body_title">
							<h2>Todos</h2>
							<select className="filter_todo" name="status" onChange={this.handleChange} value={status}>
								<option value="not done">Not Done</option>
								<option value="done">Done</option>
							</select>
						</div>
						<TodoList
							status={status}
						/>
					</div>
				</DashboardContext.Provider>
			</main>
		);
	}
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps)(Dashboard);