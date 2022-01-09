import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/UI/error-alert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

function EventDetail(props) {
  const { event } = props;

  if (!event)
    return (
      <ErrorAlert>
        <h1>Loading...</h1>
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
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => {
    return { params: { eventId: event.id } };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default EventDetail;
