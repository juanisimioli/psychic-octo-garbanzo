import styles from "./Metamask.module.css";

const Metamask = () => {
  return (
    <div className={styles.container}>
      <p>
        Metamask is not installed, <br />
        Download{" "}
        <a className={styles.link} target="_blank" href="https://metamask.io/">
          Metamask
        </a>{" "}
        to continue.
      </p>
    </div>
  );
};

export default Metamask;
