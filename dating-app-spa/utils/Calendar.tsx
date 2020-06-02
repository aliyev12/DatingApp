import React from "react";
import ReactCalendar from "react-calendar";

interface Props {}

const Calendar = (props: Props) => {
  const [date, setDate] = React.useState<Date | Date[]>(new Date());

  return (
    <div>
      <ReactCalendar onChange={(d) => setDate(d)} value={date} />
    </div>
  );
};

export default Calendar;
