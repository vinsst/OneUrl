import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/actions";

import { ReactComponent as LikeImg } from "../assets/img/like.svg";
import chat from "../assets/img/chat.svg";
import flagReport from "../assets/img/flag-report.svg";
import star from "../assets/img/star.svg";
import { ReactComponent as SendValued } from "../assets/img/sendValued.svg";

function UserReview({ review, index, reviews, loggedIn }) {
  const [likeCount, setLikeCount] = useState(reviews[index].like);
  const [liked, setLiked] = useState(false);
  const [inputValueReport, setInputValueReport] = useState("");

  const handleChange = (event) => {
    setInputValueReport(event.target.value);
  };

  const hasValue = inputValueReport.trim().length > 0;

  const datePosted = new Date(review.date).toLocaleDateString();

  const counterReducer = useSelector(
    (state) => state.counterReducer[index] || 0
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Перевірка, чи відгук вже був лайкнутий користувачем
    // лайк 1 раз від 1 корист
    const likedReviews = localStorage.getItem("likedReviews");
    if (likedReviews) {
      const parsedLikedReviews = JSON.parse(likedReviews);
      if (parsedLikedReviews.includes(review._id)) {
        setLiked(true);
      }
    }
  }, [review._id]);

  const [showRepWin, setShowRepWin] = useState(false);

  function reportClick() {
    setShowRepWin(!showRepWin);
  }

  const handleLikeClick = async () => {
    try {
      let updatedLikeCount = likeCount;

      if (liked) {
        dispatch(decrement(index));
        updatedLikeCount--;
      } else {
        dispatch(increment(index));
        updatedLikeCount++;
      }

      setLiked(!liked);
      setLikeCount(updatedLikeCount);

      // Update localStorage for liked reviews
      const likedReviews = localStorage.getItem("likedReviews");
      if (likedReviews) {
        const parsedLikedReviews = JSON.parse(likedReviews);
        const updatedLikedReviews = liked
          ? parsedLikedReviews.filter((id) => id !== review._id)
          : [...parsedLikedReviews, review._id];

        localStorage.setItem(
          "likedReviews",
          JSON.stringify(updatedLikedReviews)
        );
      } else {
        localStorage.setItem("likedReviews", JSON.stringify([review._id]));
      }

      const response = await axios.put(
        `http://localhost:3001/reviews/${review._id}/like`,
        {
          liked: !liked,
        }
      );
      const updatedReview = response.data;

      setLikeCount(updatedReview.like);
      console.log("Оновлений відгук:", updatedReview);
    } catch (error) {
      console.error(error);
    }
  };

  const saveInputValue = () => {
    setShowRepWin(!showRepWin);

    const updatedInputValueReport = [
      ...review.inputValueReport,
      inputValueReport,
    ];

    axios
      .put(`http://localhost:3001/reviews/${review._id}/report`, {
        inputValueReport: updatedInputValueReport,
      })
      .then(() => {
        alert("Report is saved!");
      })
      .catch((error) => {
        console.error("Error saving report:", error);
      });
  };

  return (
    <div className="reviewMain__block_3 reviewMain__block">
      <div className="block__3_content block_content">
        <div className="block__3_part_1 block__3_part">
          <div className="steamAvatar_container">
            <div className="ellipseAvatarBack_pink">
              <img
                src={reviews[index].avatar}
                alt=""
                className="steamAvatar"
                width="50px"
                height="50px"
              />
            </div>
          </div>
          <div className="block__3_part_1_nickName">
            {reviews[index].nickname}
          </div>
        </div>
        <div className="block__3_line"></div>
        <div className="block__3_part_2 block__3_part">
          <div className="block__3_stars_date">
            <div className="block__3_stars">
              {[...Array(review.selectedStars)].map((index) => {
                return (
                  <>
                    <img src={star} alt="" height="15px" className="starH1" />
                  </>
                );
              })}
            </div>

            <div className="block__3_date">{datePosted}</div>
          </div>
          <div className="block__3_reviewText">{reviews[index].inputValue}</div>
        </div>
        <div className="block__3_line"></div>
        <div className="block__3_part_3 block__3_part">
          <div className="block__3_like_chat">
            {loggedIn ? (
              <div className="block__3_likes block__3_icons">
                <LikeImg
                  className={
                    liked
                      ? "block__3_icon_like_clicked block__3_icon block__3_icon_like"
                      : "block__3_icon_like block__3_icon"
                  }
                  onClick={handleLikeClick}
                />
                <div className="block__3_like_text">{likeCount}</div>
              </div>
            ) : (
              <a href="http://localhost:3001/auth/google">
                <div className="block__3_likes block__3_icons">
                  <LikeImg
                    width="15px"
                    height="15px"
                    className="block__3_icon_like block__3_icon"
                  />
                  <div className="block__3_like_text">{likeCount}</div>
                </div>
              </a>
            )}
            {/* <div
              className="block__3_comments block__3_icons"
              // onClick={() => updateShowComments()}
            >
              <img
                src={chat}
                alt=""
                width="15px"
                height="15px"
                className="block__3_icon"
              />
              <div className="block__3_comment_text">Comment {`(0)`}</div>
            </div> */}
          </div>
          <div className="block__3_flag block__3_icons">
            {loggedIn ? (
              <img
                src={flagReport}
                alt=""
                width="15px"
                height="15px"
                className="block__3_iconFlag"
                onClick={reportClick}
              />
            ) : (
              <a href="http://localhost:3001/auth/google">
                <img
                  src={flagReport}
                  alt=""
                  width="15px"
                  height="15px"
                  className="block__3_iconFlag"
                />
              </a>
            )}
          </div>
        </div>
      </div>
      {showRepWin ? (
        <div className="reportUpWindow">
          <span className="reportWindow__text">Describe the problem</span>
          <textarea
            type="text"
            placeholder="Describe what is wrong with this review"
            onChange={handleChange}
            className="reportUpWindowInput"
            value={inputValueReport}
          />
          {hasValue ? (
            <SendValued
              className="inputReview_send__valued reportSendImg"
              onClick={saveInputValue}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UserReview;
