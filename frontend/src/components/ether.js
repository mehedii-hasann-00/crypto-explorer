import { Wallet, isAddress, Mnemonic, formatEther, InfuraProvider } from "ethers";
const provider = new InfuraProvider('mainnet', 'e8e1754ff5e64e73867f9041b1df1f45');

const ether = (address) => {
    let value = false;
    if (isAddress(address)) {
        provider.getBalance(address).then((balance) => {
                value = formatEther(balance);
                console.log(value);
            })
            .catch((error) => {
                console.error(error)
            })
    }
    console.log(value);
    return value;

}

export default ether