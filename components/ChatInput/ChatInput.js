// components/ChatInput.js

import React from "react";
import styles from "../Chat.module.scss";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const ChatInput = ({ value, onChange, onSubmit }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit(event);
    }
  };

  return (
    <form className={styles.chatForm} onSubmit={onSubmit}>
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter text here"
      />
      <div className={styles.icons}>
        <FaMicrophoneAlt className={styles.icon} />
        <FiSend className={styles.icon} onClick={onSubmit} />
      </div>
    </form>
  );
};

export default ChatInput;
