import React from 'react';
import logoutIco from './../assets/images/logout.svg';
import { connect } from 'react-redux';
import { deleteTodo, getAllTodo, setCurrentTodo } from './../actions/todo';
import { addTodo } from './../actions/addTodo';
import { DashboardContext } from './../context';

const Todo = (props) => {
    const { title, description, is_done } = props.todo;
    return (
        <div className="todo">
            <h3>{title}</h3>
            <p>{description}</p>
            <footer className="todo_footer">
                <button onClick={() => props.onDelete(props.todo)}>Remove</button>
                <button onClick={() => props.onStatusChange(props.todo)}>{is_done ? "Not Done" : "Done"}</button>
                <button onClick={() => props.onEdit(props.todo)}>Edit</button>
            </footer>
        </div>
    )
}

class TodoList extends React.Component {
    deleteTodo(todo) {
        const prompt = window.confirm(`Are you sure you want to delete todo id "${todo.id}" ?`);
        if(prompt) {
            const { dispatch } = this.props;
            dispatch(deleteTodo(todo));
        }
    }

    changeStatus(todo) {
        const req = todo;
        req.is_done = !req.is_done;
        const { dispatch } = this.props;
        dispatch(addTodo(req))
            .then(
                res => {
                    dispatch(getAllTodo());
                }
            )
    }

    editTodo(todo) {
        const { dispatch } = this.props;
        dispatch(setCurrentTodo(todo))
            .then(
                res => {
                    this.context.toggleModal("todoFormVisible", true);
                }
            )
    }

    render() {
        const { todos, status } = this.props;
        return (
            <div className="todo_list">
                {status === "not done" && todos.data && todos.data.filter(el => el.is_done === false).length <= 0 && <div>No todos in the list</div>}
                {status === "done" && todos.data && todos.data.filter(el => el.is_done === true).length <= 0 && <div>No todos in the list</div>}
                {todos.data && todos.data.map(el => (
                    <React.Fragment key={el.id}>
                        {status === "not done" && el.is_done === false && <Todo
                            todo={el}
                            onDelete={(todo) => this.deleteTodo(todo)}
                            onStatusChange={(todo) => this.changeStatus(todo)}
                            onEdit={(todo) => this.editTodo(todo)}
                        />}
                        {status === "done" && el.is_done === true && <Todo
                            todo={el}
                            onDelete={(todo) => this.deleteTodo(todo)}
                            onStatusChange={(todo) => this.changeStatus(todo)}
                            onEdit={(todo) => this.editTodo(todo)}
                        />}
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

TodoList.contextType = DashboardContext;

export default connect(mapStateToProps)(TodoList);