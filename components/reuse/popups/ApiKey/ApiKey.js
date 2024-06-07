import React from "react";
import styles from "./ApiKey.module.scss";
import { IoMdClose } from "react-icons/io";

const ApiKey = ({ setKeyPopup, setKey }) => {
  return (
    <div className={styles.ApiKey}>
      <div className={styles.ApiKeyContent}>
        <IoMdClose
          onClick={() => setKeyPopup(false)}
          className={styles.ApiKeyClose}
        />

        <form action="">
          <input
            onChange={(e) => setKey(e.target.value)}
            type="text"
            placeholder="Enter Your Api Key"
          />
          <button onClick={() => setKeyPopup(false)} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApiKey;
