
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CourseHeader from '@/components/course/CourseHeader';
import { COURSE } from '@/data/courseData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Calendar, Clock, Bookmark, CheckCircle, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

// Define module status types - removing 'pending'
type ModuleStatus = 'completed' | 'ongoing' | 'locked';

const Course = () => {
  const [moduleStatuses, setModuleStatuses] = useState<ModuleStatus[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // In a real app, this would come from user progress data
    // For now, we'll set the first module as completed, second as ongoing, and the rest as locked
    const initialStatuses: ModuleStatus[] = COURSE.modules.map((_, index) => {
      if (index === 0) return 'completed';
      if (index === 1) return 'ongoing';
      return 'locked'; // All modules after "ongoing" are locked
    });
    
    setModuleStatuses(initialStatuses);
  }, []);
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, this would fetch the course based on the ID
  // For now, we're using mock data
  
  const handleModuleClick = (moduleId: string, index: number) => {
    if (moduleStatuses[index] === 'locked') {
      toast({
        title: "Module Locked",
        description: "Please complete previous modules first.",
        variant: "destructive"
      });
      return;
    }
    
    navigate(`/module/${COURSE.id}/${moduleId}`);
  };
  
  const getModuleStatusBadge = (status: ModuleStatus) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      case 'ongoing':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Ongoing</Badge>;
      case 'locked':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Locked</Badge>;
      default:
        return null;
    }
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
                className={`border rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300 ${
                  moduleStatuses[index] === 'locked' 
                    ? 'border-gray-200 opacity-75' 
                    : 'border-purple-100 hover:shadow-md transform hover:-translate-y-1 group'
                }`}
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center w-full justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <Badge variant="outline" className="w-fit bg-purple-100 text-purple-700 border-purple-200 font-medium">
                        {moduleStatuses[index] === 'completed' ? (
                          <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-600" />
                        ) : moduleStatuses[index] === 'locked' ? (
                          <Lock className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                        ) : (
                          <Bookmark className="h-3.5 w-3.5 mr-1.5" />
                        )}
                        Module {index + 1}
                      </Badge>
                      <h3 className={`text-lg font-medium ${
                        moduleStatuses[index] === 'locked' 
                          ? 'text-gray-500' 
                          : 'text-gray-800 group-hover:text-purple-700 transition-colors'
                      }`}>
                        {module.title}
                      </h3>
                    </div>
                    <Button 
                      onClick={() => handleModuleClick(module.id, index)}
                      size="sm"
                      className={`font-medium ${
                        moduleStatuses[index] === 'locked' 
                          ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed text-gray-600' 
                          : 'bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200'
                      }`}
                    >
                      {moduleStatuses[index] === 'locked' 
                        ? 'Locked' 
                        : 'Go to Module Materials'}
                    </Button>
                  </div>
                  <p className={`text-sm text-left mt-2.5 md:ml-[7.5rem] md:mt-0 ${
                    moduleStatuses[index] === 'locked' ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    {module.description}
                  </p>
                  
                  <div className="mt-3.5 pt-3.5 border-t border-purple-100 flex flex-wrap gap-4 items-center">
                    <div className={`flex items-center text-xs ${
                      moduleStatuses[index] === 'locked' ? 'text-gray-500' : 'text-purple-700'
                    }`}>
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      <span>{module.lectures.length} lectures</span>
                    </div>
                    <div className={`flex items-center text-xs ${
                      moduleStatuses[index] === 'locked' ? 'text-gray-500' : 'text-purple-700'
                    }`}>
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      <span>Estimated time: {module.lectures.length * 25} minutes</span>
                    </div>
                    <div className="ml-auto">
                      {getModuleStatusBadge(moduleStatuses[index])}
                    </div>
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
