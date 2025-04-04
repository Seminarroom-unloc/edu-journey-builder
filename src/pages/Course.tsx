
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
    <div className="min-h-screen bg-white">
      <CourseHeader course={COURSE} />
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Link to="/" className="flex items-center text-sm mb-4 hover:underline text-purple-600">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Courses
        </Link>
        
        <h2 className="text-2xl font-bold mb-6 text-purple-800">Course Modules</h2>
        
        <div className="space-y-4">
          {COURSE.modules.map((module, index) => (
            <div 
              key={module.id} 
              className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex flex-col items-start w-full">
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-3 bg-purple-100 text-purple-800 border-purple-300">
                        <ListOrdered className="h-3.5 w-3.5 mr-1" />
                        Module {index + 1}
                      </Badge>
                      <h3 className="text-lg font-medium text-gray-900">{module.title}</h3>
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
