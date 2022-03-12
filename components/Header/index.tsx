import Link from "next/link";
import React from "react";
import useWallet from "../../state/wallet/hook";
import { getEllipsisTxt } from "../../utils";
import Button from "../Button";

const Header = () => {
  const { account, connect, disconnect,chainId,provider } = useWallet();
  return (
    <div className="fixed top-0 left-0 flex items-center justify-between w-full px-4 py-2 border-b bg-secondary-200 border-b-primary-400">
      <Link href="/">
        <span className="text-lg font-black cursor-pointer text-primary-500">
          BountyHunt
        </span>
      </Link>
      <button
        onClick={() => {
          if (!account) {
            connect();
          } else {
            disconnect();
          }
        }}
        className={`p-2 mx-1 ml-auto font-bold rounded-md justify-self-end ${
          account
            ? `bg-white-500 text-primary-500`
            : `text-white-500 bg-primary-500 `
        } border-solid border-2 border-primary-500 
        hover:border-primary-600 hover:text-white-500 hover:bg-primary-600  focus:outline-none`}
      >
        {account ? getEllipsisTxt(account) : "Connect Wallet"}
      </button>

      {
        chainId&&chainId !== Number("0x13881")&&
        <Button onClick={()=>{
        if (chainId !== Number("0x13881")) {
                provider?.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: "0x13881" }],
                });
              }
      }} className="bg-red-500 border-red-500 mr-1">
        Switch To Mumbai
      </Button>}
      {chainId&&chainId === Number("0x13881")&&<Link href="/createProfile">
        <Button>Create a Profile</Button>
      </Link>}
    </div>
  );
};

export default Header;
