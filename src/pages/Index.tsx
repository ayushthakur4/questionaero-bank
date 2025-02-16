
import { useState } from "react";
import { motion } from "framer-motion";
import SemesterCard from "@/components/SemesterCard";
import SubjectCard from "@/components/SubjectCard";
import SearchBar from "@/components/SearchBar";
import { ChevronLeft } from "lucide-react";

// Mock data (replace with real data later)
const semesters = [
  { id: 1, subjects: 6 },
  { id: 2, subjects: 7 },
  { id: 3, subjects: 6 },
  { id: 4, subjects: 8 },
  { id: 5, subjects: 7 },
  { id: 6, subjects: 6 },
  { id: 7, subjects: 5 },
  { id: 8, subjects: 4 },
];

const subjects = [
  { id: 1, name: "Data Structures", code: "CS201", papers: 5 },
  { id: 2, name: "Database Management", code: "CS202", papers: 4 },
  { id: 3, name: "Operating Systems", code: "CS203", papers: 6 },
  { id: 4, name: "Computer Networks", code: "CS204", papers: 3 },
  { id: 5, name: "Software Engineering", code: "CS205", papers: 4 },
  { id: 6, name: "Web Development", code: "CS206", papers: 5 },
];

const Index = () => {
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-sage-800 mb-4">
            College Question Bank
          </h1>
          <p className="text-sage-600 text-lg max-w-2xl mx-auto">
            Access previous year question papers for all semesters
          </p>
        </motion.div>

        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={selectedSemester ? "Search subjects..." : "Search across all semesters..."}
          />
        </div>

        {selectedSemester ? (
          <div>
            <button
              onClick={() => setSelectedSemester(null)}
              className="flex items-center text-sage-600 hover:text-sage-800 mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Semesters
            </button>
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
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {semesters.map((semester) => (
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
