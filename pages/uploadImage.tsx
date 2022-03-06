import React, { useState } from "react";
import Button from "../components/Button";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
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
  return (
    <div className="mx-4 mt-16 sm:mt-32 sm:mx-10 md:mx-20">
      UploadImage
      <input
        className="my-1 w-full p-2 border-solid border-2 border-primary-500 rounded-md active:border-primary-600 focus:outline-none focus:shadow-outline grow"
        type="file"
        placeholder="upload image"
        onChange={changeHandler}
      />
      <Button onClick={pushToIpfs}>Submit</Button>
    </div>
  );
};

export default UploadImage;
