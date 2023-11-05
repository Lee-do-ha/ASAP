import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { subWeeks, endOfWeek } from 'date-fns';

interface CalendarProps {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

function Calendar({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: CalendarProps) {
  const maxDate = endOfWeek(subWeeks(new Date(), 1));

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const sunday = new Date(date);
      sunday.setDate(date.getDate() - date.getDay());
      const saturday = new Date(sunday);
      saturday.setDate(sunday.getDate() + 6);
      setStartDate(sunday);
      setEndDate(saturday);
    }
  };

  return (
    <div className="calendar">
      <DatePicker
        className="check-date"
        locale={ko}
        selected={startDate}
        dateFormat="yyyy년 MM월 dd일"
        onChange={handleDateChange}
        maxDate={maxDate}
        startDate={startDate}
        endDate={endDate}
        showIcon
        placeholderText="원하는 기간을 선택하세요"
      />
    </div>
  );
}

export default Calendar;
