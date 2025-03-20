
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourseHeader from '@/components/course/CourseHeader';
import CourseContentTabs from '@/components/course/CourseContentTabs';
import { COURSE } from '@/data/courseData';

const Course = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { id } = useParams();
  
  // In a real app, this would fetch the course based on the ID
  // For now, we're using mock data
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <CourseHeader course={COURSE} />
      <CourseContentTabs courseId={COURSE.id} />
    </div>
  );
};

export default Course;
