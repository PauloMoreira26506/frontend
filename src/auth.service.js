import axios from "axios";

class AuthService {
  login(email, password) {
    return axios
      .post("https://backend-owlr.onrender.com/utilizadores/login", { email, password })
      .then(
        (res) => {
          if (res.data.token) {
            localStorage.setItem("utilizador", JSON.stringify(res.data));
          }
          return res.data;
        },
        (reason) => {
          throw new Error("Utilizador inválido");
        }
      );
  }
  logout() {
    localStorage.removeItem("utilizador");
  }
  getCurrentUtilizador() {
    return JSON.parse(localStorage.getItem("utilizador"));
  }
}
export default new AuthService();
