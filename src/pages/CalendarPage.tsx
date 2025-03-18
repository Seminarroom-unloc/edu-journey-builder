
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { SessionDetailsDialog } from "@/components/SessionDetailsDialog";
import { CalendarEvent } from "@/types/calendar";

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  // Mock calendar events
  const events: CalendarEvent[] = [
    {
      id: "1",
      name: "Introduction to Python",
      date: new Date(2024, 6, 10, 10, 0),
      endDate: new Date(2024, 6, 10, 12, 0),
      type: "course",
      description: "Learn the basics of Python programming. This is a beginner-friendly session covering variables, data types, and basic control structures.",
      instructor: "Dr. Sarah Brown",
      location: "Virtual Classroom 3A",
      tags: ["Programming", "Beginner"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    },
    {
      id: "2",
      name: "Data Science Fundamentals Quiz",
      date: new Date(2024, 6, 15, 14, 0),
      endDate: new Date(2024, 6, 15, 15, 30),
      type: "quiz",
      description: "A quiz to test your understanding of data science fundamentals including statistics, data visualization, and basic machine learning concepts.",
      instructor: "Prof. James Wilson",
      location: "Online",
      tags: ["Data Science", "Assessment"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    },
    {
      id: "3",
      name: "Live Coding Challenge: Algorithms",
      date: new Date(2024, 6, 20, 16, 0),
      endDate: new Date(2024, 6, 20, 18, 0),
      type: "challenge",
      description: "Join us for a live coding challenge focusing on algorithms and data structures. This is a competitive event with prizes for the top performers.",
      instructor: "Alex Chen",
      location: "Virtual Lab 2",
      tags: ["Algorithms", "Competition"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    },
    {
      id: "4",
      name: "Web Development Workshop",
      date: new Date(2024, 6, 12, 13, 0),
      endDate: new Date(2024, 6, 12, 15, 0),
      type: "course",
      description: "A hands-on workshop on modern web development practices using React and Node.js.",
      instructor: "Emily Johnson",
      location: "Virtual Classroom 1B",
      tags: ["Web Development", "React"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    },
    {
      id: "5",
      name: "Database Systems Quiz",
      date: new Date(2024, 6, 18, 11, 0),
      endDate: new Date(2024, 6, 18, 12, 30),
      type: "quiz",
      description: "Test your knowledge of database design, SQL queries, and database management systems.",
      instructor: "Dr. Michael Lee",
      location: "Online",
      tags: ["Databases", "SQL"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    }
  ];

  // Find events for the current month
  const currentMonthEvents = events.filter(event => 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );

  // Handle event click
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  // Render event indicators for the calendar
  const renderEventIndicators = (day: Date) => {
    const dayEvents = events.filter(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );

    if (dayEvents.length === 0) return null;

    return (
      <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
        {dayEvents.slice(0, 3).map((event, index) => (
          <div 
            key={index}
            className={`h-1.5 w-1.5 rounded-full ${
              event.type === 'course' ? 'bg-blue-500' : 
              event.type === 'quiz' ? 'bg-amber-500' : 
              'bg-green-500'
            }`}
          />
        ))}
        {dayEvents.length > 3 && (
          <div className="text-xs text-muted-foreground">+{dayEvents.length - 3}</div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Calendar</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar View */}
        <div className="flex-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">{format(date, 'MMMM yyyy')}</h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              
              <Calendar
                mode="default"
                className="rounded-md border"
                onMonthChange={setDate}
                components={{
                  DayContent: (props) => {
                    return (
                      <div className="relative h-9 w-9 p-0 font-normal aria-selected:opacity-100">
                        <div>{props.day.getDate()}</div>
                        {renderEventIndicators(props.day)}
                      </div>
                    );
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Events List */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-medium mb-4">Events This Month</h2>
              <div className="space-y-4">
                {currentMonthEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="p-3 rounded-md border cursor-pointer transition-colors hover:bg-muted/50"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`h-3 w-3 rounded-full ${
                        event.type === 'course' ? 'bg-blue-500' : 
                        event.type === 'quiz' ? 'bg-amber-500' : 
                        'bg-green-500'
                      }`} />
                      <p className="font-medium">{event.name}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(event.date, 'EEEE, MMMM d • h:mm a')}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {event.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-muted px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {currentMonthEvents.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No events this month</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Session Details Dialog */}
      {selectedEvent && (
        <SessionDetailsDialog 
          event={selectedEvent} 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen} 
        />
      )}
    </div>
  );
};

export default CalendarPage;
