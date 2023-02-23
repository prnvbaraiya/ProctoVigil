import jwt_decode from "jwt-decode";

const auth = {
  isAuthenticated: false,
  roles: "",
  authenticate(token) {
    localStorage.setItem("token", token);
    this.isAuthenticated = true;
    const decodedToken = jwt_decode(token);
    this.roles = decodedToken.roles;
  },
  logout() {
    localStorage.removeItem("token");
    this.isAuthenticated = false;
    this.roles = "";
  },
  getToken() {
    return localStorage.getItem("token");
  },
  getRoles() {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt_decode(token);
      return decodedToken.roles;
    }
    return "";
  },
};

export default auth;
