import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { hunterDomainAddress } from "../../constants";
import DomainMaker from "../../constants/abis/DomainMaker.json";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const Hunter = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [address, setAddress] = useState<undefined | string>();
  const [nfts, setNfts] = useState<any[]>([]);
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
    `https://eth-rinkeby.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
  );

  const getUserNft = useCallback(async () => {
    if (address) {
      const nfts = await web3.alchemy.getNfts({
        owner: address,
        contractAddresses: ["0xd94407b3ea5a422757fdfb4fcb0b633b451b0fe1"],
      });
      console.log(nfts);
      // setNfts(nfts);
    }
  }, [address, web3]);

  useEffect(() => {
    getUserNft();
  }, [address, getUserNft]);

  return (
    <div className="mx-4 mt-16 sm:mt-32 sm:mx-10 md:mx-20">
      Hi {slug as string}, your address is: {address as string}
    </div>
  );
};

export default Hunter;
