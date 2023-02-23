import jwt_decode from "jwt-decode";

const auth = {
  isAuthenticated: false,
  role: "",
  authenticate(token) {
    sessionStorage.setItem("token", token);
    this.isAuthenticated = true;
    const decodedToken = jwt_decode(token);
    this.role = decodedToken.role;
  },
  logout() {
    sessionStorage.removeItem("token");
    this.isAuthenticated = false;
    this.role = "";
  },
  getToken() {
    return sessionStorage.getItem("token");
  },
  getRole() {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt_decode(token);
      return decodedToken.role;
    }
    return "";
  },
};

export default auth;
