import { API_URL } from "../../../shared/constants/url.contants";
import { postData } from "../../../shared/services/api.service";
import type { LoginFormType } from "../types/loginFormType";
import type { RegisterFormType } from "../types/registerFormType";

export class UserDataService {
  public static async loginUser(body: LoginFormType) {
    const res = await postData(API_URL.login, body);
    return res;
  }

  public static async registerUser(body: RegisterFormType) {
    const res = await postData(API_URL.register, body);
    return res;
  }
}
