const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const {abi,evm} = require("./compile");
const provider = new HDWalletProvider("YOUR_PNEUMOIC","https://goerli.infura.io/v3/65e209fc3ac3488fa1b2daf90798a0be");
const web3 = new Web3(provider);


let accounts;


const deploy = async()=>{
  accounts = await web3.eth.getAccounts();
  console.log("Deploying the contract pls wait....", accounts[0]);


  const lotteryContract = await new web3.eth.Contract(abi).deploy({data:evm.bytecode.object}).send({from:accounts[0],gas:1000000});

  console.log("The contract is deployed at: ",lotteryContract.options.address);
  provider.engine.stop();
};

deploy();
