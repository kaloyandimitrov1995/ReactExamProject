export default function Login() {

  return (
    <section>
      <h2>Login</h2>

      <form className="form">
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
          Password
          <input
            type="password"
            name="password"
            value="TEXT"
            required
          />
        </label>

        <button>
          Login
        </button>
      </form>
    </section>
  );
}
