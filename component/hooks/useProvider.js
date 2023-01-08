import { ethers } from "ethers";
import { useEffect, useState } from "react";

const useProvider = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const getProviderAndSigner = (ethereum) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    setProvider(provider);
    setSigner(signer);
  };

  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) return;
    getProviderAndSigner(ethereum);
  }, []);

  return { provider, signer };
};

export default useProvider;
