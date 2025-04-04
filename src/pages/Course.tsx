
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CourseHeader from '@/components/course/CourseHeader';
import { COURSE } from '@/data/courseData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ListOrdered } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Course = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, this would fetch the course based on the ID
  // For now, we're using mock data
  
  const handleModuleClick = (moduleId: string) => {
    navigate(`/module/${COURSE.id}/${moduleId}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/20 to-pink-900/10 dark:bg-slate-900">
      <CourseHeader course={COURSE} />
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Link to="/" className="flex items-center text-sm mb-4 hover:underline text-purple-600 dark:text-purple-400">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Courses
        </Link>
        
        <h2 className="text-2xl font-bold mb-6 text-purple-800 dark:text-purple-300">Course Modules</h2>
        
        <div className="space-y-4">
          {COURSE.modules.map((module, index) => (
            <div 
              key={module.id} 
              className="border border-purple-200 dark:border-purple-800/30 rounded-md overflow-hidden bg-white/80 dark:bg-slate-800/50 shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm"
            >
              <div className="p-4">
                <div className="flex flex-col items-start w-full">
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-3 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700">
                        <ListOrdered className="h-3.5 w-3.5 mr-1" />
                        Module {index + 1}
                      </Badge>
                      <h3 className="text-lg font-medium text-purple-900 dark:text-purple-300">{module.title}</h3>
                    </div>
                    <Button 
                      onClick={() => handleModuleClick(module.id)}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Go to Module Materials
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-left mt-2">{module.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
