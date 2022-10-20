import { useWeb3Contract } from "react-moralis"
import { abi, contractAddress } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddress ? contractAddress[chainId][0] : null

    const [entranceFee, setEntranceFee] = useState("0")
    const [NumPlayers, setNumPlayers] = useState("0")
    const [RecentWinner, setRecentWinner] = useState("0")
    const dispatch = useNotification()
    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = await getEntranceFee()
        const NumPlayersFromCall = (await getNumberOfPlayers()).toString()
        const RecentWinnerFromCall = (await getRecentWinner()).toString()
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(NumPlayersFromCall)
        setRecentWinner(RecentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete",
            title: "Tx Notification",
            position: "topR",
            icon: "trash",
        })
    }

    return (
        <div className="p-5">
            {raffleAddress ? (
                <>
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full ml-auto"
                            onClick={async function () {
                                await enterRaffle({
                                    onSuccess: handleSuccess,
                                    onError: (error) => console.log(error),
                                })
                            }}
                            disabled={isFetching || isLoading}
                        >
                            {isLoading || isFetching ? (
                                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                            ) : (
                                <div>Enter Raffle</div>
                            )}
                        </button>
                    </div>
                    <div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")}</div>
                    <div>Number of Players: {NumPlayers}</div>
                    <div>Recent Winners: {RecentWinner}</div>
                </>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    )
}
