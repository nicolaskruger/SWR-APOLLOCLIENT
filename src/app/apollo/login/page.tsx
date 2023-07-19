const Page = () => {
  return (
    <div>
      <form action="submit">
        <label htmlFor="email">email:</label>
        <input
          id="email"
          name="email"
          type="text"
          data-testid="input-email-login"
        />
        <label htmlFor="password">password:</label>
        <input
          id="password"
          name="password"
          type="text"
          data-testid="input-password-login"
        />
        <button data-testid="button-login">login</button>
      </form>
    </div>
  );
};

export default Page;
