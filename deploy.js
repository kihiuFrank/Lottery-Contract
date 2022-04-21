const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require("./compile");

const provider = new HDWalletProvider(
    'place whip accuse laptop damp barrel eight glue search eternal virtual notice',
    'https://rinkeby.infura.io/v3/267b653f3c5547ec9d9801ea0c7da76f'
);

const web3 = new Web3 (provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account;', accounts[0]);

    const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: ['Hello World!']})
    .send({ from: accounts[0], gas: '10000000', gasPrice: '2000000000'});

    console.log('Contract deployed to;', result.options.address);
};
deploy();