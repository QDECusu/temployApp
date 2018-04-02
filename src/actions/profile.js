import { actionNames } from "./actionNames";
import { profile } from "../api";

export const getProfileDetails = () => async () => {
  const data = await profile.getProfile();
  console.log(data);
};
