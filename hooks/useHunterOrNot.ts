import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { useCallback, useEffect, useState } from "react";
import { hunterDomainAddress } from "../constants";
import useWallet from "../state/wallet/hook";
const web3 = createAlchemyWeb3(
  `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
);
const useHunterOrNot = () => {
  const { account } = useWallet();
  const [hunterDomain, setHunterDomain] = useState<undefined | string>();
  const [loading, setLoading] = useState<undefined | string>();

  const fetchHunterMetadata = useCallback(async () => {
    if (account) {
      setLoading("loading");
      const nfts: any = await web3.alchemy.getNfts({
        owner: account,
        contractAddresses: [hunterDomainAddress],
      });
      setHunterDomain(nfts.ownedNfts[0]?.title);
      setLoading(undefined);
      return nfts.ownedNfts.filter[0];
    } else setHunterDomain(undefined);
  }, [account]);
  useEffect(() => {
    fetchHunterMetadata();
  }, [fetchHunterMetadata]);
  return { hunterDomain, hunterLoading: loading };
};
export default useHunterOrNot;
