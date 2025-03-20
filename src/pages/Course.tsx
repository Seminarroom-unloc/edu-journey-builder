
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CourseHeader from '@/components/course/CourseHeader';
import { COURSE } from '@/data/courseData';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Clock, Video, FileText, HelpCircle, ArrowLeft, ListOrdered } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <CourseHeader course={COURSE} />
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Link to="/" className="flex items-center text-sm mb-4 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Courses
        </Link>
        
        <h2 className="text-2xl font-bold mb-6">Course Modules</h2>
        
        <Accordion type="single" collapsible className="w-full mb-8">
          {COURSE.modules.map((module, index) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger className="hover:bg-slate-100 dark:hover:bg-slate-800 px-4 rounded-md">
                <div className="flex flex-col items-start w-full">
                  <div className="flex items-center w-full">
                    <Badge variant="outline" className="mr-3 bg-primary/10">
                      <ListOrdered className="h-3.5 w-3.5 mr-1" />
                      Module {index + 1}
                    </Badge>
                    <h3 className="text-lg font-medium">{module.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground text-left mt-1">{module.description}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2">
                <div className="space-y-3">
                  {module.lectures.map((lecture) => (
                    <div 
                      key={lecture.id} 
                      className="flex items-center justify-between p-3 rounded-md border hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center">
                        {lecture.type === 'video' && <Video className="w-4 h-4 mr-2 text-blue-500" />}
                        {lecture.type === 'quiz' && <HelpCircle className="w-4 h-4 mr-2 text-purple-500" />}
                        {lecture.type === 'exercise' && <FileText className="w-4 h-4 mr-2 text-green-500" />}
                        <span>{lecture.title}</span>
                      </div>
                      {lecture.duration && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          <span>{lecture.duration}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => handleModuleClick(module.id)} 
                  className="w-full mt-4"
                >
                  Go to Module Materials
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Course;
