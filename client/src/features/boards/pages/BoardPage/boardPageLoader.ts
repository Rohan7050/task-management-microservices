import { BoardDataService } from "../../service/board-data.service";

export const boardPageLoader = async () => {
  try {
    const data = await BoardDataService.getBoard();
    console.log("=====> ooo ", data);
    return data;
  } catch(err: any) {
    if (err.status === 401) {
      throw new Response("Access Denied", { status: 401 });
    } else if (err.status === 400) {
      throw new Response("Board Not Found", { status: 400 });
    } else {
      throw new Response("Failed to load board", { status: 500 });
    }
  }
};
