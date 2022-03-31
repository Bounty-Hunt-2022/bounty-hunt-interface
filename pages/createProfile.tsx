import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { hunterDomainAddress, tld } from "../constants";
import DomainMaker from "../constants/abis/DomainMaker.json";
import useWallet from "../state/wallet/hook";
import { jsonFile, storeFile } from "../utils/storeFile";

const profile = {
  name: "Joydeep",
  bio: "I am a software engineer",
  email: "joydeepsingha68@gmail.com",
  live: "Kolkata, India",
  hunterType: ["", "", ""],
  twitter: "",
  link: "",
};

export interface generalInfo {
  name: string;
  bio: string;
  email: string;
  basedOf: string;
  hunterType: [string];
  twitter: string;
  portfolioLink: string;
}

const CreateProfile = () => {
  const [domain, setDomain] = useState("");
  const [record, setRecord] = useState("");
  const [info, setInfo] = useState<generalInfo>({
    name: "",
    bio: "",
    email: "",
    basedOf: "",
    hunterType: [""],
    twitter: "",
    portfolioLink: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { account, web3Provider } = useWallet();
  const [metadataUri, setMetaUri] = useState<undefined | string>();

  const setHunterType = (type: number) => {
    switch (type) {
      case 0:
        setInfo({ ...info, hunterType: ["Developer"] });
        break;
      case 1:
        setInfo({ ...info, hunterType: ["Designer"] });
        break;
      case 2:
        setInfo({ ...info, hunterType: ["Social Media Manager"] });
        break;
      case 3:
        setInfo({ ...info, hunterType: ["Community Manager"] });
        break;
      default:
        break;
    }
  };

  const setName = (name: string) => {
    setInfo({
      ...info,
      name,
    });
  };
  const setEmail = (email: string) => {
    setInfo({
      ...info,
      email,
    });
  };
  const setBasedOf = (basedOf: string) => {
    setInfo({
      ...info,
      basedOf,
    });
  };
  const setTwitter = (twitter: string) => {
    setInfo({
      ...info,
      twitter,
    });
  };
  const setPortfolioLink = (portfolioLink: string) => {
    setInfo({
      ...info,
      portfolioLink,
    });
  };
  const setBio = (bio: string) => {
    setInfo({
      ...info,
      bio,
    });
  };

  // Add a stateful array at the top next to all the other useState calls
  const [mints, setMints] = useState<any[]>([]);

  // Add this function anywhere in your component (maybe after the mint function)
  const fetchMints = async () => {
    try {
      // const provider = new ethers.providers.Web3Provider(ethereum);
      // const provider=web3Provider;
      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(
        hunterDomainAddress,
        DomainMaker,
        signer
      );

      // Get all the domain names from our contract
      const names = await contract.getAllNames();

      // For each name, get the record and the address
      const mintRecords = await Promise.all(
        names.map(async (name: any) => {
          const mintRecord = await contract.records(name);
          const owner = await contract.domains(name);
          return {
            id: names.indexOf(name),
            name: name,
            record: mintRecord,
            owner: owner,
          };
        })
      );

      console.log("MINTS FETCHED ", mintRecords);
      setMints(mintRecords);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Mints", mints);

  const mintDomain = async () => {
    // Don't run if the domain is empty
    if (!domain) {
      return;
    }
    if (!metadataUri) {
      const res = await generateProfile();
      if (!res) return;
    }
    // Alert the user if the domain is too short
    if (domain.length < 3) {
      alert("Domain must be at least 3 characters long");
      return;
    }
    // Calculate price based on length of domain (change this to match your contract)
    // 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
    const price =
      domain.length === 3 ? "0.5" : domain.length === 4 ? "0.3" : "0.1";
    console.log("Minting domain", domain, "with price", price);
    try {
      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(
        hunterDomainAddress,
        DomainMaker,
        signer
      );

      console.log("Going to pop wallet now to pay gas...");
      let tx = await contract.register(domain, record, metadataUri ?? "", {
        value: ethers.utils.parseEther(price),
      });
      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      // Check if the transaction was successfully completed
      if (receipt.status === 1) {
        console.log(
          "Domain minted! https://mumbai.polygonscan.com/tx/" + tx.hash
        );

        // Set the record for the domain
        // tx = await contract.setRecord(domain, record);
        // await tx.wait();

        // console.log("Record set! https://mumbai.polygonscan.com/tx/" + tx.hash);

        // Call fetchMints after 2 seconds
        setTimeout(() => {
          fetchMints();
        }, 2000);

        setRecord("");
        setDomain("");
      } else {
        alert("Transaction failed! Please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateDomain = async () => {
    if (!record || !domain) {
      return;
    }
    setLoading(true);
    console.log("Updating domain", domain, "with record", record);
    try {
      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(
        hunterDomainAddress,
        DomainMaker,
        signer
      );

      let tx = await contract.setRecord(domain, record);
      await tx.wait();
      console.log("Record set https://mumbai.polygonscan.com/tx/" + tx.hash);

      fetchMints();
      setRecord("");
      setDomain("");
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchMints();
  }, [account]);
  const editRecord = (name: string) => {
    console.log("Editing record for", name);
    setEditing(true);
    setDomain(name);
  };

  const generateProfile = async () => {
    const profileData = jsonFile("metadata.json", {
      ...info,
      image: `https://avatar.tobi.sh/${domain}.svg`,
    });
    const res = await storeFile(profileData, "metadata.json");
    console.log("Profile generated ", res);
    setMetaUri(res?.uri);
    return res;
  };

  return (
    <div className="mx-4 mt-16 sm:mt-32 sm:mx-10 md:mx-20">
      <div className="flex flex-col items-center max-w-sm m-auto">
        <h1 className="font-bold text-2xl text-center text-primary-500 mb-6">
          Mint Your Hunter Profile
        </h1>
        <div className="w-full flex items-center my-1">
          <input
            className="w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
            type="text"
            value={domain}
            placeholder="domain"
            onChange={(e) => setDomain(e.target.value)}
          />
          <p className="font-black text-primary-500"> {tld} </p>
        </div>

        <input
          className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
          type="text"
          value={record}
          placeholder="whats ur hunter power?"
          onChange={(e) => setRecord(e.target.value)}
        />
        <input
          className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
          type="text"
          value={info.name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
          type="text"
          value={info.bio}
          placeholder="Your Bio"
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
          type="text"
          value={info.basedOf}
          placeholder="Where are you based?"
          onChange={(e) => setBasedOf(e.target.value)}
        />
        <input
          className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
          type="text"
          value={info.twitter}
          placeholder="Twitter"
          onChange={(e) => setTwitter(e.target.value)}
        />
        <input
          className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
          type="text"
          value={info.portfolioLink}
          placeholder="Link to your portfolio or any where your best work is showcased"
          onChange={(e) => setPortfolioLink(e.target.value)}
        />
        <input
          className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
          type="text"
          value={info.email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-1 w-full">
          <div
            onClick={() => setHunterType(0)}
            className={`border-solid  cursor-pointer ${
              info.hunterType.includes("Developer")
                ? "bg-primary-500 text-white-500 hover:border-primary-300 hover:bg-primary-300"
                : "text-primary-500 hover:border-primary-600 hover:text-primary-600"
            }  text-center p-2 border-2 border-primary-500 rounded-md `}
          >
            Developer
          </div>
          <div
            onClick={() => setHunterType(1)}
            className={`border-solid  cursor-pointer ${
              info.hunterType.includes("Designer")
                ? "bg-primary-500 text-white-500 hover:border-primary-600 hover:bg-primary-600"
                : "text-primary-500 hover:border-primary-600 hover:text-primary-600"
            }  text-center p-2 border-2 border-primary-500 rounded-md `}
          >
            Designer
          </div>
          <div
            onClick={() => setHunterType(2)}
            className={`border-solid  cursor-pointer ${
              info.hunterType.includes("Social Media Manager")
                ? "bg-primary-500 text-white-500 hover:border-primary-600 hover:bg-primary-600"
                : "text-primary-500 hover:border-primary-600 hover:text-primary-600"
            }  text-center p-2 border-2 border-primary-500 rounded-md `}
          >
            Social Media Manager
          </div>
          <div
            onClick={() => setHunterType(3)}
            className={`border-solid  cursor-pointer ${
              info.hunterType.includes("Community Manager")
                ? "bg-primary-500 text-white-500 hover:border-primary-600 hover:bg-primary-600"
                : "text-primary-500 hover:border-primary-600 hover:text-primary-600"
            }  text-center p-2 border-2 border-primary-500 rounded-md `}
          >
            Community Manager
          </div>
        </div>
        {/* If the editing variable is true, return the "Set record" and "Cancel" button */}
        {editing ? (
          <div className="my-1 flex flex-col items-center w-full">
            <Button
              className="mb-1"
              block={true}
              disabled={loading}
              onClick={updateDomain}
            >
              Set record
            </Button>
            <Button
              block={true}
              onClick={() => {
                setEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          // If editing is not true, the mint button will be returned instead
          <>
            <Button className="mt-1" block={true} onClick={generateProfile}>
              Generate Profile
            </Button>
            <Button
              className="my-1"
              block={true}
              disabled={loading}
              onClick={mintDomain}
            >
              Mint
            </Button>
          </>
        )}
      </div>
      {account && mints.length > 0 && (
        <div className="max-w-xl m-auto mt-5">
          <h2 className="font-bold text-xl text-center text-primary-500 mb-6">
            Recently minted domains!
          </h2>
          <div className="flex flex-wrap justify-center items-center">
            {mints.map((mint, index) => {
              return (
                <div
                  className="m-1 w-fit bg-secondary-200 p-2 border-solid border-2 border-primary-500 rounded-md"
                  key={index}
                >
                  <div className="flex">
                    <a
                      className="font-black text-primary-500"
                      href={`https://testnets.opensea.io/assets/rinkeby/${hunterDomainAddress}/${mint.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="underlined">
                        {" "}
                        {mint.name}
                        {tld}{" "}
                      </p>
                    </a>
                    {/* If mint.owner is account, add an "edit" button*/}
                    {mint.owner.toLowerCase() === account.toLowerCase() ? (
                      <button
                        className="edit-button"
                        onClick={() => editRecord(mint.name)}
                      >
                        <img
                          className="object-contain w-4 ml-2"
                          src="https://img.icons8.com/metro/26/000000/pencil.png"
                          alt="Edit button"
                        />
                      </button>
                    ) : null}
                  </div>
                  <p> {mint.record} </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProfile;
