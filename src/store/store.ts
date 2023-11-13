import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { postsApi } from "./api/postsApi";
import { usersApi } from "./api/usersApi";
import authSlice from "./slices/authSlice";

const middlewares = [usersApi.middleware];

// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`);
//   middlewares.push(logger);
// }

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer, // <-- lägg till
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...middlewares,
      postsApi.middleware, // <-- lägg till
    ),
});

setupListeners(store.dispatch);
