"use client";
import React, { useState } from "react";
import styles from "../Chat.module.scss";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form className={styles.chatForm} onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter text here"
      />
      <div className={styles.icons}>
        <FaMicrophoneAlt className={styles.icon} />
        <FiSend className={styles.icon} onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default ChatInput;
