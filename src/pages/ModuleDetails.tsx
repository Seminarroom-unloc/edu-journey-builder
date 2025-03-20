
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSE } from '@/data/courseData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  ArrowLeft,
  Video,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ModuleDetails = () => {
  const { courseId, moduleId } = useParams();
  const [activeTab, setActiveTab] = useState('reading-materials');
  const [module, setModule] = useState<any>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find the module from the course data
    if (COURSE.id === courseId) {
      const foundModule = COURSE.modules.find(m => m.id === moduleId);
      setModule(foundModule);
    }
  }, [courseId, moduleId]);
  
  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Module not found</p>
      </div>
    );
  }
  
  // Mock data for demonstration purposes
  // In a real app, this would be fetched from an API based on the module ID
  const readingMaterials = [
    { id: 'r1', title: `${module.title} - Reading 1`, type: 'pdf', size: '2.5 MB' },
    { id: 'r2', title: `${module.title} - Reading 2`, type: 'pdf', size: '1.8 MB' },
  ];
  
  const videoLinks = [
    { id: 'v1', title: `${module.title} - Video Tutorial 1`, duration: '15:30' },
    { id: 'v2', title: `${module.title} - Video Tutorial 2`, duration: '12:45' },
  ];
  
  const assignments = [
    { 
      id: 'a1', 
      title: `${module.title} - Assignment`, 
      dueDate: '15 days from now',
      estimatedTime: '2 hours',
      status: 'not-started'
    }
  ];
  
  const quizzes = [
    {
      id: 'q1',
      title: `${module.title} - Quiz`,
      questions: 10,
      timeLimit: '15 minutes',
      status: 'not-started',
      availableUntil: '30 days from now'
    }
  ];
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 border-b shadow-sm py-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link to={`/course/${courseId}`} className="flex items-center text-sm mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Course
          </Link>
          <h1 className="text-2xl font-bold">{module.title}</h1>
          <p className="text-muted-foreground mt-1">{module.description}</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Tabs defaultValue="reading-materials" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-fit grid-cols-4 md:grid-cols-4 mb-8 mx-auto">
            <TabsTrigger value="reading-materials">Reading Materials</TabsTrigger>
            <TabsTrigger value="videos">Video Lectures</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reading-materials">
            <h2 className="text-xl font-semibold mb-4">Reading Materials</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {readingMaterials.map((material) => (
                <Card key={material.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{material.title}</CardTitle>
                      <Badge variant="outline">{material.type.toUpperCase()}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Size: {material.size}</p>
                    <Button className="w-full">Download</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <h2 className="text-xl font-semibold mb-4">Video Lectures</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {videoLinks.map((video) => (
                <Card key={video.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      <span>{video.duration}</span>
                    </div>
                    <Button className="w-full">Watch Video</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="assignments">
            <h2 className="text-xl font-semibold mb-4">Assignments</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="outline">
                        {assignment.status === 'completed'
                          ? 'Completed'
                          : assignment.status === 'in-progress'
                          ? 'In Progress'
                          : 'Not Started'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-sm">
                        <div className="text-muted-foreground mb-1">Due Date</div>
                        <div>{assignment.dueDate}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-muted-foreground mb-1">Est. Time</div>
                        <div>{assignment.estimatedTime}</div>
                      </div>
                    </div>
                    <Button className="w-full">Start Assignment</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="quiz">
            <h2 className="text-xl font-semibold mb-4">Quiz</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {quizzes.map((quiz) => (
                <Card key={quiz.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="outline">
                        {quiz.status === 'completed'
                          ? 'Completed'
                          : quiz.status === 'in-progress'
                          ? 'In Progress'
                          : 'Not Started'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-sm">
                        <div className="text-muted-foreground mb-1">Questions</div>
                        <div>{quiz.questions}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-muted-foreground mb-1">Time Limit</div>
                        <div>{quiz.timeLimit}</div>
                      </div>
                      <div className="text-sm col-span-2">
                        <div className="text-muted-foreground mb-1">Available Until</div>
                        <div>{quiz.availableUntil}</div>
                      </div>
                    </div>
                    <Button className="w-full">Start Quiz</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModuleDetails;
