import React, { Component } from 'react';
import './Home.css';


import { Link } from 'react-router-dom';
import sitting from '../sitting-2@2x.png';
import standing from '../standing-9.png';



class Home extends Component {

  render() {
    return (
      <div>
      <h1 className='h1'>Zapify</h1>
      <h3 className='h3'>Get instant access to unique opportunities in open finance.</h3>
<img src={sitting} className="App-logo" alt="logo" />
<img src={standing} className="App-logo1" alt="logo" />
<Link to='/zap1'><button type="submit" className="button">Go to UNI-DAI</button></Link>

<Link to='/zap2'><button type="submit" className="buttonn">Go to UNI-MKR</button></Link>

<Link to='/zap3'><button type="submit" className="button2">Go to UNI-SETH</button></Link>

</div>
    );
  }
}

export default Home;