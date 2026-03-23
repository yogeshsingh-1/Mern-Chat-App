import { CookieOptions } from "express";
const cookieOption: CookieOptions = {
  maxAge: 8 * 60 * 60 * 1000, //6h
  secure: false,
  sameSite: "lax",
  httpOnly: true,

};
export default cookieOption;
