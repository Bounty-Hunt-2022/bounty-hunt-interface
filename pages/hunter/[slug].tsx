import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { hunterDomainAddress } from "../../constants";
import DomainMaker from "../../constants/abis/DomainMaker.json";
import { createAlchemyWeb3, GetNftsResponse } from "@alch/alchemy-web3";

const Hunter = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [address, setAddress] = useState<undefined | string>();
  const [nfts, setNfts] = useState< any[]>([]);
  const [image,setImage]=useState("https://testnets.opensea.io/static/images/placeholder.png")
  const fetchAddress = useCallback(async () => {
    try {
      const { ethereum } = window;
      if (ethereum && slug) {
        // You know all this
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          hunterDomainAddress,
          DomainMaker,
          signer
        );
        const name = slug as string;
        const owner = await contract.domains(name.replace(".hunter", ""));
        setAddress(owner);
      }
    } catch (error) {
      console.log(error);
    }
  }, [slug]);
  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  const web3 = createAlchemyWeb3(
    `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
  );

  const getUserNft = useCallback(async () => {
    if (address) {
      const nfts = await web3.alchemy.getNfts({
        owner: address,
        contractAddresses: ["0x941abf2aaadc8935f543013f3cc7031878a7bc16"],
      });
      console.log(nfts?.ownedNfts[0]?.media[0]?.gateway);
      setNfts(nfts.ownedNfts);
      setImage(nfts?.ownedNfts[0]?.media[0]?.gateway);
    }
  }, [address, web3]);

  useEffect(() => {
    getUserNft();
  }, [address, getUserNft]);

  return (
    <div className="mx-4 mt-16 sm:mt-32 sm:mx-10 md:mx-20">
      Hi {slug as string}, your address is: {address as string}
      {
        nfts?.map((nft) => (
      <div className="rounded-lg p-2 border border-solid border-secondary-500 w-fit">
      <img className="max-w-[200px] rounded-lg" src={nft?.media[0]?.gateway?nft?.media[0]?.gateway:image} alt=""/>
        <p className="text-sm font-semibold text-secondary-500 mt-2">{nft?.title}</p>
      </div>
        ))
      }
    </div>
  );
};

export default Hunter;
