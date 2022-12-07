const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const {interface, bytecode} = require("./compile");
const provider = new HDWalletProvider("YOUR_PNEUMONIC","https://goerli.infura.io/v3/65e209fc3ac3488fa1b2daf90798a0be")
const web3 = new Web3(provider);


let accounts;

const deploy = async()=>{
  accounts = await new web3.eth.getAccounts();
  console.log("Deploying the contract pls wait....",accounts[0]);

  const lottery = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data:bytecode})
  .send({from:accounts[0],gas:1000000});

console.log("The contract was succeffuly deployed at : " ,lottery.options.address);
provider.engine.stop();

}

deploy();
