import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/UI/error-alert";
import { getEventById, getAllEvents } from "../../helpers/api-util";

function EventDetail(props) {
  const { event } = props;

  if (!event)
    return (
      <ErrorAlert>
        <h1>No event found</h1>
      </ErrorAlert>
    );

  return (
    <>
      <EventSummary {...event} />
      <EventLogistics
        {...event}
        address={event.location}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </>
  );
}

export async function getStaticProps(ctx) {
  const { eventId } = ctx.params;
  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => {
    return { params: { eventId: event.id } };
  });

  return {
    paths,
    fallback: false,
  };
}

export default EventDetail;
