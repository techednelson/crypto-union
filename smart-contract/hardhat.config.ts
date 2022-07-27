import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      // Alchemy APP API_KEY
      url: '',
      // MetaMask Wallet Private Keys
      accounts: [''],
    },
  },
};

export default config;
