
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Book, Clock, PlayCircle, Users, Star, Heart, Award, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const COURSE = {
  id: '1',
  title: 'Introduction to React Development',
  description: 'Learn the fundamentals of React and build dynamic web applications with the most popular JavaScript library.',
  fullDescription: 'This comprehensive course will take you from React beginner to confident developer. You will learn all the core concepts including components, state, props, hooks, context API, and more. By the end of the course, you will be able to build your own modern, dynamic web applications with React.',
  instructor: {
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Senior Frontend Developer',
    bio: 'Sarah has over 8 years of experience in frontend development, specializing in React and its ecosystem. She has worked with numerous startups and large tech companies, helping them build scalable web applications.',
    courses: 12,
    students: 15400,
    rating: 4.8
  },
  price: 79.99,
  discountedPrice: 49.99,
  duration: '6 weeks',
  totalHours: 24,
  totalLectures: 48,
  totalExercises: 12,
  level: 'Beginner',
  lastUpdated: 'March 2023',
  language: 'English',
  certificate: true,
  imgSrc: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
  rating: 4.7,
  reviews: 342,
  enrolled: 1842,
  modules: [
    {
      id: 'm1',
      title: 'Getting Started with React',
      description: 'Learn the basics of React and set up your development environment.',
      lectures: [
        { id: 'l1', title: 'Introduction to React', duration: '12:45', type: 'video' },
        { id: 'l2', title: 'Setting Up Your Development Environment', duration: '18:30', type: 'video' },
        { id: 'l3', title: 'Your First React Component', duration: '15:20', type: 'video' },
        { id: 'l4', title: 'Module Quiz', type: 'quiz' }
      ]
    },
    {
      id: 'm2',
      title: 'React Components and Props',
      description: 'Understand how to create and compose React components.',
      lectures: [
        { id: 'l5', title: 'Component Types', duration: '14:50', type: 'video' },
        { id: 'l6', title: 'Props and Data Flow', duration: '22:15', type: 'video' },
        { id: 'l7', title: 'Component Composition', duration: '19:40', type: 'video' },
        { id: 'l8', title: 'Practice Exercise: Building a Component Library', type: 'exercise' },
        { id: 'l9', title: 'Module Quiz', type: 'quiz' }
      ]
    },
    {
      id: 'm3',
      title: 'State and Lifecycle Methods',
      description: 'Learn how to manage state and work with component lifecycle.',
      lectures: [
        { id: 'l10', title: 'Introduction to State', duration: '16:30', type: 'video' },
        { id: 'l11', title: 'The useState Hook', duration: '25:10', type: 'video' },
        { id: 'l12', title: 'Component Lifecycle', duration: '20:45', type: 'video' },
        { id: 'l13', title: 'The useEffect Hook', duration: '23:20', type: 'video' },
        { id: 'l14', title: 'Practice Exercise: State Management', type: 'exercise' },
        { id: 'l15', title: 'Module Quiz', type: 'quiz' }
      ]
    },
    {
      id: 'm4',
      title: 'Handling Events and Forms',
      description: 'Master event handling and form management in React.',
      lectures: [
        { id: 'l16', title: 'Event Handling Basics', duration: '14:15', type: 'video' },
        { id: 'l17', title: 'Working with Forms', duration: '19:50', type: 'video' },
        { id: 'l18', title: 'Form Validation', duration: '22:30', type: 'video' },
        { id: 'l19', title: 'Practice Exercise: Building a Form', type: 'exercise' },
        { id: 'l20', title: 'Module Quiz', type: 'quiz' }
      ]
    }
  ],
  courseReviews: [
    {
      id: 'r1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      date: '2023-02-15',
      comment: 'This course is fantastic! The instructor explains concepts clearly and the exercises are very helpful.'
    },
    {
      id: 'r2',
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 4,
      date: '2023-01-20',
      comment: 'Great course for beginners. I had zero experience with React and now I feel confident building my own applications.'
    },
    {
      id: 'r3',
      name: 'Michael Brown',
      avatar: 'https://i.pravatar.cc/150?img=8',
      rating: 5,
      date: '2023-03-05',
      comment: 'The instructor is knowledgeable and the course content is up-to-date. Highly recommended!'
    }
  ],
  what_you_learn: [
    'Build powerful, fast, user-friendly web applications',
    'Understand the React component lifecycle',
    'Master React Hooks for state management',
    'Create and manage complex forms with validation',
    'Implement routing in your React applications',
    'Connect to APIs and handle data flow'
  ],
  requirements: [
    'Basic HTML, CSS, and JavaScript knowledge',
    'Understanding of ES6+ syntax',
    'No prior React experience needed'
  ]
};

