import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { registerFormSchema } from "../../schema/registerFormSchema";
import type { RegisterFormType } from "../../types/registerFormType";
import { UserDataService } from "../../service/user-data.service";
import Button from "../../../../shared/components/Button/Button";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
    UserDataService.registerUser(data);
    console.log("registerUser", data);
  };

  return (
    <div className="form-container bg-purple-900 p-5 rounded-sm outline-solid border border-sky-500">
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        action="#"
        method="POST"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6">
          <div>
            <label className="text-start block text-sm/6 font-semifold text-white">
              Enter Username
            </label>
            <div className="mt-2.5">
              <input
                className="w-full p-2 border rounded-sm border-[#e5eef8] text-[#e5eef8]"
                {...register("username", {
                  maxLength: 20,
                  minLength: 5,
                  required: true,
                })}
                type="text"
                name="username"
                placeholder="Enter Username"
              />
              {errors.username && (
                <p className="text-red-300 text-start text-xs mt-1">
                  Invalid Username  (must be 4 to 20 charactor long)
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="text-start block text-sm/6 font-semifold text-white">
              Enter Email
            </label>
            <div className="mt-2.5">
              <input
                className="w-full p-2 border rounded-sm border-[#e5eef8] text-[#e5eef8]"
                {...register("email", {
                  maxLength: 20,
                  minLength: 5,
                  required: true,
                })}
                type="text"
                name="email"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-300 text-start text-xs mt-1">
                  Invalid Email
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="text-start block text-sm/6 font-semifold text-white">
              Enter Password
            </label>
            <div className="mt-2.5">
              <input
                className="w-full p-2 border rounded-sm border-[#e5eef8] text-[#e5eef8]"
                {...register("password", {
                  maxLength: 20,
                  minLength: 5,
                  required: true,
                })}
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-300 text-start text-xs mt-1">
                  Invalid Password (must be 5 to 20 charactor long)
                </p>
              )}
            </div>
          </div>
          <div>
            <Button type={"submit"} text={"Register"} color={"secondary"}></Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
