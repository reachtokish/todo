import React from 'react';
import { addTodo } from './../actions/addTodo';
import { connect } from 'react-redux';
import BucketList from './bucketList.js';
import { DashboardContext } from './../context';
import { store } from './../store';
import DB from './../dexieConfig';

class AddTodoForm extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
            bucket: "1",
            currentBucket: null
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		})
	}

	handleSubmit(event) {
        event.preventDefault();
        const currentTodo = store.getState().todos.currentTodo;
        const { title, description, currentBucket } = this.state;
        if(title && description && currentBucket) {
            if(currentTodo) {
                currentTodo.title = title;
                currentTodo.description = description;
                currentTodo.bucket_id = currentBucket.id;
                const { dispatch } = this.props;
                    const { toggleModal } = this.context;
                    dispatch(addTodo(currentTodo))
                        .then(
                            res => {
                                toggleModal("todoFormVisible", false)
                            }
                        );
            }
            else {
                    const { user } = this.props.currentUser;
                    const req = {
                        title,
                        description,
                        bucket_id: currentBucket.id,
                        user_id: user.id,
                        date_added: new Date(),
                        is_done: false
                    }
                    const { dispatch } = this.props;
                    const { toggleModal } = this.context;
                    dispatch(addTodo(req))
                        .then(
                            res => {
                                toggleModal("todoFormVisible", false)
                            }
                        );
                
            }
        }
        else {
            alert("* Marked field can't be empty");
        }
    }

    componentDidMount() {
        const currentTodo = store.getState().todos.currentTodo;
        if(currentTodo) {
            DB.buckets.where('id').equals(currentTodo.bucket_id).toArray(bucket => {
                this.setState({
                    title: currentTodo.title,
                    description: currentTodo.description,
                    currentBucket: bucket[0]
                })
            });
        }
    }
    
    render() {
        const { title, description, currentBucket } = this.state;
        const { toggleModal } = this.context;
        const currentTodo = store.getState().todos.currentTodo;
        return (
            <div className="modal">
                <div className="modal_backdrop" onClick={() => toggleModal("todoFormVisible", false)}></div>
                <div className="modal_content">
                    <header className="modal_header">
                        <h2>Add Todo</h2>
                        <button className="modal_close_btn" onClick={() => toggleModal("todoFormVisible", false)}>X</button>
                    </header>
                    <div className="modal_body">
                        <form onSubmit={this.handleSubmit}>
                            <table className="form_table" border="0" cellPadding="" cellSpacing="0">
                                <tbody>
                                    <tr>
                                        <th>Title*</th>
                                        <td>
                                            <input
                                                name="title"
                                                className="form_input"
                                                value={title}
                                                onChange={this.handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Description*</th>
                                        <td>
                                            <textarea
                                                name="description"
                                                className="form_input"
                                                value={description}
                                                onChange={this.handleChange}
                                            ></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Bucket*</th>
                                        <td>
                                            <BucketList
                                                bucket={currentBucket}
                                                onBucketSelect={(bucket) => {
                                                    this.setState({
                                                        currentBucket: bucket
                                                    })
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>
                                            <button className="form_btn">{currentTodo ? "Update Todo" : "Add Todo"}</button>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddTodoForm.contextType = DashboardContext;

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps)(AddTodoForm);