const Course = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 > 0;
    const emptyStars = 5 - Math.ceil(rating);
    
    return (
      <>
        {Array(fullStars).fill('★').join('')}
        {hasHalfStar ? '½' : ''}
        {Array(emptyStars).fill('☆').join('')}
      </>
    );
  };
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Course Header */}
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
              <h1 className="text-3xl font-bold mb-4">{COURSE.title}</h1>
              <p className="text-muted-foreground mb-4">{COURSE.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1.5" />
                  <span className="font-medium">{COURSE.rating}</span>
                  <span className="text-muted-foreground ml-1">({COURSE.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-slate-500 mr-1.5" />
                  <span>{COURSE.enrolled} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-slate-500 mr-1.5" />
                  <span>{COURSE.duration}</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="font-normal">{COURSE.level}</Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={COURSE.instructor.avatar} />
                  <AvatarFallback>{COURSE.instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{COURSE.instructor.name}</div>
                  <div className="text-sm text-muted-foreground">{COURSE.instructor.role}</div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="overflow-hidden shadow-lg">
                <div className="aspect-video w-full">
                  <img 
                    src={COURSE.imgSrc} 
                    alt={COURSE.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">${COURSE.discountedPrice}</span>
                      <span className="text-xl text-muted-foreground line-through">${COURSE.price}</span>
                      <span className="text-sm font-medium text-green-600">
                        {Math.round((1 - COURSE.discountedPrice / COURSE.price) * 100)}% off
                      </span>
                    </div>
                  </div>
                  
                  <Button className="w-full mb-3">Enroll Now</Button>
                  <Button variant="outline" className="w-full">Add to Wishlist</Button>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total hours</span>
                      <span>{COURSE.totalHours}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Lectures</span>
                      <span>{COURSE.totalLectures}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Exercises</span>
                      <span>{COURSE.totalExercises}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Language</span>
                      <span>{COURSE.language}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last updated</span>
                      <span>{COURSE.lastUpdated}</span>
                    </div>
                    {COURSE.certificate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Certificate</span>
                        <span className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Yes
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Tabs */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                  <p className="text-muted-foreground leading-relaxed">{COURSE.fullDescription}</p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {COURSE.what_you_learn.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {COURSE.requirements.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">This course includes:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <PlayCircle className="h-5 w-5 text-slate-500 mr-3" />
                        <span>{COURSE.totalHours} hours on-demand video</span>
                      </li>
                      <li className="flex items-center">
                        <Download className="h-5 w-5 text-slate-500 mr-3" />
                        <span>Downloadable resources</span>
                      </li>
                      <li className="flex items-center">
                        <Book className="h-5 w-5 text-slate-500 mr-3" />
                        <span>{COURSE.totalExercises} practical exercises</span>
                      </li>
                      <li className="flex items-center">
                        <Users className="h-5 w-5 text-slate-500 mr-3" />
                        <span>Forum access</span>
                      </li>
                      <li className="flex items-center">
                        <Heart className="h-5 w-5 text-slate-500 mr-3" />
                        <span>Full lifetime access</span>
                      </li>
                      <li className="flex items-center">
                        <Award className="h-5 w-5 text-slate-500 mr-3" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Student Feedback</h3>
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-center md:text-left">
                        <div className="text-5xl font-bold text-primary">{COURSE.rating}</div>
                        <div className="flex text-yellow-500 my-2 justify-center md:justify-start">
                          {renderStars(COURSE.rating)}
                        </div>
                        <div className="text-sm text-muted-foreground">{COURSE.reviews} reviews</div>
                      </div>
                      <div className="hidden md:block w-2/3">
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-3">
                              <div className="text-sm w-3">{star}</div>
                              <Progress value={star === 5 ? 75 : star === 4 ? 20 : star === 3 ? 5 : 0} className="h-2" />
                              <div className="text-sm text-muted-foreground w-8">
                                {star === 5 ? '75%' : star === 4 ? '20%' : star === 3 ? '5%' : '0%'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="curriculum" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">Course Content</h2>
              <div className="flex flex-wrap gap-4 mb-6">
                <div>
                  <span className="font-medium">{COURSE.modules.length}</span> modules
                </div>
                <div>
                  <span className="font-medium">{COURSE.totalLectures}</span> lectures
                </div>
                <div>
                  <span className="font-medium">{COURSE.totalHours}</span> hours
                </div>
              </div>
              
              <Accordion type="multiple" className="w-full">
                {COURSE.modules.map((module) => (
                  <AccordionItem key={module.id} value={module.id}>
                    <AccordionTrigger className="py-4 hover:bg-slate-100 dark:hover:bg-slate-800 px-4 rounded-md -mx-4">
                      <div>
                        <div>{module.title}</div>
                        <div className="text-sm text-muted-foreground font-normal mt-1">
                          {module.lectures.length} lectures • {module.lectures.filter(l => l.duration).reduce((acc, curr) => {
                            const [mins, secs] = curr.duration.split(':').map(Number);
                            return acc + mins + secs / 60;
                          }, 0).toFixed(1)} hours
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <ul className="space-y-1">
                        {module.lectures.map((lecture) => (
                          <li key={lecture.id} className="flex justify-between items-center py-3 px-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                            <div className="flex items-center">
                              {lecture.type === 'video' ? (
                                <PlayCircle className="h-4 w-4 text-slate-500 mr-3" />
                              ) : lecture.type === 'quiz' ? (
                                <Book className="h-4 w-4 text-slate-500 mr-3" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-slate-500 mr-3" />
                              )}
                              <span>{lecture.title}</span>
                            </div>
                            {lecture.duration && (
                              <span className="text-sm text-muted-foreground">{lecture.duration}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent value="instructor" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={COURSE.instructor.avatar} />
                    <AvatarFallback>{COURSE.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold mb-1">{COURSE.instructor.name}</h2>
                  <p className="text-muted-foreground mb-4">{COURSE.instructor.role}</p>
                  
                  <div className="grid grid-cols-3 gap-4 w-full mb-6">
                    <div className="text-center">
                      <div className="text-xl font-bold">{COURSE.instructor.rating}</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold">{COURSE.instructor.courses}</div>
                      <div className="text-sm text-muted-foreground">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold">{(COURSE.instructor.students / 1000).toFixed(1)}k</div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold mb-4">About Me</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{COURSE.instructor.bio}</p>
                
                <h3 className="text-xl font-bold mb-4">My Courses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="overflow-hidden flex flex-col sm:flex-row">
                      <div className="w-full sm:w-24 h-32 sm:h-auto bg-slate-200 dark:bg-slate-700 shrink-0">
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          Img
                        </div>
                      </div>
                      <CardContent className="p-4 flex-1">
                        <h4 className="font-medium line-clamp-2">Advanced React Patterns and Best Practices</h4>
                        <div className="flex items-center text-sm mt-2">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>4.9</span>
                          <span className="mx-2">•</span>
                          <span>Intermediate</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Student Feedback</h3>
                    <div className="text-center md:text-left mb-6">
                      <div className="text-5xl font-bold text-primary">{COURSE.rating}</div>
                      <div className="flex text-yellow-500 my-2 justify-center md:justify-start">
                        {renderStars(COURSE.rating)}
                      </div>
                      <div className="text-sm text-muted-foreground">{COURSE.reviews} reviews</div>
                    </div>
                    
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3">
                          <div className="text-sm w-3">{star}</div>
                          <Progress value={star === 5 ? 75 : star === 4 ? 20 : star === 3 ? 5 : 0} className="h-2" />
                          <div className="text-sm text-muted-foreground w-8">
                            {star === 5 ? '75%' : star === 4 ? '20%' : star === 3 ? '5%' : '0%'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Reviews</h2>
                </div>
                
                <div className="space-y-6">
                  {COURSE.courseReviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex text-yellow-500 text-sm">
                            {renderStars(review.rating)}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <p className="mt-2">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Course;
