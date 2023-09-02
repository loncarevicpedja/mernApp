export default function User({ _id, name, username }) {
  return (
    <div className="exhibition">
      <h4 className="">{name}</h4>
      <p>{username}</p>
      <a className="link" href={`/profile/${_id}`}>
        <p className="link">Vidi sve o korisniku</p>
      </a>
    </div>
  );
}
