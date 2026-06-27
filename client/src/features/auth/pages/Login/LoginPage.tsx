import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginFormType } from "../../types/loginFormType";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../../schema/loginFormSchema";
import Button from "../../../../shared/components/Button/Button";
import { UserDataService } from "../../service/user-data.service";
import { useAuthStore } from "../../../../shared/store/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  console.log(errors);

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const res = await UserDataService.loginUser(data);
      if (res.data) {
        authStore.setAuth(res.data, true);
        navigate("/user/boards");
      } else {
        UserDataService.logoutUser({});
        authStore.logout();
      }
      setError('');
    } catch (error) {
      setError(error?.message ?? '');
    }
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
          {error && (
            <p className="text-red-300 text-start text-xs mt-1">
              {error}
            </p>
          )}
          <div>
            <Button type={"submit"} text={"Login"} color={"secondary"}></Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
