import React, { Component } from 'react';

import './Zap1.css';
import Web3 from 'web3'; 
import AavUniZap from '../abis/AavUniZap.json'
import LendingPool from '../abis/LendingPool.json'
import LendingPoolCore from '../abis/LendingPoolCore.json'

class Zap2 extends Component {

  /*async componentMount() {
 
    await this.loadWeb3()
    await this.loadBlockchainData()

    let result2 = await this.state.lendingpool.methods.getUserAccountData("0x48c0d7f837fcad83e48e51e1563856fb1d898d01").call({ from: this.state.account });
    console.log(result2)

    
    let result1 = await this.state.lendingpool.methods.getUserReserveData("0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108","0x48c0d7f837fcad83e48e51e1563856fb1d898d01").call({ from: this.state.account })
    console.log(result1);
  }
*/

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
  const aaveunizapdata1 = "0x48c0d7f837fcad83e48e51e1563856fb1d898d01"
  const aaveunizapdata2 = "0xb5A0C6C3A0FbE2BD112200209f2111dD62DFf57C"
  const aaveunizapdata3 = "0x9E5279e813Bf799D9D00C7a4aa0c46bCe1F6Cf87"
  if(aaveunizapdata1) {
    const aaveunizap1 = new this.state.web3.eth.Contract(AavUniZap.abi, aaveunizapdata1)
	const aaveunizap2 = new this.state.web3.eth.Contract(AavUniZap.abi, aaveunizapdata2)
	const aaveunizap3 = new this.state.web3.eth.Contract(AavUniZap.abi, aaveunizapdata3)
    console.log(aaveunizap1); 

    const contractAddress1 = "0xa03105cc79128d7d67f36401c8518695c08c7d0c"
    const lendingpool = this.state.web3.eth.Contract(LendingPool, contractAddress1)
    console.log(lendingpool); 

    const contractAddres2 = "0x07Cdaf84340410ca8dB93bDDf77783C61032B75d"
    
    const lendingpoolcore = this.state.web3.eth.Contract(LendingPoolCore, contractAddres2)

    console.log(lendingpoolcore);


    this.setState({ aaveunizap1 })
	this.setState({ aaveunizap2 })
	this.setState({ aaveunizap3 })
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
    result = await this.state.aaveunizap1.methods.zappify("100000000000000000000000000000000000000000000000000000000000").send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
	})
  }
  
  buyTokens1 = async (tokenAmount1,etherAmount1) => {    
    let result;
    console.log(tokenAmount1);
    console.log(etherAmount1);
    result = await this.state.aaveunizap2.methods.zappify("100000000000000000000000000000000000000000000000000000000000").send({ value: etherAmount1, from: this.state.account }).on('transactionHash', (hash) => {
	})
  }
  

  buyTokens2 = async (tokenAmount2,etherAmount2) => {    
    let result;
    console.log(tokenAmount2);
    console.log(etherAmount2);
    result = await this.state.aaveunizap3.methods.zappify("100000000000000000000000000000000000000000000000000000000000").send({ value: etherAmount2, from: this.state.account }).on('transactionHash', (hash) => {
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
		}

    }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      lendingpool:{},
      lendingpoolcore:{},
      output:'',
      output1:'',
      output2:'',
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
        let etherAmount1, tokenAmount1
        etherAmount1 = this.input.value
        tokenAmount1 = etherAmount1*20;
        etherAmount1 = this.state.web3.utils.toWei(etherAmount1.toString(), 'ether')
        tokenAmount1 = this.state.web3.utils.toWei(tokenAmount1.toString(), 'ether')
        this.buyTokens1(tokenAmount1,etherAmount1)
      }}>
      <div>
  
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
           <div id="container2">
           <div className="title">aUNI-MKR-ETH Zap</div>

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
              const etherAmount1 = this.input.value.toString()
              this.setState({
                output1: etherAmount1
              })
              console.log(this.state.output1);
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

export default Zap2;
