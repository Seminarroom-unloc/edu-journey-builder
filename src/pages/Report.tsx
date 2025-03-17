
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileChartLine, 
  Award, 
  GraduationCap, 
  ChartBar 
} from "lucide-react";

const Report = () => {
  // Sample student performance data
  const performanceData = {
    overallGrade: "A-",
    completionRate: "87%",
    averageScore: "84%",
    participation: "92%",
    strengths: ["Problem Solving", "Critical Thinking", "Research Skills"],
    areasToImprove: ["Time Management", "Group Participation"],
    coursePerformance: [
      { course: "Data Science Fundamentals", grade: "A", completionRate: "95%" },
      { course: "Web Development Masterclass", grade: "B+", completionRate: "82%" },
      { course: "Database Systems", grade: "A-", completionRate: "88%" },
      { course: "UX/UI Design Principles", grade: "B", completionRate: "79%" },
      { course: "Computer Science Basics", grade: "A", completionRate: "93%" }
    ]
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Student Performance Report</h1>
        <p className="text-muted-foreground">A comprehensive overview of your academic performance across all courses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="border border-muted/20">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <FileChartLine className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Overall Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Overall Grade</p>
                <p className="text-3xl font-bold text-primary mt-1">{performanceData.overallGrade}</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-3xl font-bold text-primary mt-1">{performanceData.completionRate}</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-3xl font-bold text-primary mt-1">{performanceData.averageScore}</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Participation</p>
                <p className="text-3xl font-bold text-primary mt-1">{performanceData.participation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-muted/20">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Skills Assessment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Strengths</h3>
                <div className="flex flex-wrap gap-2">
                  {performanceData.strengths.map((strength, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Areas to Improve</h3>
                <div className="flex flex-wrap gap-2">
                  {performanceData.areasToImprove.map((area, index) => (
                    <span key={index} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-muted/20 mb-8">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Course Performance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Course</th>
                  <th className="text-left py-3 px-4">Grade</th>
                  <th className="text-left py-3 px-4">Completion</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.coursePerformance.map((course, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-muted/10" : ""}>
                    <td className="py-3 px-4">{course.course}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        course.grade.startsWith('A') 
                          ? 'text-green-600' 
                          : course.grade.startsWith('B') 
                            ? 'text-blue-600' 
                            : 'text-amber-600'
                      }`}>
                        {course.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4">{course.completionRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-muted/20">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <ChartBar className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Instructor Feedback</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/10 p-4 rounded-lg">
            <p className="italic text-muted-foreground">
              "This student demonstrates excellent analytical skills and consistently produces high-quality work. 
              They engage well with course materials and contribute thoughtfully to discussions.
              To improve further, focus on developing stronger time management skills and increasing
              participation in group activities."
            </p>
            <p className="mt-3 text-sm font-medium">- Prof. Sarah Johnson, Academic Advisor</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
