import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Login.module.css';
import * as actions from '../../store/action/index';

const Login = (props) => {

    // State management
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Email change handler function
    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    // Password change handler function
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    // Login submit handler function
    const loginSubmitHandler = async (e) => {
        e.preventDefault();

        // Validate userdata
        if (!email) {
            return setError('Email required!');
        } else if (!password || !password.length > 6) {
           return setError('Password must be long enough!');
        }

        // Call onLogin function that comes from actions file
        props.onLogin(email, password);
    };

    let showError;
    if (error) {
        showError = (
            <div style={{color:"#ff0000",
                    border:"1px solid #ff0000",
                    borderRadius:"3px",
                    backgroundColor:"#c7aeae",
                    padding:'5px'
                }}>
                {error}
            </div>
        );
    }

    if (props.error) {
        showError = (
            <div style={{color:"#ff0000",
                    border:"1px solid #ff0000",
                    borderRadius:"3px",
                    backgroundColor:"#c7aeae",
                    padding:'5px'
                }}>
                { props.error }
            </div>
        );
    }

    return (
        <div>
            <div className={classes.Login}>               
                {showError} 
                                
                <form>       
                    <h2>Login</h2>
                    <input 
                        className={ classes.Input }
                        onChange={ emailChangeHandler } 
                        type="email"
                        focus="true" 
                        placeholder="Email Address" 
                    />
                    <input 
                        className={ classes.Input }
                        onChange={ passwordChangeHandler } 
                        placeholder="Password"
                        type="password" 
                    />                        

                    <button onClick={ loginSubmitHandler }>Login</button>                        
                </form>

                <div className={ classes.GoToLogin } >
                    <p>Create new account</p>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
        </div>
    );
};

// Receive state from root reducer
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

// Receive dispatch action from actions
const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.loginAuth(email, password))
    }
};

// Connect Login function to redux
export default connect(mapStateToProps, mapDispatchToProps)(Login);