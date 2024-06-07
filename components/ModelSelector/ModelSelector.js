// components/ModelSelector.js

import React from "react";
import styles from "../Chat.module.scss";

const models = [
  "gpt-3.5-turbo",
  "gpt-4",
  "gpt-4-turbo-2024-04-09",
  "gpt-4o-2024-05-13",
  // Add other available models
];

const ModelSelector = ({ model, setModel }) => {
  return (
    <div className={styles.modelSelector}>
      <h3>MODEL</h3>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className={styles.modelSelect}
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;
