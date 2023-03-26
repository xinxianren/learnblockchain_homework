require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()


const { ProxyAgent, setGlobalDispatcher } = require("undici")
const proxyAgent = new ProxyAgent("http://127.0.0.1:33179")
setGlobalDispatcher(proxyAgent)


var key="key"
var mnemonic="mnemonic"


// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  etherscan: {
    // apiKey: 'XUVYXRW1JQDNSRA7FJCRMGHNIYV5UY1K4E',

    apiKey: {
      goerli: "XUVYXRW1JQDNSRA7FJCRMGHNIYV5UY1K4E"
    },
  },
  networks:{
    // mumbai:{
    //   url:"http://127.0.0.1:8545",
    //     accounts:{
    //       mnemonic:mnemonic,
    //     },
    //   chainId:31337,
    // },
    dev:{
      url:"http://127.0.0.1:8545",
      chainId:31337,
      gas:12000000,
      accounts:{
        mnemonic:mnemonic,
      },
    },



    goerli:{
      url:"https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId:5,
      gas:'auto',
      gasPrice:'auto',
      accounts:{
        mnemonic:mnemonic,
      },
    },
  },

};



