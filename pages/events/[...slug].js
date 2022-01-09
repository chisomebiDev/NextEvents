import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/UI/error-alert";
// import { getFilteredEvents } from "../../helpers/api-util";

function SpecificEventDetail(props) {
  // const { hasError, filteredEvents, date: dateYear } = props;
  // const { year, month } = dateYear;

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
    return <h1 className="center">Loading...</h1>;
  }

  const [year, month] = [+filterData[0], +filterData[1]];

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12 || error) {
    return (
      <>
        <ErrorAlert>
          <h1 className="center">Invalid Filter please adjust your values</h1>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
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
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

// export async function getServerSideProps(ctx) {
//   const { params } = ctx;

//   const filterData = params.slug;

//   const [year, month] = [+filterData[0], +filterData[1]];

//   if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
//     return { props: { hasError: true }, notFound: true };
//   }
//   const filteredEvents = await getFilteredEvents({ year, month });
//   return {
//     props: { filteredEvents, date: { year, month } },
//   };
// }

export default SpecificEventDetail;
