import { ethers } from 'ethers';

let error_message = '';
export const connectWallet = async () => {

  if (window.ethereum){
    window.ethereum.request({ method: 'eth_requestAccounts' }).then(
      result => {
        error_message= result[0];
      }
    );
  } else {
    error_message = "no ethereum";
  }
};

export const getAccount = async (provider) => {
  return error_message;
};

export const disconnectWallet = async (provider) => {

};