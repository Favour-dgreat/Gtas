import {useContract} from './useContract';
import GtasNFTAbi from '../contracts/GtasNFT.json';
import GtasNFTContractAddress from '../contracts/GtasNFT-address.json';


// export interface for NFT contract
export const useMinterContract = () => useContract(GtasNFTAbi.abi, GtasNFTContractAddress.GtasNFT);