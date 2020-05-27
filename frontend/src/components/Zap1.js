import React, { Component } from 'react';

import './Zap1.css';
import Web3 from 'web3'; 
import AavUniZap from '../abis/AavUniZap.json'
import LendingPool from '../abis/LendingPool.json'
import LendingPoolCore from '../abis/LendingPoolCore.json'



class Zap1 extends Component {

  /*async componentMount() {
 
    await this.loadWeb3()
    await this.loadBlockchainData()
    let result2 = await this.state.lendingpool.methods.getUserAccountData("0x48c0d7f837fcad83e48e51e1563856fb1d898d01").call({ from: this.state.account });
    console.log(result2)
    
    let result1 = await this.state.lendingpool.methods.getUserReserveData("0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108","0x48c0d7f837fcad83e48e51e1563856fb1d898d01").call({ from: this.state.account })
    console.log(result1);
  }*/


  async loadBlockchainData() {

  const accounts = await this.state.web3.eth.getAccounts()
  this.setState({ account: accounts[0] })
  console.log(this.state.account);

  const ethBalance = await this.state.web3.eth.getBalance(this.state.account)
  this.setState({ ethBalance })
  console.log(ethBalance);
  
  // Load Aaveunizap
  const networkId =  await this.state.web3.eth.net.getId();
  console.log(networkId);
  const aaveunizapdata = "0x48c0d7f837fcad83e48e51e1563856fb1d898d01"
  if(aaveunizapdata) {
    const aaveunizap = new this.state.web3.eth.Contract(AavUniZap, aaveunizapdata)
    console.log(aaveunizap); 

    const contractAddress1 = "0xa03105cc79128d7d67f36401c8518695c08c7d0c"
    const lendingpool = this.state.web3.eth.Contract(LendingPool, contractAddress1)
    console.log(lendingpool); 

    const contractAddres2 = "0x07Cdaf84340410ca8dB93bDDf77783C61032B75d"
    
    const lendingpoolcore = this.state.web3.eth.Contract(LendingPoolCore, contractAddres2)

    console.log(lendingpoolcore);


    this.setState({ aaveunizap })
    this.setState({ lendingpool })
    this.setState({ lendingpoolcore })
  } else {
        window.alert('Token contract not deployed to detected network.')
  }
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

  
  buyTokens = async (tokenAmount,etherAmount) => {    
    let result;
    console.log(tokenAmount);
    console.log(etherAmount);
    result = await this.state.aaveunizap.methods.zappify("100000000000000000000000000000000000000000000000000000000000").send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
	})
  }
  
  click = async() => {
	try {
    await this.loadWeb3()
    await this.loadBlockchainData()

    let result2 = await this.state.lendingpool.methods.getUserAccountData("0x48c0d7f837fcad83e48e51e1563856fb1d898d01").call({ from: this.state.account });
    console.log(result2)

    let result1 = await this.state.lendingpool.methods.getUserReserveData("0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108","0x48c0d7f837fcad83e48e51e1563856fb1d898d01").call({ from: this.state.account })
    console.log(result1);
	
	this.setState({color: '#0ff279'});
	this.setState({buttonText:"Connected"});
	} catch(err) {
		this.setState({color: '#85f7ff'});
    this.setState({buttonText: "Tryagain"});
    console.log(err);
		}

    }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      aaveunizap:{},
      lendingpool:{},
      lendingpoolcore:{},
      output:'',
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
      <form className="mb-3" onSubmit={(event) => {
        event.preventDefault()
        let etherAmount, tokenAmount
        etherAmount = this.input.value
        tokenAmount = etherAmount*20;
        etherAmount = this.state.web3.utils.toWei(etherAmount.toString(), 'Ether')
        tokenAmount = this.state.web3.utils.toWei(tokenAmount.toString(), 'Ether')
        this.buyTokens(tokenAmount,etherAmount)
      }}>
      <div>
  
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
           <div id="container">
           <div className="title">aUNI-DAI-ETH Zap</div>

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
              this.setState({
                output: etherAmount
              })
              console.log(this.state.output);
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
	  <form className="mb-3" onSubmit={(event) => {
        event.preventDefault()
        let etherAmount, tokenAmount
        etherAmount = this.input.value
        tokenAmount = etherAmount*20;
        etherAmount = this.state.web3.utils.toWei(etherAmount.toString(), 'Ether')
        tokenAmount = this.state.web3.utils.toWei(tokenAmount.toString(), 'Ether')
        this.buyTokens(tokenAmount,etherAmount)
      }}>
      <div>
  
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
           <div id="container">
           <div className="title">aUNI-DAI-ETH Zap</div>

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
              this.setState({
                output: etherAmount
              })
              console.log(this.state.output);
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
    );
  };
}

export default Zap1;