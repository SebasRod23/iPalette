import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import axios from 'axios';

import LoginPage from './containers/auth/LoginPage';
import { UserContextProvider } from './contexts/UserContext';
import RegisterPage from './containers/auth/RegisterPage';
import HomePage from './containers/palettes/Home';
import CreatePage from './containers/palettes/CreatePage';
import UpdatePage from './containers/palettes/UpdatePage';
import LandingPage from './containers/LandingPage';

const appBarStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'space-between',
    },
  }),
);

const App: React.FC = () => {
  const [isAuth, setAuth] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const appBarClasses = appBarStyles();

  useEffect(() => {
    if (document.cookie.indexOf('existToken') >= 0) {
      login();
    } else {
      logout();
    }

    // eslint-disable-next-line
  }, []);

  const login = () => {
    setAuth(true);
    if (
      location.pathname === '/' ||
      location.pathname === '/login' ||
      location.pathname === '/register'
    )
      history.push('/home');
  };

  const logout = () => {
    axios('http://localhost:3001/auth/logout', {
      method: 'POST',
      responseType: 'json',
      withCredentials: true,
    }).then(
      () => {},
      (error) => {
        if (error.response!.status === 401)
          console.log('Token not available or expired');
        else console.log(error);
      },
    );
    setAuth(false);
    if (
      location.pathname !== '/' &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    )
      history.push('/login');
  };

  let userContextValue = {
    login,
    logout,
  };

  return (
    <div>
      <UserContextProvider value={userContextValue}>
        <AppBar position='static'>
          <Toolbar variant='dense'>
            <Typography variant='h5' className={appBarClasses.root}>
              iPalette
            </Typography>

            {isAuth ? (
              <Button color='inherit' onClick={() => logout()}>
                Logout
              </Button>
            ) : (
              <Button color='inherit' onClick={() => history.push('/login')}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/login'>
            <LoginPage />
          </Route>
          <Route exact path='/register'>
            <RegisterPage />
          </Route>
          <Route exact path='/home'>
            <HomePage />
          </Route>

          {/* Palettes */}
          <Route exact path='/create-palette'>
            <CreatePage />
          </Route>
          <Route exact path='/edit-palette/:paletteId'>
            <UpdatePage />
          </Route>
        </Switch>
      </UserContextProvider>
    </div>
  );
};

export default App;
