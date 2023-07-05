"use client";
import { FormEvent, useEffect, useState } from "react";
import { useLogin } from "../../../../hooks/login/useLogin";
import { Spinner } from "../../../../components/spinner/spinner";
import { useRouter } from "next/navigation";
import { useToken } from "../../../../hooks/token/useToken";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [, setToken] = useToken();

  const { push } = useRouter();

  const handleToggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { data, error, isMutating, trigger } = useLogin();

  useEffect(() => {
    if (!data) return;
    setToken(data.token);
    push("/swr/blog");
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!password || !email) return;

    try {
      await trigger({
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <form
        className="flex flex-col space-y-5"
        action="submit"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">email</label>
        <input
          className="text-slate-900"
          data-testid="input-email-login"
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <div className="flex space-x-5">
          <input
            className="text-slate-900"
            data-testid="input-password-login"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleToggleVisibility}
            data-testid="button-toggle-visibility"
            className="w-10"
            type="button"
          >
            {!showPassword ? "show" : "hide"}
          </button>
        </div>
        <button data-testid="button-form-login" type="submit">
          {isMutating ? <Spinner /> : "login"}
        </button>
        <p
          data-visibility={Boolean(error)}
          className="text-red-700 data-[visibility=true]:visible data-[visibility=false]:invisible"
          data-testid="p-error-login"
        >
          {error?.response?.data.msg || "error"}
        </p>
      </form>
    </div>
  );
};

export default Page;
