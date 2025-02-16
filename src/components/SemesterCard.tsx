
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface SemesterCardProps {
  semester: number;
  subjects: number;
  onClick: () => void;
}

const SemesterCard = ({ semester, subjects, onClick }: SemesterCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-sage-200"
        onClick={onClick}
      >
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold text-sage-800">
              Semester {semester}
            </CardTitle>
            <BookOpen className="w-6 h-6 text-sage-500" />
          </div>
          <CardDescription className="text-sage-600">
            {subjects} Subjects Available
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default SemesterCard;
