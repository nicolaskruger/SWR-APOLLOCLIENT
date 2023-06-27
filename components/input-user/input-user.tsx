const InputUser = () => {
  const handleSubmit = () => {
    throw new Error("not implemented");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input data-testid="input-input-user" type="text" name="name" id="name" />
      <button data-testid="button-input-user">send</button>
    </form>
  );
};

export { InputUser };
