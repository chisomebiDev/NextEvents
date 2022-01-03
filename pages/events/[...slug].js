import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import { getFilteredEvents } from "../../dummy-data";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/UI/error-alert";

function SpecificEventDetail() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <h1 className="center">Loading...</h1>;
  }

  const [year, month] = [+filterData[0], +filterData[1]];

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
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
  const filteredEvents = getFilteredEvents({ year, month });

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

  const date = new Date(year, month - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default SpecificEventDetail;
