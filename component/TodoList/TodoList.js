import { Button } from "@mui/material";
import useConnection from "../hooks/useConnection";
import List from "../List/List";
import Metamask from "../GetMetamask/Metamask";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const {
    isMetamask,
    chainId,
    isValidChainId,
    addressConnected,
    connectWallet,
  } = useConnection();

  const address = addressConnected && `${addressConnected.slice(0, 6)}...${addressConnected.slice(
    addressConnected.length - 4
  )}`;

  const NetworkInfo = () => (
    <div className={styles.networkContainer}>
      {isValidChainId ? (
        <div
          style={{ color: "green" }}
        >{`Chain ID: ${chainId} - Goerli network`}</div>
      ) : (
        <div style={{ color: "red" }}>Please, connect to Goerli network</div>
      )}
      {isMetamask && addressConnected ? (
        <div>Connected to address: {address}</div>
      ) : (
        <Button variant="contained" onClick={connectWallet}>Connect Wallet</Button>
      )}
    </div>
  );

  return (
    <div>
      {isMetamask ? <NetworkInfo /> : <Metamask />}
      {isMetamask && isValidChainId && addressConnected && <List />}
    </div>
  );
};

export default TodoList;
