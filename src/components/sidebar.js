import React from 'react';
import { connect } from 'react-redux';
import { DashboardContext } from './../context';
import { setCurrentBucket } from './../actions/bucket';
import { getAllTodo } from './../actions/todo';
import { deleteBucket } from './../actions/bucket';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    changeBucket(bucket) {
        const { dispatch } = this.props;
        dispatch(setCurrentBucket(bucket))
            .then(
                res => {
                    dispatch(getAllTodo());
                }
            )
    }

    deleteBucket(bucket) {
        const confirm = window.confirm(`Are you sure you want to delete bucket id "${bucket.id}" ?`);
        if(confirm) {
            const { dispatch } = this.props;
            dispatch(deleteBucket(bucket));
        }
    }

    render() {
        const { toggleModal } = this.context;
        const { buckets } = this.props;
        return (
            <aside className="site_sidebar">
                <button className="add_todo" onClick={() => toggleModal('todoFormVisible', true)}>Add Todos +</button>
                <h3 className="bucket_title">
                    Buckets
                    <button className="add_bucket_btn" onClick={() => toggleModal("bucketFormVisible", true)}>Add+</button>
                </h3>
                <ul className="bucket_list">
                    {buckets.data && buckets.data.length <= 0 && <div style={{"padding": "15px"}}>No buckets available</div>}
                    {buckets.data && buckets.currentBucket && buckets.data.map(el => (
                        <li key={el.id} className={"" + (buckets.currentBucket.id === el.id ? "active" : "")}>
                            <button className="bucket_btn" onClick={() => this.changeBucket(el)}>{el.title}</button>
                            <button onClick={() => this.deleteBucket(el)} className="bucket_delete_btn">X</button>
                        </li>
                    ))}
                </ul>
            </aside>
        )
    }
}

Sidebar.contextType = DashboardContext;

function mapStateToProps(state) {
    return {
        buckets: state.buckets
    };
}

export default connect(mapStateToProps)(Sidebar);