import React from "react";
import styles from "../Chat.module.scss";

const ModelSelector = ({ model, setModel }) => {
  return (
    <div className={styles.modelSelector}>
      <h3>MODEL</h3>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className={styles.modelSelect}
      >
        <option value="Meta Llama 3 8B Chat">Meta Llama 3 8B Chat</option>
        <option value="Meta Llama 3 8B Chat">GPT-4</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
};

export default ModelSelector;
