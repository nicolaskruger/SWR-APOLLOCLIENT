import axios from "axios";
import { useState } from "react";

type User = {
  name: string;
  email: string;
};

const InputUser = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    console.log({ name });
    if (!name) return;

    const newUser: User = {
      name,
      email: `${name}@email.com`,
    };

    try {
      axios.post("/api/user", newUser);
    } catch {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        data-testid="input-input-user"
        type="text"
        name="name"
        id="name"
      />
      <button data-testid="button-input-user">send</button>
      <p>name: {name}</p>
      <p>email: {name}@email.com</p>
      <p data-show={error} data-testid="p-error-message">
        fail to post
      </p>
    </form>
  );
};

export { InputUser };
