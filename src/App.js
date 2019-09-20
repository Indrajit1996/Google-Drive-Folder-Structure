import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import RootInnerFolder from './pages/RootInnerFolder';
import RootNestedFolder from './pages/RootNestedFolder';
import RootFolder from './pages/RootFolder';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
            <Route  exact strict path='/' component={RootFolder} />
            <Route  exact strict path='/:type' component={RootInnerFolder} />
            <Route  exact strict path='/:type/:id' component={RootNestedFolder} />
      </BrowserRouter>
    );

  }
}

export default App;
