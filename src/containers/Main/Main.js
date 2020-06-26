import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/action/index';

const Main = (props) => {
    return (
        <div>
            <h1>
                This is main page.
            </h1>

            <h3>{ props.user.name }</h3>
            <p>{ props.user.email }</p>

            <div>
                <button onClick={ props.onLogout }>Logout</button>
            </div>
        </div>
    );
};

// Receive state from root reducer
const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

// Receive dispatch action from actions
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logoutAuth())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);