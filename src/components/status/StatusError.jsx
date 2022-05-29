import "../../styles/status.sass";

export default function StatusError({ small }) {
  return (
    <main className={small ? "status-loader-small" : "status-content"}>
      <h3>Welcome to our app</h3>
      <h3>Sorry</h3>
      <div className="status-loader"></div>
    </main>
  );
}
