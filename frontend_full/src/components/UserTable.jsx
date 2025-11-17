import { useEffect, useState } from "react";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`https://reqres.in/api/users?page=${page}`);
    const data = await res.json();
    setUsers(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const filtered = users
    .filter((u) =>
      (u.first_name + " " + u.last_name + u.email)
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((u) => (filter ? u.email.endsWith(filter) : true))
    .sort((a, b) => {
      if (!sortKey) return 0;
      return a[sortKey].localeCompare(b[sortKey]);
    });

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Directory</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2 mb-3"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">Filter by domain</option>
        <option value="@reqres.in">@reqres.in</option>
      </select>

      <select
        className="border p-2 ml-3"
        onChange={(e) => setSortKey(e.target.value)}
      >
        <option value="">Sort</option>
        <option value="first_name">First Name</option>
        <option value="email">Email</option>
      </select>

      {loading ? (
        <p className="text-center p-5">Loading...</p>
      ) : (
        <table className="w-full border mt-3">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td className="border p-2">{u.id}</td>
                <td className="border p-2">
                  {u.first_name} {u.last_name}
                </td>
                <td className="border p-2">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
