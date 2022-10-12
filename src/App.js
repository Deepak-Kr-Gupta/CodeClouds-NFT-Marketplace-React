import "./App.css";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import contractABI from "./contractABI.json";

//const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //Local
const contractAddress = "0x0Bf04d8b3e0B860F68843D368023E89D9513f4F0"; // Production


function App() {
 
	const [account, setAccount] = useState(null);
	const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [NFTContract, setNFTContract] = useState(null);
  // state for whether app is minting or not.
	const [isMinting, setIsMinting] = useState(false);


  useEffect(() => {
    console.log("test");
		if (window.ethereum) {
			setIsWalletInstalled(true);
		}
	}, []);

  useEffect(() => {
		function initNFTContract() {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setNFTContract(new Contract(contractAddress,contractABI.abi,signer));
		}
		initNFTContract();
	}, [account]);


  async function connectWallet() {
		window.ethereum
			.request({
				method: "eth_requestAccounts",
			})
			.then((accounts) => {
				setAccount(accounts[0]);
			})
			.catch((error) => {
				alert("Something went wrong");
			});
	}
 

    const data = [
        {
            url: "./assets/images/cc-nft-1.png",
            param: "handleMint('https://gateway.pinata.cloud/ipfs/QmQTSByCuj8soPZxNFgouwvjZ7LmSgrrDRfTDUvxkmHAPY/cc-nft-1.png')",
        },
        {
          url: "./assets/images/cc-nft-2.png",
            param: "handleMint('https://gateway.pinata.cloud/ipfs/QmQTSByCuj8soPZxNFgouwvjZ7LmSgrrDRfTDUvxkmHAPY/cc-nft-2.png')",
        },
        {
          url: "./assets/images/cc-nft-3.png",
            param: "handleMint('https://gateway.pinata.cloud/ipfs/QmQTSByCuj8soPZxNFgouwvjZ7LmSgrrDRfTDUvxkmHAPY/cc-nft-3.png')",
        },
        {
          url: "./assets/images/cc-nft-4.png",
            param: "handleMint('https://gateway.pinata.cloud/ipfs/QmQTSByCuj8soPZxNFgouwvjZ7LmSgrrDRfTDUvxkmHAPY/cc-nft-4.png')",
        },
        {
          url: "./assets/images/cc-nft-5.png",
            param: "handleMint('https://gateway.pinata.cloud/ipfs/QmQTSByCuj8soPZxNFgouwvjZ7LmSgrrDRfTDUvxkmHAPY/cc-nft-5.png')",
        },
        {
          url: "./assets/images/cc-nft-6.png",
            param: "handleMint('https://gateway.pinata.cloud/ipfs/QmQTSByCuj8soPZxNFgouwvjZ7LmSgrrDRfTDUvxkmHAPY/cc-nft-6.png')",
        },
        {
          url: "./assets/images/cc-nft-7.png",
            param: "handleMint('https://gateway.pinata.cloud/ipfs/QmQTSByCuj8soPZxNFgouwvjZ7LmSgrrDRfTDUvxkmHAPY/cc-nft-7.png')",
        },
        {
          url: "./assets/images/cc-nft-8.png",
            param: "handleMint('https://gateway.pinata.cloud/ipfs/QmQTSByCuj8soPZxNFgouwvjZ7LmSgrrDRfTDUvxkmHAPY/cc-nft-8.png')",
        },
    ];

    async function withdrawMoney(){
        try {
            const response = await NFTContract.withdrawMoney();
            console.log("Received: ", response);
          } catch (err) {
              alert(err);
          }
    }
    async function CountNFT(){
      try {
          const response = await NFTContract.balanceOf(account);
          console.log("Add: ", account);
          console.log(response);
          const hexToDecimal = parseInt(response, 16);
          console.log(hexToDecimal);
          console.log("NFT Count: ", JSON.parse(response));
        } catch (err) {
            alert(err);
        }
        
  }

    async function handleMint(tokenURI) {
        setIsMinting(true);
            try {
              const options = {value: ethers.utils.parseEther("0.00")};
              const response = await NFTContract.mintNFT(tokenURI, options);

              console.log("Received: ", response);

            } catch (err) {
                alert(err);
            }
            finally {
              setIsMinting(false);
            }
    }

    if (account === null) {
      return (
        <>
         <div className="container">
           <br/>
          <h1>CodeClouds NFT Marketplace</h1>
          <h2>NFT Collection</h2>
          <p>Buy a Free NFT from our marketplace.</p>
  
          {isWalletInstalled ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <p>Install Metamask wallet</p>
          )}
          </div>
          </>
      );
    }

    return (
        <>
            <div className="container">
            <br/>
            <h1>CodeClouds NFT Marketplace</h1>
          
             <h2>NFT Collection</h2>
                {data.map((item, index) => (
                    <div className="imgDiv">
                        <img
                            src={item.url}
                            key={index}
                            alt="images"
                            width={200}
                            height={250}
                        />
                        <button isLoading={isMinting}
                            onClick={() => {
                                eval(item.param);
                            }}
                        >
                            Mint - FREE
                        </button>
                    </div>
                ))}
                 {/* <button 
                            onClick={() => {
                                withdrawMoney();
                            }}
                        >
                            Withdraw Money from Contract
                 </button> */}
                 {/* <button 
                            onClick={() => {
                              CountNFT();
                            }}
                        >
                            CountNFT from Contract
                 </button> */}
          
        </div>

        </>
    );
}

export default App;