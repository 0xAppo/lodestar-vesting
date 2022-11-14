import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';
import "hardhat-deploy";

const config: HardhatUserConfig = {
  defaultNetwork: 'arbitrum',
  solidity: {
    version: '0.8.10',
    settings: {
      optimizer: {
        enabled: true
      }
    }
  },
  namedAccounts: {
    deployer: 0,
    poster: `${process.env.ADMIN}`,
    admin: {
      arbitrum: `${process.env.ADMIN}`,
      arbitrumgoerli: `${process.env.ADMIN}`
    },
    waffle: `${process.env.WAFFLE}`,
    appo: `${process.env.APPO}`,
    quanta: `${process.env.QUANTA}`,
    coopes: `${process.env.COOPES}`,
    employee: `${process.env.EMPLOYEE_FUND}`
  },
  networks: {
    hardhat: {
      forking: {
        url: 'https://api.avax.network/ext/bc/C/rpc'
      }
    },
    arbitrum: {
      url: `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_ARBITRUM}`,
      accounts: process.env.DEPLOY_PRIVATE_KEY == undefined ? [] : [`0x${process.env.DEPLOY_PRIVATE_KEY}`],
    },
    arbitrumgoerli: {
      url: `https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_ARBITRUMGOERLI}`,
      chainId: 421613,
      accounts: process.env.DEPLOY_PRIVATE_KEY == undefined ? [] : [`0x${process.env.DEPLOY_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "arbitrumgoerli",
        chainId: 421613,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io"
        }
      }
    ]
  },  
};

export default config;
