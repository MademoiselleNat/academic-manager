import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SubjectList from "./components/SubjectList";
import SubjectForm from "./components/SubjectForm";
import SubjectDetail from "./components/SubjectDetail";

export default function App() {
  const [subjects, setSubjects] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [assignments, setAssignments] = useState({});


  const addSubject = (newSubject) => {
    setSubjects([...subjects, newSubject]);
  };

  const updateSubject = (updatedSubject) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.code === updatedSubject.code ? updatedSubject : subject
      )
    );
  };

  const deleteSubject = (subjectCode) => {
    setSubjects((prevSubjects) =>
      prevSubjects.filter((subject) => subject.code !== subjectCode)
    );
  };

  const addSchedule = (subjectCode, day, time) => {
    const newSchedule = { subjectCode, day, time };
    setSchedules((prev) => [...prev, newSchedule]);
  };

  const deleteSchedule = (subjectCode, day, time) => {
    setSchedules((prev) =>
      prev.filter(
        (s) =>
          !(
            s.subjectCode === subjectCode &&
            s.day === day &&
            s.time === time
          )
      )
    );
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <SubjectList
                subjects={subjects}
                onDeleteSubject={deleteSubject}
              />
            }
          />
          <Route
            path="/add"
            element={<SubjectForm subjects={subjects} onSubmit={addSubject} />}
          />
          <Route
            path="/edit/:code"
            element={<SubjectForm subjects={subjects} onSubmit={updateSubject} />}
          />
          <Route
            path="/view/:code"
            element={<SubjectDetail 
                subjects={subjects} 
                schedules = {schedules} 
                addSchedule = {addSchedule}
                deleteSchedule = {deleteSchedule}
                assignments = {assignments}
                setAssignments = {setAssignments}
              />}
          />
        </Routes>
      </div>
    </Router>
  );
}
