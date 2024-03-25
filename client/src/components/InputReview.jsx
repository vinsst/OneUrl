import React, { useEffect, useState } from "react";
import { ReactComponent as Send } from "../assets/img/send.svg";
import { ReactComponent as SendValued } from "../assets/img/sendValued.svg";
import axios from "axios";

const InputReview = ({ updateErrorSavingUserReview, selectedStars }) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [nickname, setNickname] = useState("");
  const [ID, setID] = useState("");
  useEffect(() => {
    axios
      .get("https://reviewforport.onrender.com/user", {
        withCredentials: true,
      })
      .then((response) => {
        const avatar = response.data.photos[0].value;
        setAvatarUrl(avatar);
        const getNick = response.data.displayName;
        setNickname(getNick);
        const ID = response.data.id;
        setID(ID);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const hasValue = inputValue.trim().length > 0;

  const [errorSavingUserReview, setErrorSavingUserReview] = useState(false);

  const saveInputValue = () => {
    axios
      .post("https://reviewforport.onrender.com/api/save-input-review", {
        inputValue,
        selectedStars,
        avatar: avatarUrl,
        nickname,
        ID,
      })
      .then(() => {
        console.log("Value saved successfully");
        setErrorSavingUserReview(false);
        updateErrorSavingUserReview(false);
        alert("Review is saved!");
      })
      .catch((error) => {
        console.error("Error saving values:", error);
        setErrorSavingUserReview(true);
        updateErrorSavingUserReview(true);
      });
  };
  console.log(errorSavingUserReview);
  return (
    <div className="input-review-container">
      <textarea
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Write a review"
        className={
          errorSavingUserReview ? "custom-input error" : "custom-input"
        }
      />
      {hasValue ? (
        <SendValued
          className="inputReview_send__valued"
          onClick={saveInputValue}
        />
      ) : (
        <Send className="inputReview_send" />
      )}
    </div>
  );
};

export default InputReview;
