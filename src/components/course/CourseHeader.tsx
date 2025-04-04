
import { Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CourseType } from '@/types/course';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

interface CourseHeaderProps {
  course: CourseType;
}

const CourseHeader = ({ course }: CourseHeaderProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock upcoming tasks for calendar display
  const upcomingTasks = [
    { date: new Date(2025, 3, 10), title: 'Assignment 1 Due', type: 'assignment' },
    { date: new Date(2025, 3, 15), title: 'Quiz 1', type: 'quiz' },
    { date: new Date(2025, 3, 22), title: 'Project Submission', type: 'project' },
    { date: new Date(2025, 4, 5), title: 'Final Exam', type: 'exam' }
  ];
  
  // Function to highlight dates with tasks
  const isDayWithTask = (day: Date) => {
    return upcomingTasks.some(task => 
      day.getDate() === task.date.getDate() && 
      day.getMonth() === task.date.getMonth() && 
      day.getFullYear() === task.date.getFullYear()
    );
  };
  
  // Get tasks for selected date
  const getTasksForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    return upcomingTasks.filter(task => 
      selectedDate.getDate() === task.date.getDate() && 
      selectedDate.getMonth() === task.date.getMonth() && 
      selectedDate.getFullYear() === task.date.getFullYear()
    );
  };
  
  const selectedDateTasks = getTasksForDate(date);
  
  return (
    <div className="pt-16 bg-purple-700 text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-white/80 mb-4">{course.description}</p>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1.5" />
                <span className="font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-white/80 mr-1.5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="font-normal bg-white/10 text-white border-white/20">{course.level}</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={course.instructor.avatar} />
                <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{course.instructor.name}</div>
                <div className="text-sm text-white/80">{course.instructor.role}</div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm border-white/20">
              <div className="aspect-video w-full">
                <img 
                  src={course.imgSrc} 
                  alt={course.title}
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">Total hours</span>
                    <span>{course.totalHours}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">Lectures</span>
                    <span>{course.totalLectures}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">Exercises</span>
                    <span>{course.totalExercises}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Enrolled
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Calendar Section - Now moved above */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h2 className="text-xl font-bold mb-4">Course Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="bg-white/5 rounded-lg border border-white/20"
                modifiers={{
                  taskDay: (day) => isDayWithTask(day),
                }}
                modifiersClassNames={{
                  taskDay: "bg-purple-500 text-white font-bold hover:bg-purple-600",
                }}
              />
              <div className="mt-4 text-sm">
                <p className="mb-2">Highlighted dates show upcoming deadlines</p>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span>Task or deadline</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">
                {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a date'}
              </h3>
              {selectedDateTasks.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateTasks.map((task, index) => (
                    <div key={index} className="p-3 bg-white/10 rounded-lg border border-white/20">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-white/80 mt-1">
                        <Badge variant="outline" className="bg-purple-500/20 text-white border-purple-400/30">
                          {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-white/80">No tasks scheduled for this date.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
