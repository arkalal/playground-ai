// components/ChatWindow.js

"use client";

import React, { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import styles from "../Chat.module.scss";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";
import ModelSelector from "../ModelSelector/ModelSelector";
import SliderControl from "../SliderControl/SliderControl";

const ChatWindow = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.modelDisplay}>
        <p>gpt-3.5-turbo</p>
      </div>
      <div className={styles.chatBox}>
        <div className={styles.chatWindow}>
          <div className={styles.chatHistory}>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
        <div className={styles.settingsPanel}>
          <ModelSelector model={"gpt-3.5-turbo"} setModel={() => {}} />
          <div className={styles.modifications}>
            <h3>MODIFICATIONS</h3>
            <SliderControl
              label="Output Length"
              value={512}
              setValue={() => {}}
              min={1}
              max={1024}
            />
            <SliderControl
              label="Temperature"
              value={0.7}
              setValue={() => {}}
              min={0}
              max={1}
              step={0.01}
            />
            <SliderControl
              label="Top-P"
              value={10}
              setValue={() => {}}
              min={0}
              max={1}
              step={0.01}
            />
            <SliderControl
              label="Top-K"
              value={20}
              setValue={() => {}}
              min={0}
              max={100}
            />
            <SliderControl
              label="Repetition Penalty"
              value={20}
              setValue={() => {}}
              min={0}
              max={2}
              step={0.01}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;