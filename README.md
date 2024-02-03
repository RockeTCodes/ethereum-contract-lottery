# ethereum-lottery-contract
This is my second ethreum blockchain based project . This contract allows users to enter themselves into the lottery . When the manager calls pick winner function the total money is sent to the winner . 


The pickWinner method can only be called by the Manager ( The person who initiated it ) . 
Any number of people can enter the lottery .
When the manager calls the pickWinner then the contract will pick a winner from the list of participants and send all the money from the prize pool to the winners .
The players will need to send some eth to enter the contest . {any value greater than 0.01 ether ) . 

Use with caution while deploying to main ethereum network as it can cause loss of money . 

The newer version is deployed at Goerli Test Network at address : 0x54E707d104Db5F95a2668f678899A9ec3587310E

The new version is made using Solidity ^0.8.17 . (Latest as of December 2022).



currently the older version is deployed at Goerli Test Network at address : 0xc62e4AA28E061437a57127ceDe162c6F3006A5B0 

You can interact with the contract here at the given address . 

The frontend interactable version of this contract is available here :- https://lottery-react-omega.vercel.app/
