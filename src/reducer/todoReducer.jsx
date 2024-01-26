const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        {
          id: state.length + 1,
          name: action.payload,
          done: false,
        },
      ];
    case "DELETE_ITEM":
      return state.filter((item) => item.id !== action.payload);
    case "MARK_AS_DONE":
      return state.map((item) =>
        item.id === action.payload ? { ...item, done: !item.done } : item
      );

    default:
      return state;
  }
};

export default todoReducer;
