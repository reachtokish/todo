import React from 'react';
import { connect } from 'react-redux';
import enhanceWithClickOutside from 'react-click-outside';
import { DashboardContext } from './../context';

class BucketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdownVisible: false,
            bucketList: [],
            selectedBucket: null,
            currentBucket: null
        }
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown() {
        this.setState(prevState => ({
            isDropdownVisible: !prevState.isDropdownVisible
        }))
    }

    handleClickOutside() {
        this.setState(prevState => ({
            isDropdownVisible: false
        }))
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            currentBucket: nextProps.bucket
        }
    }

    render() {
        const { isDropdownVisible, currentBucket } = this.state;
        const { toggleModal } = this.context;
        const { buckets, onBucketSelect } = this.props;
        return (
            <div className="bucket_list_dropdown">
                <div className="bucket_list_selected" onClick={this.toggleDropdown}>
                    {currentBucket ? currentBucket.title : "Choose Bucket"}
                </div>
                {isDropdownVisible && <div className="bucket_list_list">
                    <ul>
                        {buckets.data && buckets.data.length <= 0 && <li style={{padding: "10px 15px", fontSize: "14px"}}>No buckets found</li>}
                        {buckets.data && buckets.data.map(el => (
                            <li
                                key={el.id}
                                className={"" + (currentBucket && el.id === currentBucket.id ? "active" : "")}
                            ><button type="button" onClick={() => {
                                this.setState({
                                    currentBucket: el
                                });
                                onBucketSelect(el);
                                this.toggleDropdown();
                            }}>{el.title}</button></li>
                        ))}
                    </ul>
                    <hr />
                    <button className="create_bucket" type="button" onClick={() => toggleModal("bucketFormVisible", true)}>Create new bucket</button>
                </div>}
            </div>
        )
    }
}

BucketList.contextType = DashboardContext;

function mapStateToProps(state) {
    return {
        buckets: state.buckets
    };
}

export default connect(mapStateToProps)(enhanceWithClickOutside(BucketList));