import { useNavigate } from "react-router-dom";
import SubjectCard from "./SubjectCard";

export default function SubjectList({ subjects, onDeleteSubject }) {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Subjects</h2>

      <button
        onClick={() => navigate("/add")}
        className="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
      >
        Add New Subject
      </button>

      {subjects.length === 0 ? (
        <p>No subjects added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.code}
              subject={subject}
              onDelete={onDeleteSubject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
