import { useState } from "react";
import Navbar from "./NavbarStudent";
import moment from "moment";
import { format, addDays } from "date-fns";

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

  const [startDate, setStartDate] = useState(new Date());

  const generateCalendarDays = (startDate, numDays) => {
    const days = [];
    for (let i = 0; i < numDays; i++) {
      const currentDate = addDays(startDate, i);
      days.push(currentDate);
    }
    return days;
  };

  const handleScroll = (scrollOffset) => {
    const newStartDate = addDays(startDate, Math.sign(scrollOffset));
    setStartDate(newStartDate);
  };

  const days = generateCalendarDays(startDate, 30); // Menghasilkan 30 hari kalender

  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
        const todayClassName = isToday ? "bg-indigo-600 text-white" : ""; // Menentukan kelas CSS untuk hari ini

        days.push(
          <div
            key={day}
            className={`relative text-center p-2 cursor-pointer 
            ${!isCurrentMonth ? "text-gray-300 rounded-lg" : ""} 
            ${isDaySelected ? "bg-indigo-600 text-white rounded-lg" : ""}
            ${isMarked ? "bg-indigo-600 bg-opacity-30 hover:bg-opacity-30" : ""}
            ${isDaySelected && !isMarked ? "bg-indigo-600" : ""}
            ${isDaySelected && (isToday || isMarked) ? "rounded-lg" : ""}
            ${todayClassName}`} // Menambahkan kelas CSS untuk hari ini
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
      <div className="2xl:ml-8 2xl:-mt-10">
        <div id="Komponen" className="lg:flex lg:mx-auto lg:justify-center lg:items-center lg:container lg:align-middle lg:ml-20 mt-1 2xl:ml-64 2xl:mt-40 lg:mt-0">
          <div className="lg:-mr-32 lg:mt-10 lg:flex">
            <h1 className="text-xl font-semibold ml-7 mt-10 mb-5 lg:text-2xl">
              Exam Schedule - <span className="text-indigo-600">Semester Final</span>
            </h1>
            <div className="px-7 mt-3">
              <select className="mt-5 mb-5 w-full p-2 border-solid border-[1px] border-black text-black rounded-md lg:w-[19rem] 2xl:w-[28rem]" onChange={(e) => console.log(e.target.value)}>
                <option value="option1">All Class</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
          <div className="hidden lg:block lg:ml-[33rem] lg:mt-40 absolute bg-white shadow-neutral-300 shadow-md rounded-lg p-4 2xl:ml-[39.5rem]">
            <h1 className="text-lg font-semibold">Lihat Tugas Terkini</h1>
            <p className="text-sm w-56 mt-2 mb-2">Beberapa Tugas belum Anda selesaikan</p>
            <button className="bg-indigo-600 text-white px-24 py-2 rounded-md flex justify-center items-center">Lihat</button>
          </div>
          <div className="mx-auto max-w-xl p-7 lg:max-w-none lg:ml-32 2xl:ml-40">
            <div className="bg-white shadow-lg shadow-neutral-200 p-4 lg:float-right lg:mt-48 lg:absolute">
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
          </div>
        </div>
        <div className="hidden lg:block 2xl:block lg:px-[30rem] lg:-mt-10 lg:-ml-96 2xl:px-[45rem] 2xl:-ml-[28rem]">
          <div id="Calendar-panjang" className="hidden lg:block 2xl:block p-5 mt-20 border-2 border-solid border-neutral-200">
            <div className="flex flex-col h-full">
              <div className="flex overflow-x-auto" onWheel={(e) => handleScroll(e.deltaY)}>
                {days.map((day, index) => (
                  <div key={index} className="w-24 h-[23.5rem] flex-shrink-0 border-x border-gray-200 flex flex-col items-center">
                    <div className="mt-2 text-xs">{weekdayNames[day.getDay()]}</div>
                    <div className="mt-2 px-3 py-2 rounded-full text-lg" style={{ backgroundColor: moment().isSame(day, "day") ? "#4560ED" : "transparent", color: moment().isSame(day, "day") ? "#ffffff" : "#000000" }}>
                      {format(day, "dd")}
                    </div>
                    {/* Di sini Anda bisa menambahkan konten tambahan untuk setiap kotak tanggal */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexCalendar;
