import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import useSubmitStore from 'store/supply/useSubmitStore';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/common/Calendar.scss';

function Calendar() {
  const { setProvideDate } = useSubmitStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const onDateHandler = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = format(date, 'yyyy-MM-dd');
    setProvideDate(formattedDate);
  };

  return (
    <DatePicker
      className="date-picker"
      locale={ko}
      dateFormat="yyyy년 MM월 dd일"
      shouldCloseOnSelect
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      selected={selectedDate}
      onChange={onDateHandler}
      minDate={new Date()} // 오늘 이후부터 선택 가능
    />
  );
}

export default Calendar;
