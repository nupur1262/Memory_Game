pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract MemoryToken is ERC721Full{
  //string public name = "Memory Token";

  //The ERC721 has a constructor , its just the function 
  //that gets run whenever the smart contract is created 
  //or put up on the blockchain.
  //2 parameters are passes , 1st is the name of the token
  //2nd is the symbol of the token.

  constructor() ERC721Full("Memory Token" , "MEMORY") public{

  }

  //we want to build up the token so that it can be minted
  //and can be distributed to other ppl
  //so whenever we are creating the token , 
  //we want it to start from zero 
  //whenever the token is created there are no token in existance
  //and we want ppl to collect them
  //so for all this logic we will have the mint function.

  //it accepts two arguments
  //first is the address of the person on the blockchain 
  //that we are going to give the token to
  //second is the string that is the tokenURI
  //every token has some image associated with it 
  //all these images are stored somewhere on a web server
  //if we get more decentralized we can store these images on a distributed system like ipfs
  //so that is the place what a URI is.

  function mint(address _to , string memory _tokenURI) public returns(bool){
    //totalSupply() is a function in ERC721Full , that returns the number of tokens that already exist
    //so basically we can assume it to be the index number.
    //everytime we create a new token , we increment totalId by 1
    uint _tokenId = totalSupply().add(1);
    _mint(_to , _tokenId);

    //next we want to set up the tokenURI
    //there is a function _setTokenURI() in the ERC721 file , which takes the tokenId and a string URI and then sets the uri for the token
    _setTokenURI(_tokenId , _tokenURI);

    return true;
  }
  // Code goes here...

}
