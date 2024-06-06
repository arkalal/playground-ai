import React from "react";
import styles from "../Chat.module.scss";

const ChatMessage = ({ message }) => {
  return (
    <div className={styles.chatMessage}>
      <div className={message.isUser ? styles.userText : styles.aiText}>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
