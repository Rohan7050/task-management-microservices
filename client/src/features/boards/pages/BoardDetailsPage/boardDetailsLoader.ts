import { BoardDataService } from "../../service/board-data.service";

export const boardDetailsPageLoader = async ({params}) => {
  try {
    const data = await BoardDataService.getBoardDetails(params.id);
    console.log("=====> ooo ", data);
    return data.data;
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
