import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data";

function AllEventPage() {
  const event = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push({ pathname: fullPath });
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={event} />
    </>
  );
}

export default AllEventPage;
