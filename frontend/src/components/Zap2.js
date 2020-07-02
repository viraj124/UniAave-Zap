import React, { Component } from 'react';

import './Zap1.css';
import Web3 from 'web3'; 
import AavUniZap from '../abis/AavUniZap.json'
import LendingPool from '../abis/LendingPool.json'
import LendingPoolCore from '../abis/LendingPoolCore.json'

class Zap4 extends Component {


async loadBlockchainData() {

  const accounts = await this.state.web3.eth.getAccounts()
  this.setState({ account: accounts[0] })
  console.log(this.state.account);

  const ethBalance = await this.state.web3.eth.getBalance(this.state.account)
  this.setState({ ethBalance })
  
  // Load Aaveunizap  
  const zapAddress = "0xb5A0C6C3A0FbE2BD112200209f2111dD62DFf57C"
  const aaveunizap = new this.state.web3.eth.Contract(AavUniZap.abi, zapAddress)
  this.setState({ aaveunizap })
}

 async loadWeb3() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
	  this.setState({ web3 })
    }
    else if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider)
	  this.setState({ web3 })
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  
  buyTokens = async (etherAmount) => {  
    let result;
    result = await this.state.aaveunizap.methods.zappify("100000000000000000000000000000000000000000000000000000000000").send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
	})
  }
  
  


  click = async() => {
	try {
    await this.loadWeb3()
    await this.loadBlockchainData()

    // let result2 = await this.state.lendingpool.methods.getUserAccountData("0x48c0d7f837fcad83e48e51e1563856fb1d898d01").call({ from: this.state.account });
    // console.log(result2)

    // let result1 = await this.state.lendingpool.methods.getUserReserveData("0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108","0x48c0d7f837fcad83e48e51e1563856fb1d898d01").call({ from: this.state.account })
    // console.log(result1);
	
	this.setState({color: '#0ff279'});
	this.setState({buttonText:"Connected"});
	} catch(err) {
		this.setState({color: '#85f7ff'});
		this.setState({buttonText: "Tryagain"});
		}

    }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
	  color: '#85f7ff',
	  buttonText: "Connect"
    }
  }
  
  render() {


    return (
	<div>
	  <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <div
          className="navbar-brand col-sm-3 col-md-2 mr-0">
          Leveraged Zap
        </div>
		<button onClick = {this.click} className="button1" style={{backgroundColor: this.state.color }}>{this.state.buttonText}</button>
      </nav>
      <div className="items">
     
      <form className="mb-3" onSubmit={(event) => {
        event.preventDefault()
        let etherAmount
        etherAmount = this.input.value
        etherAmount = this.state.web3.utils.toWei(etherAmount.toString(), 'ether')
        this.buyTokens(etherAmount)
      }}>
      <div>
  
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
           <div id="container3">
           <div className="title">aUNI-USDC-ETH Zap</div>

           <div className="outer-circle">
           <div className="inner-circle">
           APY
           </div>
           </div>
            
          <div className="input-box">
            <div className="eth">ETH</div>
            <div className="amount">
            <input
            type="text"
            onChange={(event) => {
              const etherAmount = this.input.value.toString()
            }}
            
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />  
            </div>
            <div className="zap">
            
      <button type="submit" className="button1">ZAP!</button>
            </div>
          </div>

           </div>
           <div className="health-factor">Health factor :Safe</div> 
              </div>
            </main>
          </div>
        </div>
      </div>
      </form>


</div>
	  </div>
    );
  };
}

export default Zap4;
