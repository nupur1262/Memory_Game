const { assert } = require('chai')

const MemoryToken = artifacts.require('./MemoryToken.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Memory Token', (accounts) => {
  let token

  //testing framework , special function before
  //so that we can fetch the token from the blockchain first 
  //and then do all the stuff with the token
  before(async()=>{
    //we want to check is the token is created or not
    token = await MemoryToken.deployed()
  })


  //This is the description of the test to check if the contract is deployed properly or not
  describe('Deployment' , async()=>{
    it('Deployes Successfully' , async()=>{
      //checking the address of the token created
      const addres = token.address
      //check if the address is not null
      assert.notEqual(addres,0x0)
      assert.notEqual(addres,'')
      assert.notEqual(addres,null)
      assert.notEqual(addres,undefined)
    })
  
    //check the name 
    it('Has a name',async()=>{
      const name = await token.name()
      assert.equal(name , 'Memory Token')
    })
  
    //check the symbol
    it('Has a Symbol' , async()=>{
      const sym = await token.symbol()
      assert.equal(sym , "MEMORY")
    })
  })
  


  //This is the description to check if the Token distribution is done correctly not
  describe('Token Distribution' , async()=>{
    let result

    it('Mints Tokens' , async()=>{
      await token.mint(accounts[0] , 'https://www.token-uri.com/nft')

      //it should increase the total supply
      result = await token.totalSupply()
      assert.equal(result.toString() , '1' ,'Total Supply is correct')

      //check that the total balance of the owner is increased
      result = await token.balanceOf(accounts[0])
      assert.equal(result.toString() , '1' ,'balanceOf() is correct')

      //make sure that the token belongs to the owner 
      result = await token.ownerOf('1')
      assert.equal(result.toString(), accounts[0].toString() , 'ownerOf() is correct')
      result = await token.tokenOfOwnerByIndex(accounts[0] , 0)
      //Owner can see all the tokens
      let balanceOf = await token.balanceOf(accounts[0])
      let tokenIds=[]
      for(let i=0;i<balanceOf;i++)
      {
        let id = await token.tokenOfOwnerByIndex(accounts[0] , i)
          tokenIds.push(id.toString())
      }
      let expected = ['1']
      assert.equal(tokenIds.toString() , expected.toString() ,'Token Ids are correct')

      //Token URI is correct
      let tokenURI = await token.tokenURI('1')
      assert.equal(tokenURI , 'https://www.token-uri.com/nft')

      })
  })
  // code goes here...
})
