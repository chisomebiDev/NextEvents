import Link from "next/link";

const clients = [
  { id: "chisom", name: "Chisomebi" },
  { id: "chikeluba", name: "Chikeluba" },
  { id: "onw", name: "Onwunyi" },
];

function ClientsPage() {
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map((client) => {
          return (
            <li key={client.id}>
              <Link
                href={{ pathname: "/clients/[id]", query: { id: client.id } }}
              >
                {client.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ClientsPage;
