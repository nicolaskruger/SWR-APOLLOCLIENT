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

    await trigger({
      email,
      password,
    });
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          data-testid="input-email-login"
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <div>
          <input
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
            type="button"
          >
            {!showPassword ? "show" : "hide"}
          </button>
        </div>
        <button data-testid="button-form-login" type="submit">
          {isMutating ? <Spinner /> : "login"}
        </button>
        <p data-visibility={Boolean(error)} data-testid="p-error-login">
          {error?.msg}
        </p>
      </form>
    </div>
  );
};

export default Page;
