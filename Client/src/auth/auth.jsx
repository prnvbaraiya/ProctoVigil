import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const auth = {
  id: "",
  username: "",
  isAuthenticated: false,
  roles: "",

  authenticate(token) {
    Cookies.set("token", token, { expires: 7, sameSite: "strict" });
    this.isAuthenticated = true;
    const decodedToken = jwt_decode(token);
    this.username = decodedToken.username;
    this.roles = decodedToken.roles;
    this.id = decodedToken.id;
  },
  logout() {
    Cookies.remove("token");
    this.isAuthenticated = false;
    this.roles = "";
    this.id = "";
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
      this.id = decodedToken.id;
    }
  },
};

auth.init();

export default auth;
