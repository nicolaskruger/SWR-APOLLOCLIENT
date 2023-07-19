import { useRouter } from "next/navigation";
import { useLoginGql } from "../../hooks/login-gql/useLoginGql";
import { FormEvent, useState } from "react";
import { Spinner } from "../spinner/spinner";

const LoginGql = () => {
  const { loading, error, login } = useLoginGql();

  const { push } = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await login(email, password);
    push("/apollo/blog");
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor="email">email:</label>
        <input
          className="text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          type="text"
          data-testid="input-email-login"
        />
        <label htmlFor="password">password:</label>
        <input
          className="text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          type="text"
          data-testid="input-password-login"
        />
        <button data-testid="button-login">login</button>
        {loading && <Spinner />}
        {error && (
          <p data-testid="p-error-login">email or password incorrect</p>
        )}
      </form>
    </div>
  );
};

export { LoginGql };
