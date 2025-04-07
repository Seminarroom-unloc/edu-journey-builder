
import { useState } from 'react';
import { Clock, Star, Download, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CourseType } from '@/types/course';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CourseHeaderProps {
  course: CourseType;
}

const CourseHeader = ({ course }: CourseHeaderProps) => {
  // Mock progress state - in a real app, this would come from user data
  const [courseProgress, setCourseProgress] = useState(65);
  const { toast } = useToast();
  
  // Mock upcoming tasks for due dates slider
  const upcomingDeadlines = [
    { date: new Date(2025, 3, 10), title: 'Assignment 1 Due', type: 'assignment' },
    { date: new Date(2025, 3, 15), title: 'Quiz 1', type: 'quiz' },
    { date: new Date(2025, 3, 22), title: 'Project Submission', type: 'project' },
    { date: new Date(2025, 4, 5), title: 'Final Exam', type: 'exam' }
  ];

  // Mock leaderboard data - showing only top 3
  const leaderboardData = [
    { id: 1, name: 'Emma Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', grade: 'A+', completionRate: 98 },
    { id: 2, name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', grade: 'A', completionRate: 95 },
    { id: 3, name: 'Sophia Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia', grade: 'A-', completionRate: 92 },
  ];
  
  const handleCertificateDownload = () => {
    if (courseProgress >= 100) {
      toast({
        title: "Certificate Downloaded",
        description: "Your course completion certificate has been downloaded.",
      });
    } else {
      toast({
        title: "Cannot Download Certificate",
        description: "You need to complete the course first.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="pt-16 bg-white text-gray-800">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1.5" />
                <span className="font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-1.5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="font-normal bg-purple-50 text-purple-700 border-purple-100">{course.level}</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10 border-2 border-purple-100">
                <AvatarImage src={course.instructor.avatar} />
                <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900">{course.instructor.name}</div>
                <div className="text-sm text-gray-500">{course.instructor.role}</div>
              </div>
            </div>
            
            {/* Due Dates Slider */}
            <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <h2 className="text-lg font-medium mb-3 text-gray-800">Upcoming Deadlines</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {upcomingDeadlines.map((deadline, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2">
                        <Card className="bg-purple-50 border-purple-100">
                          <CardContent className="p-4">
                            <div className="text-sm font-medium text-purple-800">
                              {deadline.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                            <div className="font-medium mt-1 text-gray-800">{deadline.title}</div>
                            <Badge variant="outline" className="mt-2 bg-white/80 text-purple-700 border-purple-200">
                              {deadline.type.charAt(0).toUpperCase() + deadline.type.slice(1)}
                            </Badge>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white text-purple-600 hover:bg-purple-50 hover:text-purple-700 border-purple-100" />
                <CarouselNext className="right-2 bg-white text-purple-600 hover:bg-purple-50 hover:text-purple-700 border-purple-100" />
              </Carousel>
            </div>
            
            {/* Course Progress Tracker */}
            <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium text-gray-800">Course Progress</h2>
                <span className="font-medium text-purple-700">{courseProgress}%</span>
              </div>
              <Progress value={courseProgress} className="h-2.5 bg-purple-100" />
              
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleCertificateDownload}
                  className={`flex items-center gap-2 ${
                    courseProgress >= 100 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-gray-300 hover:bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={courseProgress < 100}
                >
                  <Download className="h-4 w-4" />
                  Download Certificate
                </Button>
              </div>
            </div>
            
            {/* Leaderboard as a separate box */}
            <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-800 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-500" />
                  Course Leaderboard
                </h3>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  <Users className="h-3.5 w-3.5 mr-1.5" />
                  Top Students
                </Badge>
              </div>
              
              <div className="space-y-3">
                {leaderboardData.map((student, index) => (
                  <div key={student.id} className={`flex items-center justify-between p-2.5 rounded-lg ${
                    index === 0 ? 'bg-yellow-50 border border-yellow-100' : 
                    index === 1 ? 'bg-gray-50 border border-gray-200' : 
                    'bg-amber-50 border border-amber-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' :
                        'bg-amber-600'
                      }`}>
                        {index + 1}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-800">{student.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-bold text-sm ${
                        index === 0 ? 'text-yellow-600' : 
                        index === 1 ? 'text-gray-600' :
                        'text-amber-700'
                      }`}>
                        Grade: {student.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-sm bg-white border-gray-200">
              <div className="aspect-video w-full">
                <img 
                  src={course.imgSrc} 
                  alt={course.title}
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total hours</span>
                    <span className="font-medium">{course.totalHours}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Lectures</span>
                    <span className="font-medium">{course.totalLectures}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Exercises</span>
                    <span className="font-medium">{course.totalExercises}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
