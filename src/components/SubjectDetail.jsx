import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SubjectDetail({ subjects, schedules, addSchedule, deleteSchedule, assignments, setAssignments }) {
  const { code } = useParams();
  const navigate = useNavigate();

  const subject = subjects.find((s) => s.code === code);
  const subjectSchedules = schedules.filter((s) => s.subjectCode === code);

  const [newDay, setNewDay] = useState("");
  const [newTime, setNewTime] = useState("");

  const [newAssignment, setNewAssignment] = useState({ name: "", dueDate: "" });

  const handleAddSchedule = () => {
    if (newDay && newTime) {
        addSchedule(code, newDay, newTime);
        setNewDay("");
        setNewTime("");
    }
  };
  
  const handleDeleteSchedule = (day, time) => {
    deleteSchedule(code, day, time);
  };

  const handleAddAssignment = () => {
    if (!newAssignment.name || !newAssignment.dueDate) return;
    const updated = {
        ...assignments,
        [subject.code]: [
        ...(assignments[subject.code] || []),
        newAssignment
        ],
    };
    setAssignments(updated);
    setNewAssignment({ name: "", dueDate: "" });
  };

  const handleDeleteAssignment = (index) => {
    const filtered = assignments[subject.code].filter((_, i) => i !== index);
    setAssignments({ ...assignments, [subject.code]: filtered });
  };

  if (!subject) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center
       text-red-600 font-semibold text-lg">
        Subject not found.
        <div className="mt-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white 
          px-6 py-2 rounded-md font-semibold transition"
        >
          Back
        </button>
      </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">{subject.name}</h2>

      <div className="space-y-2 text-gray-800">
        <p>
          <span className="font-semibold">Code:</span> {subject.code}
        </p>
        <p>
          <span className="font-semibold">Professor:</span> {subject.prof}
        </p>
        <p>
          <span className="font-semibold">Credits:</span> {subject.credits}
        </p>
        <p>
          <span className="font-semibold">Description:</span>
          <br />
          <span className="text-gray-700 italic">{subject.description}</span>
        </p>
      </div>

    <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-4">Schedule</h2>

    {schedules.length > 0 ? (
        <ul className="mb-6 space-y-2">
  {subjectSchedules.map((item, index) => (
    <li
      key={index}
      className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg border"
    >
      <span className="text-gray-800">
        <span className="font-semibold">{item.day}</span>: {item.time}
      </span>
      <button
        onClick={() => handleDeleteSchedule(item.day, item.time)}
        className="text-red-600 hover:text-red-800 font-medium"
        >
        Delete
      </button>

    </li>
  ))}
</ul>

    ) : (
        <p className="text-gray-500 mb-6">No schedule added yet.</p>
    )}

    <div className="flex items-center gap-4 flex-wrap">
        {/* Day Dropdown */}
        <label className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Day:</span>
        <select
            value={newDay}
            onChange={(e) => setNewDay(e.target.value)}
            className="p-2 border rounded-md"
        >
            <option value="">--Select--</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
        </select>
        </label>

        <label className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Time:</span>
        <select
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="p-2 border rounded-md"
        >
            <option value="">--Select--</option>
            <option>08:00 - 09:00</option>
            <option>09:00 - 10:00</option>
            <option>10:00 - 11:00</option>
            <option>11:00 - 12:00</option>
            <option>14:00 - 15:00</option>
            <option>15:00 - 16:00</option>
            <option>16:00 - 17:00</option>
        </select>
        </label>

        <button
        onClick={handleAddSchedule}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
        Add
        </button>
    </div>

  <h2 className="text-xl font-semibold text-blue-600 mb-4">Assignments</h2>

  <div className="flex flex-col md:flex-row gap-3 mb-4">
  <input
    type="text"
    placeholder="Assignment Name"
    value={newAssignment.name}
    onChange={(e) =>
      setNewAssignment({ ...newAssignment, name: e.target.value })
    }
    className="border text-base px-3 py-1.5 rounded w-full md:w-1/3"
  />
  <input
    type="date"
    value={newAssignment.dueDate}
    onChange={(e) =>
      setNewAssignment({ ...newAssignment, dueDate: e.target.value })
    }
    className="border text-base px-3 py-1.5 rounded w-full md:w-1/3"
  />
  <button
    onClick={handleAddAssignment}
    className="bg-green-600 hover:bg-green-700 text-white text-base px-4 py-1.5 rounded"
  >
    Add
  </button>
</div>

  {assignments[subject.code]?.length > 0 ? (
    <ol className="list-decimal ml-6 space-y-2 text-sm">
      {assignments[subject.code].map((assignment, index) => (
        <li key={index}>
          <div className="flex justify-between items-center">
            <span>
              <strong>{assignment.name}</strong> — due{" "}
              <span className="text-gray-700">{new Date(assignment.dueDate).toLocaleDateString("en-GB")}</span>
            </span>
            <button
              onClick={() => handleDeleteAssignment(index)}
              className="text-red-600 hover:underline text-xs ml-4"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ol>
  ) : (
    <p className="text-gray-500 text-sm">No assignments added yet.</p>
  )}


      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white 
          px-6 py-2 rounded-md font-semibold transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
