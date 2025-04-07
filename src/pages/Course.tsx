
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CourseHeader from '@/components/course/CourseHeader';
import { COURSE } from '@/data/courseData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ListOrdered, BookOpen, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CourseContentTabs from '@/components/course/CourseContentTabs';

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
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-10 border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-purple-600" />
            Course Modules
          </h2>
          
          <div className="space-y-4">
            {COURSE.modules.map((module, index) => (
              <div 
                key={module.id} 
                className="border border-lavender rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center w-full justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <Badge variant="outline" className="w-fit bg-purple-100 text-purple-700 border-purple-200 font-medium">
                        <ListOrdered className="h-3.5 w-3.5 mr-1.5" />
                        Module {index + 1}
                      </Badge>
                      <h3 className="text-lg font-medium text-gray-800">{module.title}</h3>
                    </div>
                    <Button 
                      onClick={() => handleModuleClick(module.id)}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200 font-medium"
                    >
                      Go to Module Materials
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 text-left mt-2.5">{module.description}</p>
                  
                  <div className="mt-3 pt-3 border-t border-purple-100">
                    <div className="flex items-center text-xs text-purple-700">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      <span>{module.lectures.length} lectures</span>
                      <span className="mx-2">•</span>
                      <span>Estimated completion: {module.lectures.length * 25} minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Course Content Tabs Section */}
        <CourseContentTabs courseId={COURSE.id} />
      </div>
    </div>
  );
};

export default Course;
