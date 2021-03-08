let initialState = {};

const user = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER": {
      return {
        ...state,
        [payload.id]: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default user;
