import { useEffect, useState } from "react";

const targetNetworkId = 5;

const useConnection = () => {
  const [isMetamask, setIsMetamask] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [addressConnected, setAddressConnected] = useState("");
  const [chainId, setChainId] = useState(null);
  const isValidChainId = chainId === targetNetworkId;

  const checkConnection = async () => {
    const { ethereum } = window;

    if (ethereum) {
      setIsMetamask(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const chainId = await ethereum.request({ method: "eth_chainId" });
      setChainId(parseInt(chainId));
      if (accounts.length > 0) {
        setIsConnected(true);
        setAddressConnected(accounts[0]);
      } else {
        setIsConnected(false);
        setAddressConnected(null);
      }
    } else {
      setIsMetamask(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const getAccount = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setAddressConnected(accounts[0]);
  };

  const connectWallet = async () => {
    try {
      if (!ethereum || !isValidChainId) return;

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserLoggedIn(true);
      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!isMetamask) return;

    ethereum.on("accountsChanged", getAccount);
    ethereum.on("chainChanged", (_chainId) => window.location.reload());

    return () => {
      ethereum.removeListener("accountsChanged", getAccount);
      ethereum.removeListener("chainChanged", (_chainId) =>
        window.location.reload()
      );
    };
  }, [isMetamask]);

  return {
    isMetamask,
    isConnected,
    addressConnected,
    chainId,
    isValidChainId,
    connectWallet,
  };
};

export default useConnection;
