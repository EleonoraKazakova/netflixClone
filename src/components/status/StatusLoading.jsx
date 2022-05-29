import "../../styles/status.sass";

export default function StatusLoading({ small }) {
  return (
    <main className={small ? "status-loader-small" : "status-content"}>
      <h3>Loading</h3>
      <div className="status-loader"></div>
    </main>
  );
}
