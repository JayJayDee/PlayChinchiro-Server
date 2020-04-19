import { wrapAsync } from "./wrap-async";

export const authorize = () =>
  wrapAsync(async (req, res, next) => {
    // TODO: authorize action to be implemented
    next();
  });
