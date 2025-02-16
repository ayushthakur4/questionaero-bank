
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface SubjectCardProps {
  name: string;
  code: string;
  papers: number;
  onClick: () => void;
}

const SubjectCard = ({ name, code, papers, onClick }: SubjectCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-sage-200 bg-white/50 backdrop-blur-sm"
        onClick={onClick}
      >
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold text-sage-800">
                {name}
              </CardTitle>
              <Badge variant="secondary" className="bg-sage-100 text-sage-700">
                {code}
              </Badge>
            </div>
            <FileText className="w-6 h-6 text-sage-500" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-sage-600">{papers} Previous Papers Available</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SubjectCard;
