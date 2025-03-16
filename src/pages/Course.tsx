
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, CheckCircle, Clock, FileText, Play, User } from 'lucide-react';

// Mock course data
const COURSES = [
  {
    id: '1',
    title: 'Introduction to React Development',
    description: 'Learn the fundamentals of React and build dynamic web applications with the most popular JavaScript library.',
    longDescription: 'React is a powerful JavaScript library for building user interfaces. In this comprehensive course, you will learn everything you need to know to start building professional-grade applications with React. We will cover core concepts like components, state, props, hooks, and routing, as well as advanced topics like context, reducers, and integrating with APIs.',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://i.pravatar.cc/150?img=1',
    instructorBio: 'Sarah is a senior frontend developer with over 8 years of experience working with React. She has helped build applications for Fortune 500 companies and has taught over 50,000 students online.',
    duration: '6 weeks',
    modules: 8,
    totalLessons: 32,
    totalHours: 24,
    progress: 0,
    rating: 4.8,
    reviews: 342,
    students: 12583,
    level: 'Beginner',
    imgSrc: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    sections: [
      {
        title: 'Getting Started with React',
        lessons: [
          { id: '1-1', title: 'Course Introduction', duration: '5:23', type: 'video' },
          { id: '1-2', title: 'Setting Up Your Development Environment', duration: '12:47', type: 'video' },
          { id: '1-3', title: 'Creating Your First React App', duration: '18:35', type: 'video' },
          { id: '1-4', title: 'Understanding JSX', duration: '14:12', type: 'video' },
        ],
      },
      {
        title: 'React Components',
        lessons: [
          { id: '2-1', title: 'Functional Components', duration: '16:08', type: 'video' },
          { id: '2-2', title: 'Class Components', duration: '14:52', type: 'video' },
          { id: '2-3', title: 'Props and State', duration: '22:10', type: 'video' },
          { id: '2-4', title: 'Component Lifecycle', duration: '19:43', type: 'video' },
          { id: '2-5', title: 'Components Quiz', duration: '15 min', type: 'quiz' },
        ],
      },
      {
        title: 'Hooks and State Management',
        lessons: [
          { id: '3-1', title: 'Introduction to Hooks', duration: '10:28', type: 'video' },
          { id: '3-2', title: 'useState Hook', duration: '15:17', type: 'video' },
          { id: '3-3', title: 'useEffect Hook', duration: '18:25', type: 'video' },
          { id: '3-4', title: 'Custom Hooks', duration: '20:40', type: 'video' },
          { id: '3-5', title: 'State Management Assignment', duration: '45 min', type: 'assignment' },
        ],
      },
    ],
  },
  // Add other courses here...
];

