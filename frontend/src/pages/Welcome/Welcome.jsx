import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setUserName(
      JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        .username
    );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  text-align: center;
  gap: 1rem;

  img {
    height: 20rem;
    width: auto;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
    span {
      color: #4e0eff;
    }
  }

  h3 {
    font-size: 1.2rem;
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    img {
      height: 15rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 480px) {
    img {
      height: 10rem;
    }

    h1 {
      font-size: 1.2rem;
    }

    h3 {
      font-size: 0.9rem;
    }
  }
`;
