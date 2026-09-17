import Cookies from "js-cookie";

export default function isLoggedIn(): boolean {
  const token = Cookies.get("token");
  return token != null;
}