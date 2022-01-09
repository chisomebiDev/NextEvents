import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";

function AllEventPage(props) {
  const { event } = props;
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

export async function getStaticProps() {
  const event = await getAllEvents();

  return {
    props: {
      event,
    },
    revalidate: 60,
  };
}

export default AllEventPage;
