import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SubjectForm({ subjects, onSubmit }) {
  const { code } = useParams();
  const navigate = useNavigate();

  const existingSubject = subjects.find((s) => s.code === code);

  const [name, setName] = useState(existingSubject?.name || "");
  const [subjectCode, setSubjectCode] = useState(existingSubject?.code || "");
  const [prof, setProf] = useState(existingSubject?.prof || "");
  const [credits, setCredits] = useState(existingSubject?.credits || "");
  const [description, setDescription] = useState(existingSubject?.description || "");

  useEffect(() => {
    if (code && existingSubject) {
      setName(existingSubject.name);
      setSubjectCode(existingSubject.code);
      setProf(existingSubject.prof);
      setCredits(existingSubject.credits);
      setDescription(existingSubject.description);
    }
  }, [code, existingSubject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubject = { name, code: subjectCode, prof, credits, description };
    onSubmit(newSubject);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-5 mt-6"
    >
      <h2 className="text-2xl font-semibold text-center">
        {code ? "Edit Subject" : "Add New Subject"}
      </h2>

      <div>
        <label className="block font-medium mb-1">Subject Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Subject Code:</label>
        <input
          type="text"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          required
          disabled={!!code}
          className="w-full p-2 border rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Professor:</label>
        <input
          type="text"
          value={prof}
          onChange={(e) => setProf(e.target.value)}
          required
          className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Credits:</label>
        <input
          type="number"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          required
          className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        {code ? "Update" : "Add"}
      </button>
    </form>
  );
}
