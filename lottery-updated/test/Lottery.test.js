const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const {abi,evm} = require("../compile");


let lottery;
let accounts;


beforeEach(async()=>{

accounts = await web3.eth.getAccounts();
lottery = await new web3.eth.Contract(abi).deploy({data:evm.bytecode.object}).send({from:accounts[0],gas:"1000000"});


});


describe("Lottery Contract",()=>{


it("deploys a contract" , ()=>{
  assert.ok(lottery.options.address);
});



it("lets a person enter the lottery",async()=>{
  await lottery.methods.enter().send({from:accounts[0],value:web3.utils.toWei("0.02","ether")});

const players = await lottery.methods.getPlayers().call({from:accounts[0]});


assert.equal(accounts[0],players[0]);
assert.equal(1,players.length);

});


it("lets multiple people enter the lottery",async()=>{

await lottery.methods.enter().send({from:accounts[0],value:web3.utils.toWei("0.02","ether")});
await lottery.methods.enter().send({from:accounts[1],value:web3.utils.toWei("0.02","ether")});
await lottery.methods.enter().send({from:accounts[2],value:web3.utils.toWei("0.02","ether")});


const players = await lottery.methods.getPlayers().call({from:accounts[0]});



assert.equal(accounts[0],players[0]);
assert.equal(accounts[0],players[0]);
assert.equal(accounts[0],players[0]);

assert.equal(3,players.length);



});



it("requires minimun amount to enter",async()=>{


  try{
    await lottery.methods.enter().send({from:accounts[2],value:web3.utils.toWei("0.001","ether")});
    assert(false);
  }catch(err){
    assert(err);
  }


});



it("only manager can pick winner",async()=>{
  try{
    await lottery.methods.pickWinner().send({from:accounts[1]});
    assert(false);
  }catch(err){
    assert(err);
  }
});


it("sends money to winner",async()=>{
await lottery.methods.enter().send({from:accounts[0],value:web3.utils.toWei("2","ether")});


const initialBalance = await web3.eth.getBalance(accounts[0]);

await lottery.methods.pickWinner().send({from:accounts[0]});

const finalBalance = await web3.eth.getBalance(accounts[0]);

const difference = finalBalance - initialBalance ;

const players = await lottery.methods.getPlayers().call({from:accounts[0]});

assert(difference > web3.utils.toWei("1.8","ether"));

assert.equal(0,players.length);


});


});
