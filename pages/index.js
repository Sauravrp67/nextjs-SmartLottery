import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import ManualHeader from "../components/ManualHeader"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="Smart Contract Written in solidity"></meta>
                <link rel="icon" href="/facicon.ico"></link>
            </Head>
            <ManualHeader />
            {/**header/connect button / nav bar */}
            Hello
        </div>
    )
}
