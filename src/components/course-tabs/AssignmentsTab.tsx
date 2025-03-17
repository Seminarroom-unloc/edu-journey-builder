
import { Calendar, Clock, User, FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AssignmentsTabProps {
  courseId: string;
}

const ASSIGNMENTS = [
  {
    id: 'a1',
    title: 'Create a Simple HTML Page',
    dueDate: '15th April, 2024',
    assignedDate: '5th April, 2024',
    estimatedTime: '2 hours',
    status: 'completed',
    score: '95/100'
  },
  {
    id: 'a2',
    title: 'CSS Styling Challenge',
    dueDate: '25th April, 2024',
    assignedDate: '10th April, 2024',
    estimatedTime: '3 hours',
    status: 'pending',
    score: null
  },
  {
    id: 'a3',
    title: 'JavaScript DOM Manipulation',
    dueDate: '10th May, 2024',
    assignedDate: '25th April, 2024',
    estimatedTime: '4 hours',
    status: 'pending',
    score: null
  },
  {
    id: 'a4',
    title: 'Build a React Component',
    dueDate: '20th May, 2024',
    assignedDate: '1st May, 2024',
    estimatedTime: '5 hours',
    status: 'not-started',
    score: null
  }
];

const AssignmentsTab = ({ courseId }: AssignmentsTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {ASSIGNMENTS.map((assignment) => (
          <Card key={assignment.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-1">
                <Badge
                  variant={
                    assignment.status === 'completed'
                      ? 'default'
                      : assignment.status === 'pending'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {assignment.status === 'completed'
                    ? 'Completed'
                    : assignment.status === 'pending'
                    ? 'In Progress'
                    : 'Not Started'}
                </Badge>
                {assignment.score && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {assignment.score}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl">{assignment.title}</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-sm">
                  <div className="text-muted-foreground mb-1">Due Date</div>
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {assignment.dueDate}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-muted-foreground mb-1">Assigned</div>
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {assignment.assignedDate}
                  </div>
                </div>
                <div className="text-sm col-span-2">
                  <div className="text-muted-foreground mb-1">Estimated Time</div>
                  <div className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    {assignment.estimatedTime}
                  </div>
                </div>
              </div>
              
              <Button className="w-full" variant={assignment.status === 'completed' ? 'outline' : 'default'}>
                {assignment.status === 'completed' ? 'View Submission' : 'Start Assignment'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsTab;
