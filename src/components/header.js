import React from 'react';
import logoutIco from './../assets/images/logout.svg';
import { connect } from 'react-redux';
import { logout } from './../actions/logout';

class Header extends React.Component {
    handleLogout() {
        const { dispatch } = this.props;
        dispatch(logout());
    }

    render() {
        return (
            <header className="site_header">
                <div className="header_left">
                    <h1 className="logo">Todo App</h1>
                </div>
                <div className="header_right">
                    {this.props.currentUser && this.props.currentUser.user && <span>Welcome, {this.props.currentUser.user.first_name}</span>}
                    <button className="logoout_btn" onClick={this.handleLogout.bind(this)}>
                        <img src={logoutIco} alt="" />
                    </button>
                </div>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps)(Header);