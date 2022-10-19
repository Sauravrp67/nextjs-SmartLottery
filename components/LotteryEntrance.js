import { useWeb3Contract } from "react-moralis"
import { abi, contractAddress } from "../constants"
import { useMoralis } from "react-moralis"

export default function LotteryEntrance() {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    console.log(parseInt(chainId))
    const raffleAddress = chainId in contractAddress ? contractAddresses[chainId]
    // const {runContractFunction: enterRaffle} = useWeb3Contract({
    //     abi:abi,
    //     contractAddress: contractAddress,
    //     functionName: "enterRaffle",
    //     params:{},
    //     msgValue:
    // })
    return <div>Hi from lottery Entrance</div>
}
