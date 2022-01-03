import { useRouter } from "next/router";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/UI/error-alert";
import { getEventById } from "../../dummy-data";

function EventDetail() {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

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

export default EventDetail;
