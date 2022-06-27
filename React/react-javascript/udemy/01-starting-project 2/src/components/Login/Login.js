import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    }

    if (action.type === 'INPUT_BLUR') {
      return { value: state.value, isValid: action.value.includes('@') }
    }
  }
  return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT_PASSWORD') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailsState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    setFormIsValid(
        emailsState.value.includes('@') && passwordState.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT_PASSWORD', val: event.target.value });
    setFormIsValid(
        emailsState.isValid && passwordState.valid
    )
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailsState.value.includes('@'));
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.value.trim().length > 6);
    dispatchPassword({ type: 'USER_INPUT_PASSWORD' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailsState.value, passwordState.value);
  };

  return (
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div
              className={`${classes.control} ${
            emailsState.isValid === false ? classes.invalid : ''
        }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
                type="email"
                id="email"
                value={emailsState.value}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
            />
          </div>
          <div
              className={`${classes.control} ${
                  emailsState.valid === false ? classes.invalid : ''
        }`}
          >
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={passwordState.value}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn} disabled={!formIsValid}>
              Login
            </Button>
          </div>
        </form>
      </Card>
  );
};

export default Login;