const Course = () => {
  const { id } = useParams<{ id: string }>();
  const course = COURSES.find(c => c.id === id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Course not found</h1>
        <Button asChild>
          <Link to="/">Go back to courses</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      {/* Course Header */}
      <section className="pt-28 pb-8 px-4 md:px-6 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto max-w-6xl">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {course.longDescription}
              </p>
              
              <div className="flex items-center flex-wrap gap-4 text-sm mb-6">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span>{course.totalHours} hours</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span>{course.totalLessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{course.rating} ({course.reviews} reviews)</span>
                </div>
                <div className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                  {course.level}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Enroll in Course
                </Button>
                {course.progress > 0 && (
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Your progress</span>
                      <span>{course.progress}% complete</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative">
                <img 
                  src={course.imgSrc} 
                  alt={course.title} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Button size="icon" variant="ghost" className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                    <Play className="w-8 h-8 text-white" fill="white" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-lg border border-border/40 shadow-subtle">
                <div className="flex items-center space-x-4 mb-4">
                  <img src={course.instructorAvatar} alt={course.instructor} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h3 className="font-medium">{course.instructor}</h3>
                    <p className="text-sm text-muted-foreground">Course Instructor</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {course.instructorBio}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Content */}
      <section className="py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="curriculum" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="space-y-4">
                {course.sections.map((section, index) => (
                  <div key={index} className="border border-border/40 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-subtle">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
                      <h3 className="font-medium">
                        {section.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {section.lessons.length} lessons
                      </span>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      {section.lessons.map(lesson => (
                        <div key={lesson.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-between border-b border-border/40 last:border-b-0 transition-colors">
                          <div className="flex items-center">
                            {lesson.type === 'video' && (
                              <Play className="w-4 h-4 mr-3 text-primary" />
                            )}
                            {lesson.type === 'quiz' && (
                              <FileText className="w-4 h-4 mr-3 text-yellow-500" />
                            )}
                            {lesson.type === 'assignment' && (
                              <FileText className="w-4 h-4 mr-3 text-blue-500" />
                            )}
                            <span>{lesson.title}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {lesson.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="overview" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Course Overview</h2>
                <p>
                  This comprehensive course will teach you everything you need to know about React development, from basics to advanced concepts. By the end of this course, you'll be able to build complex, interactive web applications using React.
                </p>
                
                <h3>What You'll Learn</h3>
                <ul>
                  <li>Understand React fundamentals including components, props, and state</li>
                  <li>Master React Hooks and functional components</li>
                  <li>Create and manage complex state with Context API and Redux</li>
                  <li>Build performant applications with optimization techniques</li>
                  <li>Implement routing with React Router</li>
                  <li>Connect your React applications to APIs and external services</li>
                  <li>Deploy your applications to production</li>
                </ul>
                
                <h3>Prerequisites</h3>
                <ul>
                  <li>Basic understanding of HTML, CSS, and JavaScript</li>
                  <li>Familiarity with ES6+ syntax</li>
                  <li>Understanding of npm and node.js basics</li>
                </ul>
                
                <h3>Target Audience</h3>
                <p>
                  This course is perfect for web developers looking to upgrade their skills, JavaScript developers interested in learning a framework, and anyone who wants to build modern web applications.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="text-center md:text-left">
                    <div className="text-5xl font-bold text-primary">{course.rating}</div>
                    <div className="flex text-yellow-500 my-2 justify-center md:justify-start">
                      {'★'.repeat(Math.floor(course.rating))}
                      {course.rating % 1 > 0 ? '½' : ''}
                      {'☆'.repeat(5 - Math.ceil(course.rating))}
                    </div>
                    <div className="text-sm text-muted-foreground">{course.reviews} reviews</div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground w-4">{rating}</div>
                        <div className="w-full max-w-md">
                          <Progress value={rating === 5 ? 78 : rating === 4 ? 15 : rating === 3 ? 5 : rating === 2 ? 1.5 : 0.5} className="h-2" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {rating === 5 ? '78' : rating === 4 ? '15' : rating === 3 ? '5' : rating === 2 ? '1.5' : '0.5'}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-6">
                  {[
                    {
                      name: 'Alex Thompson',
                      avatar: 'https://i.pravatar.cc/150?img=11',
                      rating: 5,
                      date: '2 weeks ago',
                      comment: 'Incredibly comprehensive and well-structured course. Sarah is an excellent teacher who explains complex concepts in an easy-to-understand way. I went from React beginner to confidently building my own projects!',
                    },
                    {
                      name: 'Emma Davis',
                      avatar: 'https://i.pravatar.cc/150?img=9',
                      rating: 5,
                      date: '1 month ago',
                      comment: 'One of the best React courses I've taken. The curriculum is thorough and the projects are practical and challenging. Sarah's teaching style is engaging and she responds quickly to questions.',
                    },
                    {
                      name: 'Marcus Johnson',
                      avatar: 'https://i.pravatar.cc/150?img=4',
                      rating: 4,
                      date: '2 months ago',
                      comment: 'Great course with lots of valuable content. My only suggestion would be to update some of the examples to use the newest React features, but overall I learned a ton and would recommend this to anyone looking to learn React.',
                    },
                  ].map((review, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-border/40">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full mr-3" />
                          <div>
                            <h4 className="font-medium">{review.name}</h4>
                            <div className="flex text-yellow-500 text-sm">
                              {'★'.repeat(review.rating)}
                              {'☆'.repeat(5 - review.rating)}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Course;
