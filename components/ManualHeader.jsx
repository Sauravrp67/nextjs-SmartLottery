import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const {
        enableWeb3,
        account,
        isWeb3Enabled,
        Moralis,
        deactivateWeb3,
        isWeb3EnableLoading,
    } = useMoralis()

    //some button that connects us and changes connected to be true

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("Connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])
    //no dependency array: run anytime something re-renders
    //CAREFUL with this!! Because you might get circular render
    //blank dependency array, run once on load
    //dependencies in the array, run anytime something in there changes

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account Changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("Connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    })
    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 5)}.....
                    {account.slice(account.length - 5)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem(
                                "Connected",
                                "Injected"
                            )
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
