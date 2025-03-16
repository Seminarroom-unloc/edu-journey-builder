
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, CheckCircle, Clock, FileText } from 'lucide-react';

const ASSIGNMENTS = [
  {
    id: '1',
    title: 'Build a React To-Do App',
    course: 'Introduction to React Development',
    description: 'Create a simple to-do application using React components and state management.',
    dueDate: '2023-06-15',
    status: 'completed',
    grade: 'A',
    feedback: 'Excellent work! Your code is clean and your components are well-structured.',
  },
  {
    id: '2',
    title: 'JavaScript Closure Challenge',
    course: 'Advanced JavaScript Patterns',
    description: 'Implement a set of functions demonstrating your understanding of closures in JavaScript.',
    dueDate: '2023-06-20',
    status: 'pending',
  },
  {
    id: '3',
    title: 'User Interface Redesign',
    course: 'UI/UX Design Principles',
    description: 'Redesign the provided web application interface applying the principles learned in the course.',
    dueDate: '2023-06-25',
    status: 'pending',
  },
  {
    id: '4',
    title: 'RESTful API Implementation',
    course: 'Building RESTful APIs with Node.js',
    description: 'Create a fully functional REST API with Node.js and Express for a product catalog.',
    dueDate: '2023-06-18',
    status: 'submitted',
  },
  {
    id: '5',
    title: 'Data Visualization Dashboard',
    course: 'Data Visualization with D3.js',
    description: 'Build an interactive dashboard to visualize the provided dataset using D3.js.',
    dueDate: '2023-06-28',
    status: 'submitted',
  },
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'submitted':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const Assignments = () => {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'submitted' | 'completed'>('all');
  
  const filteredAssignments = selectedStatus === 'all' 
    ? ASSIGNMENTS 
    : ASSIGNMENTS.filter(assignment => assignment.status === selectedStatus);
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      <section className="pt-28 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Assignments</h1>
            <p className="text-muted-foreground text-lg">
              Track your course assignments and submissions
            </p>
          </div>
          
          <Tabs defaultValue="all" onValueChange={(value) => setSelectedStatus(value as any)}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 gap-4">
                {filteredAssignments.map((assignment) => (
                  <Card key={assignment.id} className="animate-fade-in cursor-pointer hover:shadow-hover transition-shadow overflow-hidden group">
                    <CardHeader className="p-4 md:p-6">
                      <div className="flex flex-wrap justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
                            <CardDescription>{assignment.course}</CardDescription>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">{assignment.title}</CardTitle>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          <span className="text-sm">Due {formatDate(assignment.dueDate)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                      <p className="text-muted-foreground mb-4">{assignment.description}</p>
                      
                      {assignment.status === 'completed' && (
                        <div className="bg-muted p-3 rounded-md">
                          <div className="flex items-center mb-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span className="font-medium">Grade: {assignment.grade}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 gap-4">
                {filteredAssignments.map((assignment) => (
                  <Card key={assignment.id} className="animate-fade-in cursor-pointer hover:shadow-hover transition-shadow overflow-hidden group">
                    <CardHeader className="p-4 md:p-6">
                      <div className="flex flex-wrap justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
                            <CardDescription>{assignment.course}</CardDescription>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">{assignment.title}</CardTitle>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          <span className="text-sm">Due {formatDate(assignment.dueDate)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                      <p className="text-muted-foreground">{assignment.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="submitted" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 gap-4">
                {filteredAssignments.map((assignment) => (
                  <Card key={assignment.id} className="animate-fade-in cursor-pointer hover:shadow-hover transition-shadow overflow-hidden group">
                    <CardHeader className="p-4 md:p-6">
                      <div className="flex flex-wrap justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
                            <CardDescription>{assignment.course}</CardDescription>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">{assignment.title}</CardTitle>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          <span className="text-sm">Due {formatDate(assignment.dueDate)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                      <p className="text-muted-foreground">{assignment.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 gap-4">
                {filteredAssignments.map((assignment) => (
                  <Card key={assignment.id} className="animate-fade-in cursor-pointer hover:shadow-hover transition-shadow overflow-hidden group">
                    <CardHeader className="p-4 md:p-6">
                      <div className="flex flex-wrap justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
                            <CardDescription>{assignment.course}</CardDescription>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">{assignment.title}</CardTitle>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          <span className="text-sm">Due {formatDate(assignment.dueDate)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                      <p className="text-muted-foreground mb-4">{assignment.description}</p>
                      
                      {assignment.grade && (
                        <div className="bg-muted p-3 rounded-md">
                          <div className="flex items-center mb-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span className="font-medium">Grade: {assignment.grade}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Assignments;
