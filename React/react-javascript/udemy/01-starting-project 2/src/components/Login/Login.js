import React, { useState, useReducer, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from "../UI/Input/input";

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
  const { isValid: emailIsValid } = emailsState;
  const { isValid: passwordValid } = passwordState;

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailsState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'USER_INPUT_PASSWORD' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onLogin(emailsState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.activate();
    } else {
      passwordInputRef.current.activate();
    }
  };

  return (
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <Input
              ref={emailInputRef}
              id='email'
              label='E-mail'
              type='email'
              isValid={emailIsValid}
              value={emailsState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
          />
          <Input
              ref={passwordInputRef}
              id='password'
              label='Password'
              type='password'
              isValid={passwordValid}
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
          />
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
