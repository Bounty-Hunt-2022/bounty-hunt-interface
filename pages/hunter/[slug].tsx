import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { bountyMakerAddress, hunterDomainAddress } from "../../constants";
import DomainMaker from "../../constants/abis/DomainMaker.json";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import useWallet from "../../state/wallet/hook";
import { isAddress } from "ethers/lib/utils";
import { getEllipsisTxt } from "../../utils";

const web3 = createAlchemyWeb3(
  `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
);
const Hunter = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [address, setAddress] = useState<undefined | string>();
  const [nfts, setNfts] = useState< any[]>([]);
  const [image,setImage]=useState("https://testnets.opensea.io/static/images/placeholder.png")
  const [isHunterDomain, setIsHunterDomain] = useState(false);
  const [profileNft,setProfileNft]=useState<any>();
  const { account,web3Provider } = useWallet();

  const fetchAddress = useCallback(async () => {
    try {
      if ( slug) {
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(
          hunterDomainAddress,
          DomainMaker,
          signer
        );
        const name = slug as string;
        const owner = await contract.domains(name.replace(".hunter", ""));
        setAddress(owner);
        setIsHunterDomain(true);
        fetchHunterMetadata()
      }
    } catch (error) {
      console.log(error);
    }
  }, [slug,web3Provider]);


  const fetchHunterMetadata = useCallback(async () => {
    if(address&&isHunterDomain&&typeof slug === "string"){
      const nfts = await web3.alchemy.getNfts({
        owner: address,
        contractAddresses: [hunterDomainAddress],
      });
      console.log("NFTs", nfts.ownedNfts.filter((nft) => nft.title.replace(".hunter", "") === slug.replace(".hunter", ""))[0]);
      setProfileNft(nfts.ownedNfts.filter((nft) => nft.title.replace(".hunter", "") === slug.replace(".hunter", ""))[0])
    }
  } , [address,isHunterDomain]);


  useEffect(() => {
    fetchHunterMetadata()
  },[fetchHunterMetadata])

  useEffect(() => {
    if(typeof slug === "string"){
      if(isAddress(slug)){
        setAddress(slug)
      } else {
        if(web3Provider)
        fetchAddress();
      }
    }
  }, [fetchAddress,web3Provider]);


  const getUserNft = useCallback(async () => {
    if (address) {
      const nfts = await web3.alchemy.getNfts({
        owner: address,
        contractAddresses: [bountyMakerAddress],
      });
      setNfts(nfts.ownedNfts);
      setImage(nfts?.ownedNfts[0]?.media[0]?.gateway);
    }
  }, [address, web3]);

  useEffect(() => {
    getUserNft();
  }, [address, getUserNft]);
console.log(profileNft)
  return (
    <div className="mx-4 mt-16 sm:mt-32 sm:mx-10 md:mx-40">
      {/* Hi {slug as string}, your address is: {address as string} */}
      {
        profileNft&&(
      <div className="rounded-lg w-fit mb-6 md:mb-12">
        <img className="max-w-[150px] rounded-md border-solid border-2" src={profileNft.media[0]?.gateway} alt=""/>
        <div className="flex items-center mt-2">
        <p className="text-3xl font-semibold text-primary-500">{profileNft?.title}</p>
          <p className="ml-2 text-sm text-secondary-400 font-normal">{address&&getEllipsisTxt(address,3)}</p>
        </div>
      </div>
              )
   }


<div className="grid grid-cols-1 gap-y-3 gap-x-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 mt-7">
   {
        nfts?.map((nft) => (
      <div className="rounded-lg p-2 border border-solid border-secondary-500 w-fit">
      <img className="max-w-[200px] rounded-lg" src={nft?.media[0]?.gateway?nft?.media[0]?.gateway:image} alt=""/>
        <p className="text-sm font-semibold text-secondary-500 mt-2">{nft?.title}</p>
      </div>
        ))
      }
      </div>
    </div>
  );
};

export default Hunter;
