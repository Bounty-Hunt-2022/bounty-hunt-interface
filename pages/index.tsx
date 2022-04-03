import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center px-4 my-60">
        {/* <Image /> */}
        <h1 className={"text-5xl text-center font-bold text-primary-500 mb-4"}>
          Welcome to BountyHunt
        </h1>
        <p className={"text-base text-center text-black-500"}>
          BountyHunt is a decentralized, open-source, peer-to-peer,
          bounty-hunting platform.
        </p>
        <div className="flex w-full max-w-[300px] justify-between">
          <Button
            onClick={() => {
              router.push("/bounties");
            }}
            className="mt-6"
          >
            Look For a Bounty
          </Button>
          <Button
            onClick={() => window.open("https://discord.gg/HrW3s7qh")}
            className="mt-6"
          >
            Join Discord
          </Button>
        </div>
        <h1 className="w-full text-center text-secondary-500 font-bold text-2xl mt-7">
          Powered By
        </h1>
        <div className="w-full flex justify-evenly mt-4">
          <img
            className="w-full object-contain max-w-[100px] sm:max-w-[200px]"
            alt=""
            src="https://polygon.technology/_nuxt/img/polygon-logo.99647ca.svg"
          />
          <img
            className="w-full object-contain max-w-[50px] sm:max-w-[100px]"
            alt=""
            src="https://uniswap.org/ecosystem/The%20Graph.svg"
          />
          <img
            className="w-full object-contain max-w-[100px] sm:max-w-[200px]"
            alt=""
            src="https://assets-global.website-files.com/5f973c970bea5548ad4287ef/6088f4c7c34ad61ab10cdf72_horizontal-logo-onecolor-neutral-alchemy.svg"
          />
          <img
            className="w-full object-contain max-w-[50px] sm:max-w-[100px]"
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png"
          />
          <img
            className="w-full object-contain max-w-[50px] sm:max-w-[100px]"
            alt=""
            src="data:image/png;base64,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"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
