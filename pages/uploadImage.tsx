import { NFTStorage } from "nft.storage";
import React, { useState } from "react";
import Button from "../components/Button";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const changeHandler = (event: any) => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const blob = file.slice(0, file.size, "image/png");
    console.log(file?.name.replaceAll(" ", "-"));
    const newFile = new File([blob], file?.name.replaceAll(" ", "-"), {
      type: file?.type,
    });
    console.log(newFile);
    setSelectedFile(newFile);
    // setIsSelected(true);
  };

  const pushToIpfs = async () => {
    if (selectedFile) {
      const formData = new FormData();

      // Update the formData object
      formData.append("file", selectedFile, selectedFile.name);

      const options = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "412c165e-7662-4aed-9779-df503f6ab669",
        },
      };

      fetch("https://api.nftport.xyz/v0/files", options)
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          // Handle the response
          console.log(responseJson);
          if (responseJson?.ipfs_url) {
            fetch("https://api.nftport.xyz/v0/metadata", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "412c165e-7662-4aed-9779-df503f6ab669",
              },
              body: `{"name":"My Art","description":"This is my custom art piece","file_url":${responseJson?.ipfs_url}}`,
            })
              .then((response) => {
                return response.json();
              })
              .then((responseJson) => {
                // Handle the response
                console.log(responseJson);
              });
          }
        });
    }
  };

  /**
   * Reads an image file from `imagePath` and stores an NFT with the given name and description.
   * @param {string} imagePath the path to an image file
   * @param {string} name a name for the NFT
   * @param {string} description a text description for the NFT
   */
  // Paste your NFT.Storage API key into the quotes:
  const NFT_STORAGE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk3YTJFRUQxRmEyODU1NzgxNjQ2MzhkYjBmYTJCMGI5NWNBRTVmMTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0Nzc1Mjk1OTMxOCwibmFtZSI6IlRlc3QifQ.WM91oSclQSdEi-Nna1Fztb4tzWHSQ4Q812kARmYsAqg";
  async function storeNFT() {
    // load the file from disk
    // const image = await fileFromPath(imagePath)

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const modified = { ...selectedFile };
    console.log(modified);
    // call client.store, passing in the image & metadata
    const result = await nftstorage.store({
      image: selectedFile,
      name: "A Bounty",
      description: "This is a bounty",
    });

    console.log(result);
  }

  // const result = await storeNFT(imagePath, name, description);
  return (
    <div className="mx-4 mt-16 sm:mt-32 sm:mx-10 md:mx-20">
      UploadImage
      <input
        className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
        type="file"
        placeholder="upload image"
        onChange={changeHandler}
      />
      <Button onClick={storeNFT}>Submit</Button>
    </div>
  );
};

export default UploadImage;
