import { Web3Storage } from "web3.storage";

const namePrefix = "bounty-hunt";
export async function storeFile(file: any, name: any) {
  // The name for our upload includes a prefix we can use to identify our files later
  const uploadName = [namePrefix, name].join("|");

  const token = process.env.NEXT_PUBLIC_WEB3STORAGE_KEY;
  if (!token) {
    console.log(
      "> ❗️ no API token found for Web3.Storage. You can add one in the settings page!"
    );
    return;
  }
  const web3storage = new Web3Storage({ token });
  console.log(`> 🤖 calculating content ID for ${name}`);
  const cid = await web3storage.put([file], {
    // the name is viewable at https://web3.storage/files and is included in the status and list API responses
    name: uploadName,

    // onRootCidReady will be called as soon as we've calculated the Content ID locally, before uploading
    onRootCidReady: (localCid) => {
      console.log(`> 🔑 locally calculated Content ID: ${localCid} `);
      console.log("> 📡 sending files to web3.storage ");
    },

    // onStoredChunk is called after each chunk of data is uploaded
    onStoredChunk: (bytes) =>
      console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`),
  });

  const gatewayURL = makeGatewayURL(cid, name);
  const uri = `ipfs://${cid}/${name}`;
  return { cid, gatewayURL, uri };
}

export function makeGatewayURL(cid: string, path: string) {
  return `https://ipfs.io/ipfs/${cid}/${encodeURIComponent(path)}`;
}
//   https://ipfs.io/ipfs/
export function jsonFile(filename: string, obj: any) {
  return new File([JSON.stringify(obj)], filename);
}
