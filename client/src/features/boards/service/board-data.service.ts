import { API_URL } from "../../../shared/constants/url.contants";
import { getData } from "../../../shared/services/api.service";

export class BoardDataService {
  public static async getBoard() {
    const res = await getData(API_URL.board);
    return res;
  }

  public static async getBoardDetails(id: string) {
    const res = await getData(API_URL.boardDetails + id);
    return res;
  }
}
