import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Navigation from './components/Navigation/Navigation';
import SignInPage from './pages/SignInPage/SignInPage';
import HomePage from './pages/HomePage/HomePage';
import AppPage from './pages/AppPage/AppPage';
import Credits from './components/Credits/Credits';

import store from './redux/store';
import { loadUser } from './redux/auth/authActions';

import './App.scss';

class App extends React.Component {
  componentDidMount = () => {
    store.dispatch(loadUser());
  };

  render = () => (
    <Provider store={store}>
      <div className='app'>
        <Navigation />

        <main id='main'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/sign_in' component={SignInPage} />
            <ProtectedRoute exact path='/face_detect' component={AppPage} />
          </Switch>
        </main>
        <Credits />
      </div>
    </Provider>
  );
}

export default App;
