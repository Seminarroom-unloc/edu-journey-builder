
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, BookOpen, Clock, ArrowRight, Award, Users, Compass, Layout, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Session card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    }
  })
};

// Category card animation variants
const categoryVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      type: "spring",
      stiffness: 100
    }
  })
};

// Hero section animation variants
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const SESSIONS = [
  {
    id: "1",
    title: "Thriving in the Age of Technology",
    instructor: "Joshua Jones",
    time: "25 Apr, 7:00pm",
    details: ["Digital", "Online", "Remote"],
    description: "Learn essential tech skills for the modern workplace. Navigate digital transformation with confidence and stay ahead of industry trends.",
    badge: { label: "HOT", color: "bg-pink-500 text-white" },
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800"
  },
  {
    id: "2",
    title: "Unlocking Financial Abundance",
    instructor: "Kimberly Mastrangelo",
    time: "26 Apr, 7:00pm",
    details: ["Finance", "Online", "Beginner"],
    description: "Master fundamental financial principles that create lasting wealth. Develop strategies for investments, savings, and passive income.",
    badge: { label: "Special", color: "bg-amber-500 text-black" },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800"
  },
  {
    id: "3",
    title: "Building a Business Empire",
    instructor: "James Hall",
    time: "27 Apr, 7:00pm",
    details: ["Business", "Entrepreneurship", "Strategy"],
    description: "Learn proven methods to scale your business from startup to enterprise. Develop leadership skills that inspire teams and drive growth.",
    badge: { label: "HOT", color: "bg-pink-500 text-white" },
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800"
  },
  {
    id: "4",
    title: "Central Operations Specialist",
    instructor: "Rodger Struck",
    time: "28 Apr, 7:00pm",
    details: ["Operations", "Management", "Leadership"],
    description: "Master organizational systems that streamline complex operations. Learn to optimize workflows and maximize efficiency across teams.",
    badge: { label: "Bestseller", color: "bg-amber-500 text-black" },
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800"
  },
  {
    id: "5",
    title: "Techniques for Closing Deals",
    instructor: "Bradley Lawler",
    time: "29 Apr, 7:00pm",
    details: ["Sales", "Negotiation", "Communication"],
    description: "Master persuasive communication strategies that convert prospects into clients. Build lasting relationships through authentic sales techniques.",
    badge: { label: "Bestseller", color: "bg-amber-500 text-black" },
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=800"
  },
  {
    id: "6",
    title: "Mapping the Path to Achievement",
    instructor: "Stephanie Nicol",
    time: "30 Apr, 7:00pm",
    details: ["Personal Growth", "Goal Setting", "Productivity"],
    description: "Learn effective goal-setting frameworks that turn ambitions into accomplishments. Create actionable plans that navigate obstacles with confidence.",
    badge: { label: "HOT", color: "bg-pink-500 text-white" },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800"
  }
];

// Categories with icons
const CATEGORIES = [
  { name: 'Web Development', count: 42, icon: <Code className="w-6 h-6" /> },
  { name: 'Data Science', count: 18, icon: <Layout className="w-6 h-6" /> },
  { name: 'Business', count: 24, icon: <Users className="w-6 h-6" /> },
  { name: 'UI/UX Design', count: 16, icon: <Compass className="w-6 h-6" /> },
  { name: 'Machine Learning', count: 12, icon: <BookOpen className="w-6 h-6" /> },
  { name: 'Leadership', count: 9, icon: <Award className="w-6 h-6" /> },
];

const Explore = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Filter sessions based on search and tab
  const filteredSessions = SESSIONS.filter(session => {
    const matchesSearch = 
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      session.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "featured") return matchesSearch && session.badge?.label === "HOT";
    if (activeTab === "popular") return matchesSearch && session.badge?.label === "Bestseller";
    if (activeTab === "new") return matchesSearch && session.time.includes("30 Apr");
    
    return matchesSearch;
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Show toast feedback when changing tabs
    if (value === "featured") toast.info("Showing featured courses");
    if (value === "popular") toast.info("Showing popular courses");
    if (value === "new") toast.info("Showing new courses");
    if (value === "all") toast.info("Showing all courses");
  };
  
  useEffect(() => {
    // Automatic scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:px-6">
        <motion.div 
          className="container mx-auto max-w-6xl"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.div 
                variants={textVariants} 
                className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                Expand your knowledge with expert-led courses
              </motion.div>
              
              <motion.h1 
                variants={textVariants} 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                Discover <span className="text-primary">Trending</span> Courses & Sessions
              </motion.h1>
              
              <motion.p 
                variants={textVariants} 
                className="text-lg text-muted-foreground"
              >
                Explore our curated collection of courses and live sessions designed to help you achieve your learning goals.
              </motion.p>
              
              <motion.div variants={textVariants} className="flex gap-4 pt-2">
                <Button size="lg" className="gap-2">
                  Browse All Courses
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              variants={textVariants}
              className="relative aspect-video rounded-xl overflow-hidden shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200" 
                alt="Students learning" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category, index) => (
              <motion.div 
                key={category.name}
                className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/40 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
                variants={categoryVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
                  {category.icon}
                </div>
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} courses</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Explore Section */}
      <section className="py-12 px-4 md:px-6 pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-3xl font-bold">Trending Sessions</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search sessions..." 
                    className="w-[200px] md:w-[300px] pl-9 rounded-full bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-1"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="hidden md:flex">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="new">New</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex space-x-1">
                  <Button
                    variant="outline" 
                    size="icon"
                    className={viewType === "list" ? "bg-muted" : ""}
                    onClick={() => setViewType("list")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className={viewType === "grid" ? "bg-muted" : ""}
                    onClick={() => setViewType("grid")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4 mb-6">
              <p className="text-muted-foreground text-center max-w-2xl mx-auto">
                Discover the most popular courses and sessions chosen by our community. 
                Enhance your skills with expert-led content.
              </p>
            </div>

            {filteredSessions.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium">No courses found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className={viewType === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                {filteredSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    onHoverStart={() => setHoveredCard(session.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    whileHover={{ y: -5 }}
                  >
                    <Card className={`overflow-hidden ${hoveredCard === session.id ? 'shadow-lg ring-1 ring-primary/20' : 'shadow'} transition-all duration-300`}>
                      <CardContent className="p-0">
                        <div className={`flex ${viewType === "grid" ? "flex-col" : "flex-row"}`}>
                          <div className={`${viewType === "grid" ? "w-full h-48" : "w-36 h-36 md:w-48 md:h-48"} overflow-hidden bg-gray-200 relative`}>
                            <img 
                              src={session.image}
                              alt={session.instructor} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            {hoveredCard === session.id && (
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <Button variant="secondary" className="bg-white/90 text-black hover:bg-white">
                                  Quick View
                                </Button>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col p-5 flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-semibold">{session.title}</h3>
                              {session.badge && (
                                <Badge className={session.badge.color}>
                                  {session.badge.label}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm font-medium">{session.instructor}</p>

                            <div className="flex flex-wrap gap-2 my-3">
                              {session.details.map((detail, index) => (
                                <div key={index} className="flex items-center text-xs text-muted-foreground">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="1"></circle></svg>
                                  {detail}
                                </div>
                              ))}
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="w-3.5 h-3.5 mr-1" />
                                {session.time}
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                              {session.description}
                            </p>

                            <div className="mt-auto">
                              <Link to={`/course/${session.id}`}>
                                <Button className="w-full group">
                                  Explore
                                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
