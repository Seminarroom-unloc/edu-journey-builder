
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Download, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const MATERIALS = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'An introduction to React components, props, and state management.',
    category: 'Web Development',
    course: 'Introduction to React Development',
    type: 'pdf',
    size: '2.4 MB',
    date: '2023-05-15',
  },
  {
    id: '2',
    title: 'JavaScript Design Patterns',
    description: 'Common patterns used in modern JavaScript application development.',
    category: 'Web Development',
    course: 'Advanced JavaScript Patterns',
    type: 'pdf',
    size: '3.1 MB',
    date: '2023-05-12',
  },
  {
    id: '3',
    title: 'UX Research Methods',
    description: 'A comprehensive guide to user experience research methodologies.',
    category: 'Design',
    course: 'UI/UX Design Principles',
    type: 'pdf',
    size: '4.2 MB',
    date: '2023-05-10',
  },
  {
    id: '4',
    title: 'RESTful API Best Practices',
    description: 'Guidelines for designing robust and scalable REST APIs.',
    category: 'Backend Development',
    course: 'Building RESTful APIs with Node.js',
    type: 'pdf',
    size: '1.8 MB',
    date: '2023-05-08',
  },
  {
    id: '5',
    title: 'Introduction to D3.js',
    description: 'Getting started with data visualization using D3.js.',
    category: 'Data Visualization',
    course: 'Data Visualization with D3.js',
    type: 'pdf',
    size: '3.5 MB',
    date: '2023-05-05',
  },
  {
    id: '6',
    title: 'React Hooks in Depth',
    description: 'Deep dive into React hooks and their applications.',
    category: 'Web Development',
    course: 'Introduction to React Development',
    type: 'pdf',
    size: '2.9 MB',
    date: '2023-05-03',
  },
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const ReadingMaterials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredMaterials = MATERIALS.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          material.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || material.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = ['all', ...Array.from(new Set(MATERIALS.map(m => m.category.toLowerCase())))];
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      <section className="pt-28 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Reading Materials</h1>
            <p className="text-muted-foreground text-lg">
              Access study materials and resources for your courses
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search reading materials..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList>
                {categories.map(category => (
                  <TabsTrigger key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMaterials.map((material) => (
              <Card key={material.id} className="animate-fade-in overflow-hidden group">
                <CardHeader className="p-4 md:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-0">
                      {material.type.toUpperCase()}
                    </Badge>
                    <CardDescription>{formatDate(material.date)}</CardDescription>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{material.title}</CardTitle>
                  <CardDescription>{material.course}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                  <p className="text-muted-foreground">{material.description}</p>
                </CardContent>
                <CardFooter className="p-4 md:p-6 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center text-muted-foreground">
                    <FileText className="w-4 h-4 mr-2" />
                    <span className="text-sm">{material.size}</span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredMaterials.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No materials found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                We couldn't find any reading materials matching your search criteria. Try adjusting your search or browse all materials.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReadingMaterials;
