// like-counter.js
const counterReducer = (state = {}, action) => {
  switch (action.type) {
    case "LIKE-INCREMENT":
      return {
        ...state,
        [action.index]: (state[action.index] || 0) + 1,
      };
    case "LIKE-DECREMENT":
      return {
        ...state,
        [action.index]: (state[action.index] || 0) - 1,
      };
    default:
      return state;
  }
};

export default counterReducer;
