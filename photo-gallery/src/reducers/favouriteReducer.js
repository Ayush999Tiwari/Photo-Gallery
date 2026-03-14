
export function favouriteReducer(state = [], action) {
  switch (action.type) {
    case "TOGGLE_FAV": {
      const isFavourited = state.includes(action.payload);
      return isFavourited
        ? state.filter((id) => id !== action.payload)
        : [...state, action.payload];
    }
    default:
      return state;
  }
}
