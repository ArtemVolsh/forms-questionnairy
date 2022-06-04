import $api from "../ApiRequests";

export default class UserService {
  static fetchUsers() {
    return $api.get("/users");
  }
}
