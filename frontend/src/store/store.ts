import {
  PayloadAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { signupReducer, loginReducer } from "../features/slices/auth/authSlice";
import { userProfileReducer } from "../features/slices/users/userProfileSlice";
import { userMembershipsReducer } from "../features/slices/users/userMembershipsSlice";
import { gymProfileReducer } from "../features/slices/gyms/gymProfileSlics";
import { allGymsReducer } from "../features/slices/gyms/allGymsSlice";
import { singleGymReducer } from "../features/slices/gyms/singleGymSlice";
import { allChatsReducer } from "../features/slices/chat/allChatsSlice";
import { currentChatReducer } from "../features/slices/chat/currentChatSlice";
import { allMessagesReducer } from "../features/slices/message/messageSlice";
import { chatWindowReducer } from "../features/slices/chat/chatWindowSlice";
import { gymMembershipsReducer } from "../features/slices/gyms/gymMembershipsSlice";
import { notificationsReducer } from "../features/slices/notification/notificationSlice";
import { trainerProfileReducer } from "../features/slices/trainers/trainerProfileSlics";
import { trainerMembershipsReducer } from "../features/slices/trainers/trainerMembershipsSlice";
import { allTrainersReducer } from "../features/slices/trainers/allTrainersSlice";
import { singleTrainerReducer } from "../features/slices/trainers/singleTrainerSlice";
import { dieticianProfileReducer } from "../features/slices/dieticians/dieticianProfileSlics";
import { dieticianMembershipsReducer } from "../features/slices/dieticians/dieticianMembershipsSlice";
import { allDieticiansReducer } from "../features/slices/dieticians/allDieticiansSlice";
import { singleDieticianReducer } from "../features/slices/dieticians/singleDieticianSlice";
import socketReducer from "../features/slices/socket/socketSlice";

// import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['socket']
};

const reducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  userProfile: userProfileReducer,
  userMemberships: userMembershipsReducer,
  gymProfile: gymProfileReducer,
  gymMemberships: gymMembershipsReducer,
  allGyms: allGymsReducer,
  singleGym: singleGymReducer,
  trainerProfile: trainerProfileReducer,
  trainerMemberships: trainerMembershipsReducer,
  allTrainers: allTrainersReducer,
  singleTrainer: singleTrainerReducer,
  dieticianProfile: dieticianProfileReducer,
  dieticianMemberships: dieticianMembershipsReducer,
  allDieticians: allDieticiansReducer,
  singleDietician: singleDieticianReducer,
  allChats: allChatsReducer,
  currentChat: currentChatReducer,
  allMessages: allMessagesReducer,
  chatWindow: chatWindowReducer,
  notifications: notificationsReducer,
  socket: socketReducer,
});

const rootReducer = (state: any, action: PayloadAction) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;