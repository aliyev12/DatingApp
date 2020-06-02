import React from "react";
import DayPicker from "react-day-picker";
import { Modal, Form } from "react-bootstrap";

const LEGAL_AGE = 18;
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();
const fromMonth = new Date(currentYear - 120, 0);
const toMonth = new Date(currentYear - LEGAL_AGE, currentMonth, currentDay);

interface Props {
  handleDayClick: (day: Date) => void;
  show: boolean;
  onHide: () => void;
}

export const DatePicker = ({ handleDayClick, show = false, onHide }: Props) => {
  const [month, setMonth] = React.useState(toMonth);

  return (
    <Modal
      size="sm"
      aria-label="Date Picker"
      show={show}
      onHide={onHide}
      centered
    >
      <DayPicker
        onDayClick={handleDayClick}
        // month={toMonth}
        month={month}
        fromMonth={fromMonth}
        toMonth={toMonth}
        disabledDays={[
          {
            after: toMonth,
          },
        ]}
        captionElement={({ date, localeUtils }) => (
          <YearMonthForm
            date={date}
            localeUtils={localeUtils}
            onChange={(_month) => setMonth(_month)}
          />
        )}
      />
    </Modal>
  );
};

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select
        name="month"
        onChange={handleChange}
        value={date.getMonth()}
        className="select-css"
      >
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select
        name="year"
        onChange={handleChange}
        value={date.getFullYear()}
        className="select-css"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}
