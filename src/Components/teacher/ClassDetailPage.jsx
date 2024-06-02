import PropTypes from "prop-types"; // Import PropTypes

function ClassDetailPage({ className }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Navigation Bar */}
      <nav className="w-full bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{className}</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Share Kelas
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto mt-4">
        {/* Online Members */}
        <div className="flex items-center justify-center mb-4">
          <p className="mr-2">Online Members:</p>
        </div>

        {/* Add Task Button */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Add Task
        </button>

        {/* Task Cards */}
        {/* List of task cards goes here */}
      </div>
    </div>
  );
}

ClassDetailPage.propTypes = {
  className: PropTypes.string.isRequired, // Add prop validation for className
};

export default ClassDetailPage;
