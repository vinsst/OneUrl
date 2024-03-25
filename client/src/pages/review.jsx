import React, { useState, useEffect } from "react";

import axios from "axios";

import Star from "../components/Star";

import star from "../assets/img/star.svg";
import ratWithStar1 from "../assets/img/ratWithStar2.png";
import starObjects from "../assets/img/OBJECTS_star.png";
import devBTN from "../assets/img/devBTN.png";

import SteamAvatar from "../components/SteamAvatar";
import InputReview from "../components/InputReview";
import UserReview from "../components/UserReview";

function Review() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [rating, setRating] = useState();
  const [hoverIndex, setHoverIndex] = useState(0);
  const [inputReview, setInputReview] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);
  const [handleIfClickedStars, setHandleIfClickedStars] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [errorSavingUserReview, setErrorSavingUserReview] = useState(false);
  const [showReviewsWithRating, setShowReviewsWithRating] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get("https://reviewforport.onrender.com/user", {
        withCredentials: true,
      })
      .then((response) => {
        const loggedInValue = response.data.photos[0].value ? true : false;
        setLoggedIn(loggedInValue);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHoverIndex(0);
    }, 10000);
  };

  const showInputReview = () => setInputReview(!inputReview);

  const handleStarClick = (index) => {
    setSelectedStars(index);
    setHandleIfClickedStars(true);
    setHoverIndex(index);
  };

  useEffect(() => {
    axios
      .get(`https://reviewforport.onrender.com/api/get-all-reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error getting reviews:", error);
      });
  }, []);

  const handleUpdateErrorSavingUserReview = (error) => {
    setErrorSavingUserReview(error);
  };

  let ratingAverage =
    reviews.reduce((sum, review) => sum + review.selectedStars, 0) /
    reviews.length;

  let ratingAverageRounded = ratingAverage.toFixed(1);

  let integerRating = Math.round(ratingAverageRounded);

  const perCentReview = (index) => {
    const numberReview = reviews.filter(
      (review) => review.selectedStars === index
    );
    const perCentReviewUnrounded = (numberReview.length / reviews.length) * 100;
    return Math.round(perCentReviewUnrounded);
  };

  const handleCellClick = (index) => {
    setRating(6 - index);
    setShowReviewsWithRating(true);
  };

  return (
    <main className="reviewPage">
      <div className="companyPreview">
        <div className="companyPreview container">
          <div className="companyPreview content">
            <div className="siteRating">
              <h2 className="review-title">
                <span className="review-title_pink-text">Review </span>
                site for portfolio
              </h2>
              <div className="starsH1">
                {Array.from({ length: integerRating }).map(() => (
                  <img src={star} alt="" height="25px" className="starH1" />
                ))}
              </div>
              <div className="reviews-rating-number">
                <span className="rating-word">
                  {reviews.length} people have left their review on our website
                  <br />
                  Try this functionality right now!
                </span>
              </div>
              <a href="mailto:forpc822946@gmail.com">
                <img src={devBTN} alt="" height="70px" className="devBTN" />
              </a>
            </div>
            <img
              src={starObjects}
              alt=""
              className="starObjects"
              height="850px"
            />
          </div>
        </div>
      </div>
      <div className="reviewMain">
        <div className="reviewMain__container container">
          <div className="reviewMain__content content"></div>
          <div className="reviewMain__block_1 reviewMain__block">
            <div className="block__1_content block_content">
              <div className="block__1_personal">
                {loggedIn ? (
                  <div className="block__1_avatar">
                    <SteamAvatar ellipseColor="ellipseAvatarBack_pink" />
                  </div>
                ) : (
                  <></>
                )}

                {inputReview ? (
                  <InputReview
                    selectedStars={selectedStars}
                    updateErrorSavingUserReview={
                      handleUpdateErrorSavingUserReview
                    }
                  />
                ) : (
                  <>
                    {loggedIn ? (
                      <span
                        className="block__1_personal_text"
                        onClick={showInputReview}
                      >
                        Write a review
                      </span>
                    ) : (
                      <a href="https://reviewforport.onrender.com/auth/google">
                        <span className="block__1_personal_text">
                          Write a review
                        </span>
                      </a>
                    )}
                  </>
                )}
              </div>
              <div className="block__1_stars">
                <ul
                  className={
                    errorSavingUserReview
                      ? "block__1_stars_list error"
                      : "block__1_stars_list"
                  }
                >
                  {[1, 2, 3, 4, 5].map((index) => {
                    return (
                      <>
                        {loggedIn ? (
                          <li
                            onMouseEnter={() => {
                              if (!handleIfClickedStars) {
                                setHoverIndex(index);
                              }
                            }}
                            onMouseLeave={handleMouseLeave}
                            className="block__1_stars_list_item"
                            onClick={() => handleStarClick(index)}
                          >
                            <Star
                              yellow={
                                index <=
                                (handleIfClickedStars
                                  ? selectedStars
                                  : hoverIndex)
                              }
                            />
                          </li>
                        ) : (
                          <a href="https://reviewforport.onrender.com/auth/google">
                            <li
                              onMouseEnter={() => {
                                if (!handleIfClickedStars) {
                                  setHoverIndex(index);
                                }
                              }}
                              onMouseLeave={handleMouseLeave}
                              className="block__1_stars_list_item"
                            >
                              <Star
                                yellow={
                                  index <=
                                  (handleIfClickedStars
                                    ? selectedStars
                                    : hoverIndex)
                                }
                              />
                            </li>
                          </a>
                        )}
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="reviewMain__block_2 reviewMain__block">
            <div className="block__2_content block_content">
              <h3 className="block__2_h3">
                <span>Sort reviews</span>
              </h3>
              {[1, 2, 3, 4, 5].map((index) => {
                const widthValue = perCentReview(6 - index) + "%";
                return (
                  <div className="block__2_starLines">
                    <div
                      className="block__2_starLines_cell"
                      onClick={() => handleCellClick(index)}
                    ></div>
                    <div className="block__2_starLines_starNumber">
                      {6 - index} star
                    </div>
                    <div className="block__2_starLines_line">
                      <div
                        className={`block__2_starLines_line_2_${index}`}
                        style={{ width: widthValue }}
                      ></div>
                    </div>
                    <span className="block__2_starLines_rate">
                      {perCentReview(6 - index)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {reviews.map((review, index) => {
            if (showReviewsWithRating && review.selectedStars !== rating) {
              return null;
            }
            return (
              <UserReview
                review={review}
                index={index}
                reviews={reviews}
                loggedIn={loggedIn}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Review;
