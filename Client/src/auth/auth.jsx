import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const auth = {
  username: "",
  isAuthenticated: false,
  roles: "",
  authenticate(token) {
    Cookies.set("token", token, { expires: 7, sameSite: "strict" });
    this.isAuthenticated = true;
    const decodedToken = jwt_decode(token);
    this.username = decodedToken.username;
    this.roles = decodedToken.roles;
  },
  logout() {
    Cookies.remove("token");
    this.isAuthenticated = false;
    this.roles = "";
  },
  getToken() {
    return Cookies.get("token");
  },
  init() {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt_decode(token);
      this.roles = decodedToken.roles;
      this.isAuthenticated = true;
      this.username = decodedToken.username;
    }
  },
};

auth.init();

export default auth;
