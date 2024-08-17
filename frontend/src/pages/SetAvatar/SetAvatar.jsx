import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      fetchAvatars();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchAvatars = async () => {
    try {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
    } catch (error) {
      console.error("Error fetching avatars:", error);
      toast.error("Error fetching avatars. Please try again.", toastOptions);
    }
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      try {
        const user = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        const { data } = await axios.post(
          `https://chatting-app-api.vercel.app/api/auth/setavatar/${user._id}`,
          {
            image: avatars[selectedAvatar],
          }
        );

        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(user)
          );
          navigate("/chat");
        } else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
      } catch (error) {
        console.error("Error setting profile picture:", error);
        toast.error(
          "Error setting profile picture. Please try again.",
          toastOptions
        );
      }
    }
  };

  return (
    <Container>
      <div className="title-container">
        <h1>Pick an Avatar as your profile picture</h1>
      </div>
      <div className="avatars">
        {avatars.map((avatar, index) => (
          <div
            className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
            key={index}
          >
            <img
              src={`data:image/svg+xml;base64,${avatar}`}
              alt="avatar"
              onClick={() => setSelectedAvatar(index)}
            />
          </div>
        ))}
      </div>
      <button onClick={setProfilePicture} className="submit-btn">
        Set as Profile Picture
      </button>
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .title-container {
    h1 {
      color: white;
      font-size: 2rem; /* Default font size */
      text-align: center;
      margin: 0;
    }
  }

  .avatars {
    display: flex;
    flex-wrap: wrap; /* Allow avatars to wrap on smaller screens */
    gap: 2rem;
    justify-content: center; /* Center avatars */
    margin-bottom: 2rem; /* Space between avatars and button */

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;

      img {
        height: 6rem;
        width: 6rem; /* Ensure images are square */
        object-fit: cover; /* Ensure images cover the container */
        transition: 0.5s ease-in-out;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3b2a77;
    }
  }

  @media screen and (max-width: 768px) {
    .title-container {
      h1 {
        font-size: 1.5rem;
      }
    }

    .avatars {
      gap: 1.5rem;
    }

    .avatar {
      padding: 0.3rem;
      img {
        height: 5rem; 
      }
    }

    .submit-btn {
      padding: 0.8rem 1.5rem; 
      font-size: 0.9rem; 
    }
  }

  @media screen and (max-width: 480px) {
    .title-container {
      h1 {
        font-size: 1.2rem;
      }
    }

    .avatars {
      gap: 1rem;
      flex-direction: column;
      align-items: center;
    }

    .avatar {
      padding: 0.2rem;
      img {
        height: 4rem;
      }
    }

    .submit-btn {
      padding: 0.6rem 1rem;
      font-size: 0.8rem;
    }
  }
`;
