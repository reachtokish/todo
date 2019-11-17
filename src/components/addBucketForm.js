import React from 'react';
import { addBucket } from './../actions/addBucket';
import { connect } from 'react-redux';
import BucketList from './bucketList.js';
import { DashboardContext } from './../context';

class AddBucketForm extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			title: ""
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
		const { title } = this.state;
		const { user } = this.props.currentUser
		const req = {
			title,
			user_id: user.id,
			date_added: new Date()
		}
		const { dispatch } = this.props;
        dispatch(addBucket(req))
            .then(
                res => {
                    const { toggleModal } = this.context;
                    toggleModal("bucketFormVisible", false);
                }
            );
    }
    
    render() {
        const { title } = this.state;
        const { toggleModal } = this.context;
        return (
            <div className="modal">
                <div className="modal_backdrop" onClick={() => toggleModal("bucketFormVisible", false)}></div>
                <div className="modal_content">
                    <header className="modal_header">
                        <h2>Add Bucket</h2>
                        <button className="modal_close_btn" onClick={() => toggleModal("bucketFormVisible", false)}>X</button>
                    </header>
                    <div className="modal_body bucket_body">
                        <form onSubmit={this.handleSubmit}>
                            <table className="form_table" border="0" cellPadding="" cellSpacing="0">
                                <tbody>
                                    <tr>
                                        <th>Title</th>
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
                                        <th>&nbsp;</th>
                                        <th>
                                            <button className="form_btn">Add Bucket</button>
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

AddBucketForm.contextType = DashboardContext;

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps)(AddBucketForm);