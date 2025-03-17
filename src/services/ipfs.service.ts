import { create, IPFSHTTPClient } from 'ipfs-http-client';

let ipfsClient: IPFSHTTPClient;

const initializeIPFS = () => {
  if (!ipfsClient) {
    ipfsClient = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: `Basic ${Buffer.from(
          process.env.INFURA_PROJECT_ID + ':' + process.env.INFURA_API_SECRET
        ).toString('base64')}`
      }
    });
  }
  return ipfsClient;
};

export const uploadToIPFS = async (data: any): Promise<string> => {
  try {
    const client = initializeIPFS();
    const result = await client.add(JSON.stringify(data));
    return result.path;
  } catch (error) {
    console.error('IPFS upload failed:', error);
    throw error;
  }
};

export const getFromIPFS = async (hash: string): Promise<any> => {
  try {
    const client = initializeIPFS();
    const stream = client.cat(hash);
    const data = [];
    
    for await (const chunk of stream) {
      data.push(chunk);
    }
    
    return JSON.parse(Buffer.concat(data).toString());
  } catch (error) {
    console.error('IPFS fetch failed:', error);
    throw error;
  }
};