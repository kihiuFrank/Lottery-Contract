const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require("./compile");

const provider = new HDWalletProvider(
    'dove camera design dial main almost truth doctor situate volume finger paper',
    'https://rinkeby.infura.io/v3/2eebb17e500d4c9e8ae554aa7d79010a'
);

const web3 = new Web3 (provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account;', accounts[0]);

    const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '10000000', gasPrice: '2000000000'});

    console.log(abi);
    console.log('Contract deployed to;', result.options.address);
};
deploy();