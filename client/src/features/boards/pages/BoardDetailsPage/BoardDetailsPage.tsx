import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoaderData, useNavigate } from "react-router-dom";
import Button from "../../../../shared/components/Button/Button";
import TaskForm from "../../components/TaskForm/TaskForm";

const BoardDetailsPage = () => {
  const boardDetailsData = useLoaderData();
  const navigate = useNavigate();
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

  console.log("boardDetailsData ====> ", boardDetailsData)
  const { id } = useParams();
  useEffect(() => {
    
  }, [id])

  const navigateToBoard = () => {
    navigate('/user/boards')
  }

  const handleCreateNewTask = () => {
    setShowTaskForm((state) => !state);
  }
  
  return (
    <div className="container flex justify-start flex-col items-start">
      <div className="mx-auto flex justify-start mb-4 w-full">
        <p onClick={() => navigateToBoard()} className="text-md text-white">{"< Back"}</p>
      </div>
      <div className="mx-auto flex justify-end mb-4 w-full">
        <Button
          action={handleCreateNewTask}
          text={!showTaskForm ? "+ Create New Task" : "x Close Task Form"}
          color={"secondary"}
        ></Button>
      </div>
      {showTaskForm && (
        <div className="mx-auto flex justify-center mb-4 w-full">
          <TaskForm></TaskForm>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">

      </div>
    </div>
  );
};

export default BoardDetailsPage;
