"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import styles from "../Chat.module.scss";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";
import ModelSelector from "../ModelSelector/ModelSelector";
import SliderControl from "../SliderControl/SliderControl";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import ApiKey from "../reuse/popups/ApiKey/ApiKey";

const ChatWindow = () => {
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [outputLength, setOutputLength] = useState(512);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(1.0);
  const [topK, setTopK] = useState(50);
  const [repetitionPenalty, setRepetitionPenalty] = useState(1.0);
  // const [KeyPopup, setKeyPopup] = useState(false);
  const [Key, setKey] = useState("");

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
      {/* <button onClick={() => setKeyPopup(true)} className={styles.chatApiKey}>
        Your API Key
      </button> */}

      {/* {KeyPopup && (
        <>
          <ApiKey setKey={setKey} setKeyPopup={setKeyPopup} />
        </>
      )} */}

      <div className={styles.modelBoxes}>
        <div className={styles.modelChat}>
          <IoChatboxEllipsesSharp />
          <h3>CHAT</h3>
        </div>

        {/* <div className={styles.modelDisplay}>
          <p>{model}</p>
        </div> */}
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
              placeholder="Enter Your Api Key"
              value={Key}
            />
          </div>
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
