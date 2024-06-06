"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "../Chat.module.scss";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";
import ModelSelector from "../ModelSelector/ModelSelector";
import SliderControl from "../SliderControl/SliderControl";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [model, setModel] = useState("Meta Llama 3 8B Chat");
  const [outputLength, setOutputLength] = useState(512);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.7);
  const [topK, setTopK] = useState(50);
  const [repetitionPenalty, setRepetitionPenalty] = useState(1);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, isUser: true }]);
    // Mock AI response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "AI response here...", isUser: false },
      ]);
    }, 1000);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.modelDisplay}>
        <p>{model}</p>
      </div>

      <div className={styles.chatBox}>
        <div className={styles.chatWindow}>
          <div className={styles.chatHistory}>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput onSend={handleSendMessage} />
        </div>

        <div className={styles.settingsPanel}>
          <ModelSelector model={model} setModel={setModel} />
          <div className={styles.modifications}>
            <h3>MODIFICATIONS</h3>

            <SliderControl
              label="Output Length"
              value={outputLength}
              setValue={setOutputLength}
              min={1}
              max={1024}
            />
            <SliderControl
              label="Temperature"
              value={temperature}
              setValue={setTemperature}
              min={0}
              max={1}
              step={0.01}
            />
            <SliderControl
              label="Top-P"
              value={topP}
              setValue={setTopP}
              min={0}
              max={1}
              step={0.01}
            />
            <SliderControl
              label="Top-K"
              value={topK}
              setValue={setTopK}
              min={0}
              max={100}
            />
            <SliderControl
              label="Repetition Penalty"
              value={repetitionPenalty}
              setValue={setRepetitionPenalty}
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
