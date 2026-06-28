import { API_URL } from "../../../shared/constants/url.contants";
import { getData, postData } from "../../../shared/services/api.service";
import type { BoardFormType } from "../types/boardFormType";

export class BoardDataService {
  public static async getBoard() {
    const res = await getData(API_URL.board);
    return res;
  }

  public static async getBoardDetails(id: string) {
    const res = await getData(API_URL.boardDetails + id);
    return res;
  }

  public static async createNewBoard(data: BoardFormType) {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await postData(API_URL.createBoard, data);
      return res;
    }catch(e) {
      throw e
    }
  }
}
