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

const appBarStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    button: {},
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

  return (
    <div>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography variant='h4' className={appBarClasses.root}>
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
        <Route exact path='/login'>
          <div>
            <h1>Login</h1>
          </div>
        </Route>
        <Route exact path='/register'>
          <div>
            <h1>Register</h1>
          </div>
        </Route>
        <Route exact path='/home'>
          <div>
            <h1>Home</h1>
          </div>
        </Route>

        {/* Palettes */}
        <Route exact path='/create-palette'>
          <div>
            <h1>Create palette</h1>
          </div>
        </Route>
        <Route exact path='/view-palette/:paletteId'>
          <div>
            <h1>Create palette</h1>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
