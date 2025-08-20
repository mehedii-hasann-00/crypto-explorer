
import { Wallet, isAddress, Mnemonic, InfuraProvider } from "ethers";
const provider = new InfuraProvider('mainnet', 'e8e1754ff5e64e73867f9041b1df1f45');

const ether = (address) => {
    if(typeof address !== 'string') return false;

    if (isAddress(address)) {
        console.log("Ethereum Address:", address);
    }
    else {
        console.log("Invalid Address");
    }
    provider
        .getBalance(address)
        .then((balance) => {
            console.log(parseFloat(balance) / 1000000000000000000);
        })
        .catch((error) => {
            console.error(error)
        })
}

export default ether