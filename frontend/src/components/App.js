import React, { Component } from 'react';

import Home from './Home.js';

import { Route ,Switch } from 'react-router-dom';
import Zap from './Zap.js';


class App extends Component {

  render() {
    return (
      <div>
        <Switch>
         <Route path='/' exact component={Home}/> 
         <Route path='/zap' exact component={Zap}/>
         </Switch>


      </div>

    );
      }
}