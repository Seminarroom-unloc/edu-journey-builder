import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { COURSE } from '@/data/courseData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  ArrowLeft,
  Video,
  Clock,
  ListOrdered,
  CheckCircle,
  Calendar as CalendarIcon,
  Play
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ModuleDetails = () => {
  const { courseId, moduleId } = useParams();
  const [activeTab, setActiveTab] = useState('reading-materials');
  const [module, setModule] = useState<any>(null);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find the module from the course data
    if (COURSE.id === courseId) {
      const index = COURSE.modules.findIndex(m => m.id === moduleId);
      const foundModule = COURSE.modules[index];
      setModule(foundModule);
      setModuleIndex(index);
      
      // Simulating progress - in a real app, this would come from user data
      // For now, we're using a random value between 0 and 100
      setProgress(Math.floor(Math.random() * 100));
    }
  }, [courseId, moduleId]);
  
  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Module not found</p>
      </div>
    );
  }
  
  const handleStartAssignment = (assignmentId: string) => {
    navigate(`/assignment/${courseId}/${assignmentId}`);
  };
  
  // Mock data for demonstration purposes
  // In a real app, this would be fetched from an API based on the module ID
  const readingMaterials = [
    { id: 'r1', title: `${module.title} - Reading 1`, type: 'pdf', size: '2.5 MB' },
    { id: 'r2', title: `${module.title} - Reading 2`, type: 'pdf', size: '1.8 MB' },
  ];
  
  const videoLinks = [
    { 
      id: 'v1', 
      title: `${module.title} - Video Tutorial 1`, 
      duration: '15:30',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&h=225&auto=format&fit=crop',
      imageSrc: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      id: 'v2', 
      title: `${module.title} - Video Tutorial 2`, 
      duration: '12:45',
      thumbnail: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=400&h=225&auto=format&fit=crop',
      imageSrc: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=2070&auto=format&fit=crop'
    },
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
  
  const getProgressStatus = () => {
    if (progress === 0) return "Not Started";
    if (progress < 50) return "In Progress";
    if (progress < 100) return "Almost Complete";
    return "Completed";
  };
  
  const getProgressColor = () => {
    if (progress === 100) return "bg-green-500";
    if (progress > 60) return "bg-purple-500";
    return "bg-purple-500";
  };
  
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20 bg-purple-700 text-white">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Link to={`/course/${courseId}`} className="flex items-center text-sm mb-4 hover:underline text-white/80">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Course
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <div className="flex items-center mb-2">
                <Badge variant="outline" className="mr-3 bg-white/10 text-white border-white/20">
                  <ListOrdered className="h-3.5 w-3.5 mr-1" />
                  Module {moduleIndex + 1}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold">{module.title}</h1>
              <p className="text-white/80 mt-1">{module.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Card className="mb-6 bg-white border-purple-100 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div className="flex items-center mb-2 md:mb-0">
                <h3 className="font-medium mr-2">Module Progress:</h3>
                <Badge className={`${progress === 100 ? "bg-green-500" : "bg-purple-600"} text-white`}>
                  {getProgressStatus()}
                </Badge>
              </div>
              <div className="flex items-center">
                {progress === 100 && (
                  <div className="flex items-center text-green-500 mr-2">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Complete</span>
                  </div>
                )}
                <span className="text-sm font-medium">{progress}%</span>
              </div>
            </div>
            <Progress value={progress} className={`h-2 ${getProgressColor()}`} />
          </CardContent>
        </Card>
        
        <Tabs defaultValue="reading-materials" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-fit grid-cols-4 md:grid-cols-4 mb-8 mx-auto bg-purple-100 text-purple-800">
            <TabsTrigger value="reading-materials" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Reading Materials</TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Video Lectures</TabsTrigger>
            <TabsTrigger value="assignments" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Assignments</TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Quiz</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reading-materials">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Reading Materials</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {readingMaterials.map((material) => (
                <Card key={material.id} className="bg-white border-purple-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{material.title}</CardTitle>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">{material.type.toUpperCase()}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Size: {material.size}</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Download</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Video Lectures</h2>
            <div className="grid gap-6">
              {videoLinks.map((video) => (
                <Card key={video.id} className="overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-all duration-200 bg-white border-purple-100">
                  <div className="md:w-64 h-48 md:h-full overflow-hidden bg-muted relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="bg-white rounded-full p-3 shadow-lg">
                        <Play className="w-8 h-8 text-gray-800 fill-gray-800 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between p-5">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl">{video.title}</CardTitle>
                        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          <div className="flex items-center">
                            <Video className="w-3 h-3 mr-1" />
                            Video
                          </div>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                        <span>Duration: {video.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 mt-auto">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="assignments">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Assignments</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="bg-white border-purple-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">
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
                        <div className="flex items-center">
                          <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                          {assignment.dueDate}
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="text-muted-foreground mb-1">Est. Time</div>
                        <div className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                          {assignment.estimatedTime}
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => handleStartAssignment(assignment.id)}
                    >
                      Start Assignment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="quiz">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Quiz</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="bg-white border-purple-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">
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
                        <div className="flex items-center">
                          <HelpCircle className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                          {quiz.questions}
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="text-muted-foreground mb-1">Time Limit</div>
                        <div className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                          {quiz.timeLimit}
                        </div>
                      </div>
                      <div className="text-sm col-span-2">
                        <div className="text-muted-foreground mb-1">Available Until</div>
                        <div className="flex items-center">
                          <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                          {quiz.availableUntil}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Start Quiz</Button>
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
