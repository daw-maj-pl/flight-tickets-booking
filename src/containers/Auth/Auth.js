import { useState } from 'react';
import axios from 'axios';

import classes from './Auth.module.css';

const Auth = props => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const onAuth = (email, password, isSignUp) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCLZFJE_-7i2dEmYWg-3KyljWToWf5IBZY';
    if (!isSignUp) {
      url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCLZFJE_-7i2dEmYWg-3KyljWToWf5IBZY';
    }

    axios
      .post(url, authData)
      .then(response => {
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        props.history.push('/');
        props.history.go(0);
      })
      .catch(err => {
        alert(err.response.data.error.message);
      });
  };

  const handleEmailChange = event => {
    setEmailValue(event.target.value);
  };

  const handlePasswordChange = event => {
    setPasswordValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onAuth(emailValue, passwordValue, isSignUp);
  };

  const handleSignInClick = () => {
    setIsSignUp(true);
  };
  const handleSignUpClick = () => {
    setIsSignUp(false);
  };

  return (
    <div className={classes.Auth}>
      <form onSubmit={handleSubmit}>
        <div className={classes.Input}>
          <label className={classes.Label}>E-mail:</label>
          <input
            className={classes.InputElement}
            type="email"
            value={emailValue}
            onChange={handleEmailChange}
          ></input>
        </div>
        <div className={classes.Input}>
          <label className={classes.Label}>Hasło: </label>
          <input
            className={classes.InputElement}
            type="password"
            value={passwordValue}
            onChange={handlePasswordChange}
          ></input>
        </div>
        <button onClick={handleSignInClick} className={classes.Button}>
          Zaloguj się
        </button>
        <button onClick={handleSignUpClick} className={classes.Button}>
          Zarejestruj się
        </button>
      </form>
    </div>
  );
};

export default Auth;
