import React, { Component } from 'react';

import Home from './Home.js';

import { Route ,Switch } from 'react-router-dom';
import Zap1 from './Zap1.js';
import Zap2 from './Zap2.js';

import Zap3 from './Zap3.js';


class App extends Component {

  render() {
    return (
      <div>
        <Switch>
         <Route path='/' exact component={Home}/> 
         <Route path='/zap1' exact component={Zap1}/>
         </Switch>
        
       
      </div>
      
    );
      }
}

export default App;