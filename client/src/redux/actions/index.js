export const increment = (index) => {
  return {
    type: "LIKE-INCREMENT",
    index,
  };
};

export const decrement = (index) => {
  return {
    type: "LIKE-DECREMENT",
    index,
  };
};
