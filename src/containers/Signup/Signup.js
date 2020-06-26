import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Signup.module.css';
import * as actions from '../../store/action/index';

const Signup = (props) => {

    // State management
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // Name change handler function
    const nameChangeHandler = (e) => {
        setName(e.target.value);
    }

    // Email change handler function
    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    // Password change handler function
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    // Comfirm password change handler function
    const confirmPasswordChangeHandler = (e) => {
        setConfirmPassword(e.target.value);
    }   

    // Signup button handler function
    const signupButtonHandler = async (event) => {
        event.preventDefault();
        
        // Validate userdata
        if (!name) {
            return setError('Name required!');
        } else if (name.length < 2) {
            return setError('Name must be long enough!');
        } else if (!email) {
            return setError('Email required!');
        } else if (!password || !password.length > 6) {
            return setError('Password must be long enough!');
        } else if (!confirmPassword) {
            return setError('Confitm Password required!');            
        } else if (confirmPassword !== password) {
            return setError('Confirm Password must be match with Password');
        }

        // Call onSignup function that comes from actions file 
        props.onSignup(name, email, password);
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
                { error }
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
        <React.Fragment>
            <div className={classes.Signup}>
                {showError}
                <form>       
                    <h2>Signup</h2>
                    <div className={ classes.Input }>
                        <input                             
                            type="text"                        
                            placeholder="Username"
                            onChange={ nameChangeHandler }
                            focus="true"
                        />

                        <input 
                            type="email"
                            placeholder="Email Address"
                            onChange={ emailChangeHandler }                        
                        /> 

                        <input 
                            type="password"
                            placeholder="Password"
                            onChange={ passwordChangeHandler }            
                        /> 
                        <input 
                            type="password"
                            placeholder="Confirm-Password"
                            onChange={ confirmPasswordChangeHandler }
                        /> 

                        <button onClick={ signupButtonHandler }>Signup</button>          
                    </div>
                </form>

                <div className={ classes.GoToSignup }>
                    <p>Go to login</p>
                    <Link to='/login'>Login</Link>
                </div>   
            </div>
        </React.Fragment>
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
        onSignup: (name, email, password) => dispatch(actions.signupAuth(name, email, password))
    };
};

// Connect Singup function to redux
export default connect(mapStateToProps, mapDispatchToProps)(Signup);