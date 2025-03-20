
import { ArrowLeft, Users, Clock, Star, Heart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { CourseType } from '@/types/course';

interface CourseHeaderProps {
  course: CourseType;
}

const CourseHeader = ({ course }: CourseHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="pt-16 bg-white dark:bg-slate-800 border-b border-border">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-muted-foreground mb-4">{course.description}</p>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1.5" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-muted-foreground ml-1">({course.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-slate-500 mr-1.5" />
                <span>{course.enrolled} students</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-slate-500 mr-1.5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="font-normal">{course.level}</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={course.instructor.avatar} />
                <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{course.instructor.name}</div>
                <div className="text-sm text-muted-foreground">{course.instructor.role}</div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-lg">
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
                    <span className="text-muted-foreground">Total hours</span>
                    <span>{course.totalHours}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lectures</span>
                    <span>{course.totalLectures}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Exercises</span>
                    <span>{course.totalExercises}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Language</span>
                    <span>{course.language}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last updated</span>
                    <span>{course.lastUpdated}</span>
                  </div>
                  {course.certificate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Certificate</span>
                      <span className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Yes
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex gap-3">
                  <Button className="flex-1">Enroll Now</Button>
                  <Button variant="outline" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
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
