import { useRouter } from "next/router";

function ClientProjectPage() {
  const router = useRouter();

  function loadProjectHandler() {
    router.push("/portfolio");
  }

  return (
    <div>
      <h1>The Projects of a Given Page</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectPage;
