const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  //get a list of all accounts
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: [''] // Arguments are being skipped not sure why.
                                              //Message set to NO MESSAGE(BLANK) by "outputSelection" in 
                                              //the compile.js file hence the blank arguments string.
   })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, '' //Message set to NO MESSAGE(BLANK) by "outputSelection" in the compile.js 
                             //file hence the blank default message here.
    );
  });

  it("sets the contract message", async () => {
    await inbox.methods
      .setMessage('Updated message')
      .send({ from: accounts[0], gas: "1000000" });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Updated message');  //Here, the message gets updated successfully from BLANK to "Updated message"
  }); 
});




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}

let car;

beforeEach(()=> {
  console.log('Testing;');
  car = new Car();
});

describe('Car', () =>{
  it('can park', ()=> {
    assert.equal(car.park(), 'stopped');
  });

  it('can drive', () => {
    assert.equal(car.drive(), 'vroom');
  });
});
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
