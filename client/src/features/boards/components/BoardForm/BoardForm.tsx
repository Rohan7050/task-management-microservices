import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { BoardFormType } from "../../types/boardFormType";
import { boardFormSchema } from "../../schema/boardFormSchema";
import Button from "../../../../shared/components/Button/Button";

const BoardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardFormType>({
    resolver: zodResolver(boardFormSchema),
  });

  const onSubmit: SubmitHandler<BoardFormType> = async (data) => {
    console.log(data);
    console.log("data", data);
  };

  return (
    <div className="form-container h-full bg-purple-900 p-5 rounded-sm outline-solid border border-sky-500">
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        action="#"
        method="POST"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6">
          <div>
            <label className="text-start block text-sm/6 font-semifold text-white">
              Enter Title
            </label>
            <div className="mt-2.5">
              <input
                className="w-full p-2 border rounded-sm border-[#e5eef8] text-[#e5eef8]"
                {...register("title", {
                  maxLength: 20,
                  minLength: 5,
                  required: true,
                })}
                type="text"
                name="title"
                placeholder="Enter Title"
              />
              {errors.title && (
                <p className="text-red-300 text-start text-xs mt-1">
                  Invalid Title (must be 4 to 20 charactor long)
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="text-start block text-sm/6 font-semifold text-white">
              Enter Description
            </label>
            <div className="mt-2.5">
              <input
                className="w-full p-2 border rounded-sm border-[#e5eef8] text-[#e5eef8]"
                {...register("desc", {
                  maxLength: 20,
                  minLength: 5,
                  required: true,
                })}
                type="text"
                name="desc"
                placeholder="Enter Description"
              />
              {errors.desc && (
                <p className="text-red-300 text-start text-xs mt-1">
                  Invalid Description
                </p>
              )}
            </div>
          </div>
          <div>
            <Button type={"submit"} text={"Create Board"} color={"secondary"}></Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BoardForm;
