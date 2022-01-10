import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import Head from "next/head";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/UI/error-alert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import Comments from "../../components/input/comments";

function EventDetail(props) {
  const { event } = props;
  const head = (
    <Head>
      <title>{event.title}</title>
    </Head>
  );

  if (!event)
    return (
      <ErrorAlert>
        {head}
        <h1>Loading...</h1>
      </ErrorAlert>
    );

  return (
    <>
      {head}
      <EventSummary {...event} />
      <EventLogistics
        {...event}
        address={event.location}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
      <Comments eventId={event.id} />
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
