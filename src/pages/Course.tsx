
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CourseHeader from '@/components/course/CourseHeader';
import { COURSE } from '@/data/courseData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Calendar, Clock, Bookmark, CheckCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <CourseHeader course={COURSE} />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link to="/" className="flex items-center text-sm mb-6 hover:underline text-purple-600 transition-colors duration-200 font-medium">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to All Courses
        </Link>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-purple-100 to-purple-50 px-6 py-5 border-b border-purple-100">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <BookOpen className="h-6 w-6 mr-2.5 text-purple-600" />
              Course Modules
            </h2>
            <p className="text-gray-600 mt-1.5 ml-8.5">Complete all modules to receive your certificate</p>
          </div>
          
          <div className="p-6 space-y-5">
            {COURSE.modules.map((module, index) => (
              <div 
                key={module.id} 
                className="border border-purple-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center w-full justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <Badge variant="outline" className="w-fit bg-purple-100 text-purple-700 border-purple-200 font-medium">
                        {index < 1 ? (
                          <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-600" />
                        ) : (
                          <Bookmark className="h-3.5 w-3.5 mr-1.5" />
                        )}
                        Module {index + 1}
                      </Badge>
                      <h3 className="text-lg font-medium text-gray-800 group-hover:text-purple-700 transition-colors">{module.title}</h3>
                    </div>
                    <Button 
                      onClick={() => handleModuleClick(module.id)}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200 font-medium"
                    >
                      Go to Module Materials
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 text-left mt-2.5 md:ml-[7.5rem] md:mt-0">{module.description}</p>
                  
                  <div className="mt-3.5 pt-3.5 border-t border-purple-100 flex flex-wrap gap-4">
                    <div className="flex items-center text-xs text-purple-700">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      <span>{module.lectures.length} lectures</span>
                    </div>
                    <div className="flex items-center text-xs text-purple-700">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      <span>Estimated time: {module.lectures.length * 25} minutes</span>
                    </div>
                    {index < 1 && (
                      <Badge className="bg-green-100 text-green-700 border-green-200 ml-auto">
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
