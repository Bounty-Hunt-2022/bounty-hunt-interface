import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { bountyMakerAddress } from "../../constants";
import useWallet from "../../state/wallet/hook";
import BountyMaker from "../../constants/abis/BountyMaker.json";
import { uuid } from "uuidv4";
import Button from "../../components/Button";
import { getEllipsisTxt } from "../../utils";
import { jsonFile, storeFile } from "../../utils/storeFile";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const regex = new RegExp("^[0-9,]*$");
const regexNumber = new RegExp("^[0-9,]*$");
const Creator = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date(Date.now()).toISOString()
  );
  const [rewards, setRewards] = useState("");
  const [tokenLimit, setTokenLimit] = useState("");
  const [id, setId] = useState("");
  const [uri, setUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [endTime, setEndTime] = useState("");
  const [about, setAbout] = useState("");
  const [eligible, setEligile] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");

  const { account, web3Provider, connect, disconnect, chainId, provider } =
    useWallet();

  useEffect(() => {
    if (account) {
      isAdminCheck();
    }
  }, [account]);

  const isAdminCheck = async () => {
    try {
      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(
        bountyMakerAddress,
        BountyMaker,
        signer
      );
      const isAdmin = await contract.amIAdmin(account);
      console.log("isAdmin", isAdmin);
      if (isAdmin) {
        setEligile(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function tick() {
      setCurrentTime(new Date(Date.now()).toISOString());
    }
    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [currentTime]);
  const createBounty = async () => {
    if (!web3Provider) return;
    setLoading(true);
    try {
      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(
        bountyMakerAddress,
        BountyMaker,
        signer
      );
      //   setId(uuid());
      // const id = uuid();
      const res = await generateMetadata();
      if (!res) return;
      const id = res.cid;
      debugger;
      const tx = await contract.createBounty(
        id,
        uri,
        tokenLimit,
        rewards.split(","),
        endTime
      );
      const receipt = await tx.wait();

      // Check if the transaction was successfully completed
      if (receipt.status === 1) {
        console.log(
          "Bounty created! https://mumbai.polygonscan.com/tx/" + tx.hash
        );
      } else {
        alert("Transaction failed! Please try again");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const generateMetadata = async () => {
    const data = jsonFile("metadata.json", {
      about,
      submissionLink,
      id,
    });
    const res = await storeFile(data, "metadata.json");
    if (res) return res;
    return undefined;
  };

  return (
    <div className="mx-4 mt-16 sm:mt-32 sm:mx-10 md:mx-20">
      {!account && (
        <div className="flex flex-col items-center max-w-sm m-auto">
          {" "}
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
        </div>
      )}
      {account && !eligible && (
        <div className="flex flex-col items-center max-w-sm m-auto">
          <h1 className="font-bold text-2xl text-center text-primary-500 mb-6">
            Not eligible to create Bounty
          </h1>
        </div>
      )}

      {eligible && (
        <div className="flex flex-col items-center max-w-sm m-auto">
          <h1 className="font-bold text-2xl text-center text-primary-500 mb-6">
            Create Bounty
          </h1>
          {/* <input
          className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
          type="text"
          value={id}
          placeholder="bounty id"
          onChange={(e) => setId(e.target.value)}
        /> */}
          <input
            className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
            type="text"
            value={uri}
            placeholder="uri"
            onChange={(e) => setUri(e.target.value)}
          />
          <input
            className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
            type="text"
            value={tokenLimit}
            placeholder="Token Limit"
            onChange={(e) => {
              if (regexNumber.test(e.target.value)) {
                setTokenLimit(e.target.value);
                setRewards(
                  rewards.split(",").slice(0, Number(e.target.value)).join(",")
                );
              }
            }}
          />

          <input
            className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
            type="datetime-local"
            min={currentTime.substring(0, 16)}
            //   value={record}
            placeholder="Date"
            onChange={(e) => {
              const date = new Date(e.target.value);
              setEndTime((date.getTime() / 1000).toString());
              // console.log(e.target.value,(date.getTime()/1000))
            }}
          />
          <input
            className="mt-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
            type="text"
            value={rewards}
            placeholder="Rewards"
            onChange={(e) => {
              const rewardArr = e.target.value.split(",");
              if (
                regex.test(e.target.value) &&
                rewardArr.length < Number(tokenLimit)
              ) {
                setRewards(e.target.value);
              } else if (
                regexNumber.test(e.target.value) &&
                rewardArr.length === Number(tokenLimit)
              ) {
                setRewards(e.target.value);
              }
            }}
          />
          <span className="text-primary-500 mb-1 w-full text-xs">
            Separate Amount with comma space
          </span>
          <input
            className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
            type="text"
            value={submissionLink}
            placeholder="Submisson Link"
            onChange={(e) => setSubmissionLink(e.target.value)}
          />
          <textarea
            className="mt-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
            value={about}
            onChange={(e) => {
              if (about.length <= 500) setAbout(e.target.value);
            }}
            placeholder="About (Markdown supported 📝)"
          />
          <span className="text-primary-500 mb-1 w-full text-xs">
            {about.length}/500
          </span>
          <ReactMarkdown children={about} remarkPlugins={[remarkGfm]} />
          <Button className="my-1" block={true} onClick={generateMetadata}>
            Generate Metadata
          </Button>
          <Button disabled={loading} block onClick={createBounty}>
            {!loading ? "Create Bounty 🚀" : "Creating Bounty 🏗"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Creator;
