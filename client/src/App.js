import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import Electionabi from './contracts/Election.json';
import Navbar from './components/Navbar';
import Body from './components/Body';
function App() {
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setLoader] = useState(true);
  const [Electionsm, setElectionsm] = useState();
  const [Candidate1, setCandidate1] = useState();
  const [Candidate2, setCandidate2] = useState();
  const [Candidate3, setCandidate3] = useState();
  const [Candidate4, setCandidate4] = useState();
  const [Candidate5, setCandidate5] = useState();
  const [Candidate6, setCandidate6] = useState();


  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert(
        "Non-Ethereum browser detected. Install Metamask"
      )
    }
  }
  const loadBlockchaindata = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(Electionabi.abi, networkData.address);
      const candidate1=await election.methods.candidates(1).call();
      const candidate2=await election.methods.candidates(2).call();
      const candidate3=await election.methods.candidates(3).call();
      const candidate4=await election.methods.candidates(4).call();
      const candidate5=await election.methods.candidates(5).call();
      const candidate6=await election.methods.candidates(6).call();
      setCandidate1(candidate1);
      setCandidate2(candidate2);
      setCandidate3(candidate3);
      setCandidate4(candidate4);
      setCandidate4(candidate4);
      setCandidate5(candidate5);
      setCandidate6(candidate6);
      setElectionsm(election);
      setLoader(false);
    }
    else {
      window.alert("The Smart contract not deployed to current network")
    }

  }

  const votecandidate=async (candidateid)=>{
    setLoader(true);
    await Electionsm
    .methods
    .vote(candidateid)
    .send({from:currentaccount})
    .on('transactionhash',()=>{
      console.log('Vote Polled')
    })
    setLoader(false);
  }
  
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, [])

  if (loader) {
    return <div>loading..</div>
  } else {
    return (
      <div className="App">
        <Navbar accounts={currentaccount} />
        <div className="container mx-md-n5">
          <Body 
            candidate1={Candidate1} 
            candidate2={Candidate2} 
            candidate3={Candidate3}
            candidate4={Candidate4}
            candidate5={Candidate5}
            candidate6={Candidate6}
            votecandidate={votecandidate}
            accounts={currentaccount}/>

        </div>
      </div>
    );
  }


}

export default App;
