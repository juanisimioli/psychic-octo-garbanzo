import styles from "./Info.module.css";

const Info = () => {
  return (
    <div className={styles.container}>
      <p>
        Made by{" "}
        <a
          className={styles.link}
          href="https://www.linkedin.com/in/juanisimioli/"
          target="_blank"
        >
          juanisimioli
        </a>
      </p>
      <p>
        Github: {" "}
        <a
          className={styles.link}
          href="https://github.com/juanisimioli/todolist_ethereum"
          target="_blank"
        >
          {" "}
          Repo
        </a>
      </p>
    </div>
  );
};

export default Info;
