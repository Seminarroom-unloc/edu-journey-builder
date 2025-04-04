
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
    <div className="pt-16 bg-white text-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4 text-purple-800">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1.5" />
                <span className="font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-1.5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="font-normal bg-purple-100 text-purple-800 border-purple-200">{course.level}</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="h-10 w-10 border-2 border-purple-200">
                <AvatarImage src={course.instructor.avatar} />
                <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900">{course.instructor.name}</div>
                <div className="text-sm text-gray-500">{course.instructor.role}</div>
              </div>
            </div>
            
            {/* Calendar Section - More compact */}
            <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold mb-3 text-purple-800">Course Schedule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="bg-white rounded-lg border border-gray-200 p-0"
                    modifiers={{
                      taskDay: (day) => isDayWithTask(day),
                    }}
                    modifiersClassNames={{
                      taskDay: "bg-purple-500 text-white font-bold hover:bg-purple-600",
                    }}
                    showOutsideDays={false}
                  />
                  <div className="mt-2 text-xs flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-gray-600">Important deadline</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-2 text-gray-800">
                    {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : 'Select a date'}
                  </h3>
                  {selectedDateTasks.length > 0 ? (
                    <div className="space-y-2">
                      {selectedDateTasks.map((task, index) => (
                        <div key={index} className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="font-medium text-gray-800">{task.title}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                              {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-500 text-sm">No tasks scheduled for this date.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-md bg-white border-gray-200">
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
                
                <div className="mt-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Enrolled
                  </Button>
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
