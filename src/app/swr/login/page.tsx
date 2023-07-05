import { useLogin } from "../../../../hooks/login/useLogin";

const Page = () => {
  const { data, error, isMutating, reset, trigger } = useLogin();
  return (
    <div>
      <form action="submit">
        <label htmlFor="email">email</label>
        <input
          data-testid="input-email-login"
          type="text"
          id="email"
          name="email"
        />
        <label htmlFor="password">password</label>
        <div>
          <input
            data-testid="input-password-login"
            type="password"
            id="password"
            name="password"
          />
          <button data-testid="button-toggle-visibility" type="button">
            show
          </button>
        </div>
        <button data-testid="button-form-login" type="submit">
          login
        </button>
        <p data-testid="p-error-login">error msgs</p>
      </form>
    </div>
  );
};

export default Page;
