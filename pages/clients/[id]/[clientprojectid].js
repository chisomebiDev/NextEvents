import { useRouter } from "next/router";

function SelectedClientPage() {
  const router = useRouter();

  console.log(router.query);
  return (
    <div>
      <h1>The Project for a Specific Project of a Client Page</h1>
    </div>
  );
}

export default SelectedClientPage;
