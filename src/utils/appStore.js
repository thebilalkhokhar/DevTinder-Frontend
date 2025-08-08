import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsSlice from "./connectionsSlice";
import requestsSlice from "./requestsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsSlice,
    requests: requestsSlice,
  },
});

export default appStore;
