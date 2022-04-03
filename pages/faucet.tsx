import { ethers } from "ethers";
import React, { useCallback, useState } from "react";
import Button from "../components/Button";
import { faucetAddress } from "../constants";
import FaucetAbi from "../constants/abis/Faucet.json";
import useWallet from "../state/wallet/hook";

const faucet = () => {
  const { account, web3Provider } = useWallet();
  const [loading, setLoading] = useState(false);
  const requestTokens = useCallback(async () => {
    if (!account) return undefined;
    if (!web3Provider) return undefined;
    setLoading(true);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(faucetAddress, FaucetAbi, signer);
    const tx = await contract.requestTokens();
    await tx.wait();
    setLoading(false);
  }, [account, web3Provider]);
  return (
    <div className="mx-4 mt-16 sm:mt-32 sm:mx-10 md:mx-20">
      <div className="flex flex-col items-center max-w-sm m-auto">
        <h1 className="font-bold text-2xl text-center text-primary-500 mb-6">
          Get Test USDC Tokens
        </h1>
        <Button className="mt-2" disabled={loading} onClick={requestTokens}>
          {loading ? "Requesting Token" : "Request Token"}
        </Button>
      </div>
    </div>
  );
};

export default faucet;
