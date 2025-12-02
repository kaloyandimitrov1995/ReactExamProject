export default function Register() {
  return (
    <section>
      <h2>Register</h2>

      <form>
        <label>
          Email
          <input
            type="email"
            name="email"
            value="TEXT"
            required
          />
        </label>

        <label>
          Username
          <input
            type="text"
            name="username"
            value="TEXT"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value="TEXT"
            required
          />
        </label>

        <label>
          Repeat Password
          <input
            type="password"
            name="repeatPassword"
            value="TEXT"
            required
          />
        </label>

        <button>
          Register
        </button>
      </form>
    </section>
  );
}
