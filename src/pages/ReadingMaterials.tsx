
import { useState } from 'react';
import { BookOpen, Clock, Download, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const MATERIALS = [
  {
    id: 'm1',
    title: 'Frontend - HTML',
    instructor: 'Joshua Jones',
    instructorAvatar: 'https://i.pravatar.cc/150?img=4',
    date: '10th April, 2024',
    pages: 35,
    duration: '30 mins',
    category: 'frontend',
    imageSrc: 'https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'm2',
    title: 'Frontend - CSS and JS',
    instructor: 'Joshua Jones',
    instructorAvatar: 'https://i.pravatar.cc/150?img=4',
    date: '17th April, 2024',
    pages: 50,
    duration: '1 hr 30 mins',
    category: 'frontend',
    imageSrc: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 'm3',
    title: 'Frontend - JavaScript',
    instructor: 'Joshua Jones',
    instructorAvatar: 'https://i.pravatar.cc/150?img=4',
    date: '18th May, 2024',
    pages: 45,
    duration: '50 mins',
    category: 'frontend',
    imageSrc: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'm4',
    title: 'Frontend - ReactJS',
    instructor: 'Joshua Jones',
    instructorAvatar: 'https://i.pravatar.cc/150?img=4',
    date: '10th May, 2024',
    pages: 60,
    duration: '1 hr',
    category: 'frontend',
    imageSrc: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'm5',
    title: 'Backend - Node.js Fundamentals',
    instructor: 'Sarah Miller',
    instructorAvatar: 'https://i.pravatar.cc/150?img=5',
    date: '21st May, 2024',
    pages: 55,
    duration: '1 hr 15 mins',
    category: 'backend',
    imageSrc: 'https://images.unsplash.com/photo-1576836165612-8bc9b07e7778?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'm6',
    title: 'Design Principles',
    instructor: 'Lisa Wong',
    instructorAvatar: 'https://i.pravatar.cc/150?img=9',
    date: '3rd June, 2024',
    pages: 38,
    duration: '45 mins',
    category: 'design',
    imageSrc: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop'
  },
];

const ReadingMaterials = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const filteredMaterials = activeCategory === 'all' 
    ? MATERIALS 
    : MATERIALS.filter(material => material.category === activeCategory);
  
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Reading Materials</h1>
          <p className="text-muted-foreground">Browse through our collection of reading materials</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>All</TabsTrigger>
              <TabsTrigger value="frontend" onClick={() => setActiveCategory('frontend')}>Frontend</TabsTrigger>
              <TabsTrigger value="backend" onClick={() => setActiveCategory('backend')}>Backend</TabsTrigger>
              <TabsTrigger value="design" onClick={() => setActiveCategory('design')}>Design</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <Separator className="mb-8" />
      
      <div className="grid gap-6">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-all duration-200">
            <div className="md:w-48 h-40 md:h-full overflow-hidden bg-muted">
              <img 
                src={material.imageSrc} 
                alt={material.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow flex flex-col justify-between p-5">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{material.title}</CardTitle>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {material.category.charAt(0).toUpperCase() + material.category.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 mt-2 mb-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-3.5 h-3.5 mr-1.5" />
                    <span>{material.instructor}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    <span>Published {material.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                    <span>{material.pages} pages</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    <span>Estimated Time: {material.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-auto">
                <Button variant="default" className="w-28">
                  Read Now
                </Button>
                <Button variant="outline" className="w-28">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReadingMaterials;
