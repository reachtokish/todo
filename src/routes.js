import React, { Component } from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import { history } from './history';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem("user") && localStorage.getItem("user") !== null ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: `${process.env.PUBLIC_URL}/`,
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem("user") && localStorage.getItem("user") !== null ? (
                <Redirect
                    to={{
                        pathname: `${process.env.PUBLIC_URL}/dashboard`,
                        state: { from: props.location }
                    }}
                />
            ) : (
                <Component {...props} />
            )
        }
    />
);

export class RouteComponent extends Component {
    render() {
        return (
            <Router history={history}>
                <PublicRoute exact path={'/'} component={Login} />
                <PrivateRoute path={'/dashboard'} component={Dashboard} />
            </Router>
        )
    }
}