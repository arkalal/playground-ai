"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import styles from "../Chat.module.scss";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";
import SliderControl from "../SliderControl/SliderControl";
import Image from "next/image";
import scaleGenLogo from "../../assets/images/sg-logo.png";

const ChatWindow = () => {
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [outputLength, setOutputLength] = useState(626); // Default value
  const [temperature, setTemperature] = useState(0.8); // Default value
  const [topP, setTopP] = useState(1.0); // Default value
  const [topK, setTopK] = useState(50); // Default value
  const [repetitionPenalty, setRepetitionPenalty] = useState(1.0);
  const [Key, setKey] = useState("");
  const [Endpoint, setEndpoint] = useState("");

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: {
      model,
      outputLength,
      temperature,
      topP,
      topK,
      repetitionPenalty,
      Key,
      Endpoint,
    },
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.modelBoxes}>
        <div className={styles.modelChat}>
          <Image
            className={styles.ScaleGenLogo}
            src={scaleGenLogo}
            alt="ScaleGen Logo"
          />
          <h3>ScaleGenAI Playground</h3>
        </div>
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
          <div className={styles.settingsApiInput}>
            <input
              onChange={(e) => setKey(e.target.value)}
              type="text"
              placeholder="Enter Your API Key"
              value={Key}
            />
          </div>

          <div className={styles.settingsApiInput}>
            <input
              onChange={(e) => setEndpoint(e.target.value)}
              type="text"
              placeholder="Enter Your API Endpoint"
              value={Endpoint}
            />
          </div>
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
