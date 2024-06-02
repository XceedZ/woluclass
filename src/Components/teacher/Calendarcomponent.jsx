import { useState } from "react";
import Navbar from "./NavbarUtama";
import moment from "moment";

const ComplexCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedDayOfMonth, setSelectedDayOfMonth] = useState(1);

  const next = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  const prev = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
    setShowOverlay(true); // Show overlay when a date is clicked
  };

  const toggleMarkedDate = () => {
    if (selectedDate) {
      const selectedDateFormatted = selectedDate.format("YYYY-MM-DD");
      if (markedDates.includes(selectedDateFormatted)) {
        setMarkedDates(markedDates.filter((date) => date !== selectedDateFormatted));
      } else {
        setMarkedDates([...markedDates, selectedDateFormatted]);
      }
      setSelectedDate(null);
    }
  };

  const handleAddNow = () => {
    setMarkedDates([...markedDates, selectedDate.clone().date(selectedDayOfMonth).format("YYYY-MM-DD")]);
    setShowOverlay(false); // Hide overlay after adding the mark
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-8 px-6">
        <button onClick={prev} className="text-2xl">
          &#8249;
        </button>
        <div>{currentDate.format("MMMM yyyy")}</div>
        <button onClick={next} className="text-2xl">
          &#8250;
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={index} className="text-center font-medium text-base text-gray-300 mb-3">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = currentDate.clone().startOf("month");
    const monthEnd = currentDate.clone().endOf("month");
    const startDate = monthStart.clone().startOf("week");
    const endDate = monthEnd.clone().endOf("week");

    const rows = [];
    let days = [];
    let day = startDate.clone();

    while (day.isSameOrBefore(endDate)) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = day.format("D");
        const isCurrentMonth = day.isSame(monthStart, "month");
        const isDaySelected = selectedDate && day.isSame(selectedDate, "day");
        const isMarked = markedDates.includes(day.format("YYYY-MM-DD"));
        const isToday = day.isSame(moment(), "day");

        days.push(
          <div
            key={day}
            className={`relative text-center p-2 cursor-pointer 
            ${!isCurrentMonth ? "text-gray-300 rounded-lg" : ""} 
            ${isDaySelected ? "bg-indigo-600 text-white rounded-lg" : ""}
            ${isMarked ? "bg-indigo-600 bg-opacity-30 hover:bg-opacity-30" : ""}
            ${isDaySelected && !isMarked ? "bg-indigo-600" : ""}
            ${isToday ? "bg-indigo-600 text-white" : ""}
            ${isDaySelected && (isToday || isMarked) ? "rounded-lg" : ""}
            `}
            onClick={() => onDateClick(day.clone())}>
            {formattedDate}
            {isMarked && !isDaySelected && <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></div>}
            {isDaySelected && <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 w-3 h-3 rounded-full"></div>}
          </div>
        );
        day.add(1, "day");
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }

    return rows;
  };

  return (
    <div className="font-Jakarta">
      <Navbar />
      <div id="Komponen" className="lg:flex lg:mx-auto lg:justify-center lg:items-center lg:container lg:align-middle lg:ml-40 mt-10 2xl:ml-96 2xl:mt-40">
        <div className="lg:-mr-32 lg:-mt-20">
          <h1 className="text-xl font-semibold ml-7 mt-10 mb-5">
            Exam Schedule - <span className="text-indigo-600">Semester Final</span>
          </h1>
          <div className="px-7">
            <select className="mt-5 mb-5 w-full p-2 border-solid border-2 border-neutral-300 text-neutral-500" onChange={(e) => console.log(e.target.value)}>
              <option value="option1">All Class</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
        <div className="mx-auto max-w-xl p-7 lg:p-2">
          <div className="bg-white shadow-lg shadow-neutral-200 p-4 lg:p-20">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </div>
          {showOverlay && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg">
                <label htmlFor="dayOfMonth">Select Day of Month:</label>
                <select id="dayOfMonth" className="mb-4" value={selectedDayOfMonth} onChange={(e) => setSelectedDayOfMonth(parseInt(e.target.value))}>
                  {[...Array(31)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end">
                  <button onClick={() => setShowOverlay(false)} className="mr-2 bg-gray-400 text-white px-4 py-2 rounded-lg">
                    Cancel
                  </button>
                  <button onClick={handleAddNow} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                    Add Now
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-start mt-10">
            <button onClick={toggleMarkedDate} className="px-3 py-1 text-neutral 400 font-medium rounded">
              Add Caption
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexCalendar;
