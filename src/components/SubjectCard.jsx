import { useNavigate } from "react-router-dom";

export default function SubjectCard({ subject, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${subject.name}?`)) {
      onDelete(subject.code);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
      <p className="text-gray-600 mb-1">Code: {subject.code}</p>
      <p className="text-gray-600 mb-1">Professor: {subject.prof}</p>
      <p className="text-gray-600 mb-3">Credits: {subject.credits}</p>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => navigate(`/edit/${subject.code}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white 
          px-4 py-1 rounded-md text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => navigate(`/view/${subject.code}`)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white 
          px-4 py-1 rounded-md text-sm font-medium"
        >
          View
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white 
          px-4 py-1 rounded-md text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
