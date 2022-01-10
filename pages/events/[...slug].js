import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/UI/error-alert";

function SpecificEventDetail(props) {
  const router = useRouter();
  const filterData = router.query.slug;

  const [events, setEvents] = useState();

  async function fetcher(...args) {
    const response = await fetch(...args);
    const data = response.json();
    return data;
  }

  const { data, error } = useSWR(
    "https://nextjs-6ffff-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = Object.keys(data).flatMap((key) => data[key]);
      setEvents(events);
    }
  }, [data]);

  if (!events) {
    return (
      <>
        <h1 className="center">Loading...</h1>
      </>
    );
  }

  const [year, month] = [+filterData[0], +filterData[1]];

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  const date = new Date(year, month - 1);
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const head = (
    <Head>
      <title>Events in {humanReadableDate}</title>
      <meta
        name="description"
        content={`Find events for ${humanReadableDate}`}
      />
    </Head>
  );

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12 || error) {
    return (
      <>
        {head}
        <ErrorAlert>
          <h1 className="center">Invalid Filter please adjust your values</h1>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {head}
        <ErrorAlert>
          <h1>No Events Found For Chosen Filter</h1>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      {head}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default SpecificEventDetail;
