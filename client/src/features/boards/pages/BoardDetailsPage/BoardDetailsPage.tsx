import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

const BoardDetailsPage = () => {
  const boardDetailsData = useLoaderData();

  console.log("boardDetailsData ====> ", boardDetailsData)
  const { id } = useParams();
  useEffect(() => {
    
  }, [id])
  return (
    <div className="container flex justify-start flex-col items-start">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">

      </div>
    </div>
  );
};

export default BoardDetailsPage;
