import Button from "../../../../shared/components/Button/Button";
import BoardForm from "../../components/BoardForm/BoardForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoardDataService } from "../../service/board-data.service";
import { useBoardStore } from "../store/board.store";

const BoardsPage = () => {
  const [showBoardForm, setShowBoardForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setBoard, board, clearBoard } = useBoardStore();

  const handleCreateNewBoard = () => {
    setShowBoardForm((state) => !state);
  };
  const navigateToDetailsPage = (id: string) => {
    navigate("/user/boards/" + id);
  };

  useEffect(() => {
    async function getAllBoard() {
      try {
        setLoading(true);
        setError(false);
        const data = await BoardDataService.getBoard();
        console.log("=====> ooo ", data);
        setBoard(data.data);
        return data;
      } catch (e) {
        clearBoard();
        setError(true);
        return e;
      } finally {
        setLoading(false);
      }
    }
    getAllBoard();
  }, []);

  if(loading) {
    return <div className="container flex justify-start flex-col items-start">
      <h2>Loading....</h2>
    </div>
  }

  if(error) {
    return <div className="container flex justify-start flex-col items-start">
      <h2>Something Went Wrong....</h2>
    </div>
  }


  return (
    <div className="container flex justify-start flex-col items-start">
      <div className="mx-auto flex justify-end mb-4 w-full">
        <Button
          action={handleCreateNewBoard}
          text={!showBoardForm ? "+ Create New Board" : "x Close Board Form"}
          color={"secondary"}
        ></Button>
      </div>
      {showBoardForm && (
        <div className="mx-auto flex justify-center mb-4 w-full">
          <BoardForm></BoardForm>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {board &&
          board.map(
            (boardData: { id: string; title: string; desc: string }) => (
              <div
                onClick={() => navigateToDetailsPage(boardData.id)}
                className="h-full w-full bg-purple-900 p-5 rounded-sm outline-solid "
              >
                <h5 className="text-white mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
                  {boardData.title}
                </h5>
                <p className="text-white text-body mb-6">{boardData.desc}</p>
              </div>
            ),
          )}
      </div>
    </div>
  );
};

export default BoardsPage;
