export default class UserService {
  static getUser() {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  static setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  static clearUser() {
    localStorage.removeItem("user");
  }
}
