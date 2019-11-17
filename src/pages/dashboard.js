import React from 'react';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="App">
				<header>
					<h1>Header</h1>
					<button>Logout</button>
				</header>
				<aside>
					<h3>Sidebar</h3>
					<button>Add Todos +</button>
					<h4>Bucket List</h4>
					<button>Bucket 1</button>
					<button>Bucket 2</button>
					<button>Bucket 3</button>
					<h4>Todo List</h4>
					<div>
						<p>Todo 1</p>
						<p>Todo Description</p>
						<button>Edit</button>
						<button>Delete</button>
						<hr />
					</div>
					<div>
						<p>Todo 2</p>
						<p>Todo Description</p>
						<button>Edit</button>
						<button>Delete</button>
						<hr />
					</div>
					<div>
						<p>Todo 3</p>
						<p>Todo Description</p>
						<button>Edit</button>
						<button>Delete</button>
						<hr />
					</div>
				</aside>
			</div>
		);
	}
}

export default Dashboard;