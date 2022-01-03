import Link from "next/link";

function AllEventPage() {
  return (
    <div>
      <h1>All Events Page</h1>
      <ul>
        <li>
          <Link href="/events/detail">Events</Link>
        </li>
      </ul>
    </div>
  );
}

export default AllEventPage;
