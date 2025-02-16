
import { useState } from "react";
import { motion } from "framer-motion";
import SemesterCard from "@/components/SemesterCard";
import SubjectCard from "@/components/SubjectCard";
import SearchBar from "@/components/SearchBar";
import { ChevronLeft, GraduationCap, Book, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data (replace with real data later)
const courses = {
  BCA: {
    semesters: [
      { id: 1, subjects: 6 },
      { id: 2, subjects: 7 },
      { id: 3, subjects: 6 },
      { id: 4, subjects: 8 },
      { id: 5, subjects: 7 },
      { id: 6, subjects: 6 },
    ]
  },
  MCA: {
    semesters: [
      { id: 1, subjects: 8 },
      { id: 2, subjects: 7 },
      { id: 3, subjects: 8 },
      { id: 4, subjects: 6 },
    ]
  }
};

const subjects = [
  { id: 1, name: "Data Structures", code: "CS201", papers: 5 },
  { id: 2, name: "Database Management", code: "CS202", papers: 4 },
  { id: 3, name: "Operating Systems", code: "CS203", papers: 6 },
  { id: 4, name: "Computer Networks", code: "CS204", papers: 3 },
  { id: 5, name: "Software Engineering", code: "CS205", papers: 4 },
  { id: 6, name: "Web Development", code: "CS206", papers: 5 },
];

const Index = () => {
  const [selectedCourse, setSelectedCourse] = useState<"BCA" | "MCA" | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    if (selectedSemester) {
      setSelectedSemester(null);
    } else if (selectedCourse) {
      setSelectedCourse(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-sage-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sage-600 to-sage-800">
            College Question Bank
          </h1>
          <p className="text-sage-600 text-lg max-w-2xl mx-auto">
            Access previous year question papers for all courses and semesters
          </p>
        </motion.div>

        {(selectedCourse || selectedSemester) && (
          <button
            onClick={handleBack}
            className="flex items-center text-sage-600 hover:text-sage-800 mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to {selectedSemester ? "Semesters" : "Courses"}
          </button>
        )}

        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={
              selectedSemester 
                ? "Search subjects..." 
                : selectedCourse 
                ? "Search across semesters..." 
                : "Search across all courses..."
            }
          />
        </div>

        {!selectedCourse ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <Button
                onClick={() => setSelectedCourse("BCA")}
                className="w-full h-48 bg-gradient-to-br from-sage-400 to-sage-600 hover:from-sage-500 hover:to-sage-700 rounded-xl flex flex-col items-center justify-center space-y-4 transition-all duration-300"
              >
                <Book className="w-16 h-16 text-white transition-transform group-hover:scale-110 duration-300" />
                <span className="text-2xl font-bold text-white">BCA</span>
                <span className="text-sage-100">Bachelor of Computer Applications</span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <Button
                onClick={() => setSelectedCourse("MCA")}
                className="w-full h-48 bg-gradient-to-br from-sage-500 to-sage-700 hover:from-sage-600 hover:to-sage-800 rounded-xl flex flex-col items-center justify-center space-y-4 transition-all duration-300"
              >
                <GraduationCap className="w-16 h-16 text-white transition-transform group-hover:scale-110 duration-300" />
                <span className="text-2xl font-bold text-white">MCA</span>
                <span className="text-sage-100">Master of Computer Applications</span>
              </Button>
            </motion.div>
          </div>
        ) : selectedSemester ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                name={subject.name}
                code={subject.code}
                papers={subject.papers}
                onClick={() => console.log(`Selected subject: ${subject.name}`)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses[selectedCourse].semesters.map((semester) => (
              <SemesterCard
                key={semester.id}
                semester={semester.id}
                subjects={semester.subjects}
                onClick={() => setSelectedSemester(semester.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
