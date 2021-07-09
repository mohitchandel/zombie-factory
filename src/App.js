import './App.css';
import React, { useState } from 'react';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormControl, Col, Row } from 'react-bootstrap';
import ZombyFactory from "./atrifacts/ZombyFactory.json";

function App() {

  const [color, setColor] = useState("");
  const [zmcolor, setZmcolor] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [dna, setDna] = useState();
  const [visibility, setVisibility] = useState(false);
  

  async function setZomby(){
    const web3 = new Web3(Web3.givenProvider)
    const contractId = await web3.eth.net.getId()
    const contractNetwork = ZombyFactory.networks[contractId]
    const contract = new web3.eth.Contract(ZombyFactory.abi, contractNetwork.address);
    const address = await web3.eth.getAccounts()
    await contract.methods.makingZomby(color,name,age).send({
      from : address[0]
    })  
    const result = await contract.methods.zombyResult().call()
    setColor(result.color)
    setDna(result.zombyDna)
    setVisibility(true)
    setZmcolor(color)
    //console.log(result)
  }

  return (
    <div className="App">
      <div className="mt-4">
        <h2>Create your zomby avatar with unique DNA</h2>
      </div>
      <Row className="justify-content-md-center">
        <Col md={3}>
          <div className="py-1">
            <FormControl onChange={e => setColor(e.target.value)} placeholder="Enter Your Favourite Color"/>
          </div>
          <div className="py-1">
            <FormControl onChange={e => setName(e.target.value)} placeholder="Enter Your Name"/>
          </div>
          <div className="py-1">
            <FormControl onChange={e => setAge(e.target.value)} placeholder="Enter Your Age"/>
          </div>
          <div>
            <Button className="mt-2" onClick={setZomby}>Make Zomby</Button>
          </div>
          <div className="zombie-container" style={{display: visibility ? 'block' : 'none'}}>
            <div className="mt-5">
              <p>Hey {name} this is your Zomby avatar with Dna({dna})</p>
            </div>
            <div className="svg-container" >
              <svg style={{fill: zmcolor}} id="face" height="600" width="300"><circle cx="150" cy="95" r="80" /><circle cx="170" cy="60" r="10" className="eye" fill="#5d5555"/>
                <circle cx="130" cy="60" r="10" className="eye" fill="#5d5555"/><path d="M115 105 a1,0.8 0.2 0,0 70,0" fill="#9a1a1a"/><rect height="300" width="100" x="105" y="180"/>
                <rect id="leftArm" height="30" width="90" x="100" y="160" transform="rotate(25)" /><rect id="rightArm" height="30" width="90" x="92" y="290" transform="rotate(-25)" />
                <rect id="leftLeg" className="leg" height="90" width="30" x="105" y="485" stroke="black" strokeWidth="3" />
                <rect id="rightLeg" className="leg" height="90" width="30" x="175" y="485" stroke="black" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
