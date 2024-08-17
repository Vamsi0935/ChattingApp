import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (event, emojiObject) => {
    // Log emojiObject to see its structure
    console.log("Selected emoji object:", emojiObject);
    if (emojiObject && emojiObject.emoji) {
      setMsg((prev) => prev + emojiObject.emoji);
    }
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.trim()) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <Picker
              onEmojiClick={handleEmojiClick}
              pickerStyle={{ position: "absolute", bottom: "60px", right: "0" }}
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  gap: 1rem;

  @media screen and (max-width: 719px) {
    grid-template-columns: 10% 90%;
    padding: 0 1rem;
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 15% 85%;
    padding: 0 0.5rem;
    gap: 0.5rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    position: relative;

    .emoji {
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff34;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }

      @media screen and (max-width: 480px) {
        padding: 0.3rem 0.5rem;
        svg {
          font-size: 1.5rem;
        }
      }

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
