
import { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Clock, Tag, FileText, BookmarkCheck, BookMarked, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Example blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Understanding the Basics of ISO 27001 Compliance",
    excerpt: "A comprehensive guide to navigating the complex requirements of ISO 27001 certification.",
    category: "Information Security",
    date: "April 8, 2025",
    readTime: "8 min",
    author: "Sarah Johnson",
    tags: ["ISO 27001", "Compliance", "Security"],
    featured: true,
  },
  {
    id: 2,
    title: "The Future of AI in Compliance Management",
    excerpt: "How artificial intelligence is revolutionizing the way companies approach regulatory compliance.",
    category: "AI Technology",
    date: "April 4, 2025",
    readTime: "6 min",
    author: "Michael Chen",
    tags: ["AI", "Future Tech", "Automation"],
    featured: true,
  },
  {
    id: 3,
    title: "GDPR Two Years Later: Lessons Learned",
    excerpt: "An in-depth analysis of how GDPR has changed data protection and what organizations can learn from implementation challenges.",
    category: "Data Privacy",
    date: "March 30, 2025",
    readTime: "10 min",
    author: "Emma Rodriguez",
    tags: ["GDPR", "Privacy", "Data Protection"],
    featured: false,
  },
  {
    id: 4,
    title: "Building a Culture of Compliance: Strategies for Leaders",
    excerpt: "Effective strategies for embedding compliance into your organizational culture and leading by example.",
    category: "Leadership",
    date: "March 25, 2025",
    readTime: "7 min",
    author: "David Walker",
    tags: ["Culture", "Leadership", "Strategy"],
    featured: false,
  },
  {
    id: 5,
    title: "Compliance Automation: Tools and Best Practices",
    excerpt: "A review of leading compliance automation tools and how to implement them effectively in your organization.",
    category: "Technology",
    date: "March 20, 2025",
    readTime: "9 min",
    author: "Jennifer Park",
    tags: ["Automation", "Tools", "Best Practices"],
    featured: false,
  },
];

// Example whitepapers data
const whitepapers = [
  {
    id: 1,
    title: "The Complete Guide to SOC 2 Compliance",
    description: "A comprehensive resource for organizations preparing for SOC 2 certification.",
    category: "Cybersecurity",
    date: "April 2025",
    pages: 42,
  },
  {
    id: 2,
    title: "Implementing ESG Compliance Frameworks",
    description: "Strategic approaches for integrating environmental, social, and governance compliance.",
    category: "ESG",
    date: "March 2025",
    pages: 36,
  },
  {
    id: 3,
    title: "Navigating Financial Compliance in 2025",
    description: "Updates and strategies for staying compliant with evolving financial regulations.",
    category: "Finance",
    date: "February 2025",
    pages: 28,
  },
];

// Example webinars data
const webinars = [
  {
    id: 1,
    title: "NIS II Directive: What You Need to Know",
    description: "An expert panel discusses the implications of the NIS II directive for businesses.",
    date: "April 15, 2025",
    time: "11:00 AM EST",
    duration: "60 min",
    speakers: ["Dr. Lisa Chen", "Mark Williams", "Prof. Anna Kowalski"],
    upcoming: true,
  },
  {
    id: 2,
    title: "AI Compliance Officer: Implementation Best Practices",
    description: "Learn how to effectively deploy and utilize AI for compliance management.",
    date: "April 22, 2025",
    time: "2:00 PM EST",
    duration: "45 min",
    speakers: ["James Peterson", "Dr. Sarah Martinez"],
    upcoming: true,
  },
  {
    id: 3,
    title: "Integrating Compliance Across Departments",
    description: "Strategies for creating seamless compliance workflows across your organization.",
    date: "March 18, 2025",
    time: "10:00 AM EST",
    duration: "60 min",
    speakers: ["Robert Johnson", "Sophia Lin", "Michael Torres"],
    upcoming: false,
    recording: true,
  },
];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", "Information Security", "AI Technology", "Data Privacy", "Leadership", "Technology"];
  
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);
  
  return (
    <PageTemplate
      title="Resources"
      description="Access guides, whitepapers, webinars, and more to help you navigate the complex world of compliance."
    >
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Blog</span>
            </TabsTrigger>
            <TabsTrigger value="whitepapers" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Whitepapers</span>
            </TabsTrigger>
            <TabsTrigger value="webinars" className="flex items-center gap-2">
              <BookmarkCheck className="h-4 w-4" />
              <span>Webinars</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Blog Tab Content */}
          <TabsContent value="blog" className="mt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Main Content */}
              <div className="w-full md:w-3/4">
                {/* Category filter */}
                <div className="mb-6 overflow-x-auto">
                  <div className="flex space-x-2 pb-2">
                    {categories.map(category => (
                      <Badge 
                        key={category} 
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Featured Posts */}
                {selectedCategory === "All" && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Featured Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {blogPosts.filter(post => post.featured).map(post => (
                        <Card key={post.id} className="card-hover">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <Badge className="mb-2">{post.category}</Badge>
                              <div className="flex items-center text-sm text-slate-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{post.date}</span>
                              </div>
                            </div>
                            <CardTitle className="text-xl">{post.title}</CardTitle>
                            <CardDescription>{post.excerpt}</CardDescription>
                          </CardHeader>
                          <CardFooter className="flex justify-between items-center text-sm text-slate-500">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{post.readTime}</span>
                            </div>
                            <Link to={`/resources/blog/${post.id}`} className="text-primary hover:underline">
                              Read more
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* All Posts / Filtered Posts */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
                  </h2>
                  <div className="space-y-6">
                    {filteredPosts.map(post => (
                      <Card key={post.id} className="card-hover">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <Badge className="mb-2">{post.category}</Badge>
                            <div className="flex items-center text-sm text-slate-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{post.date}</span>
                            </div>
                          </div>
                          <CardTitle>{post.title}</CardTitle>
                          <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="bg-slate-100">
                                <Tag className="h-3 w-3 mr-1" /> {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-slate-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                          <Link to={`/resources/blog/${post.id}`} className="text-primary hover:underline">
                            Read more
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="w-full md:w-1/4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-slate-100">ISO 27001</Badge>
                      <Badge variant="secondary" className="bg-slate-100">GDPR</Badge>
                      <Badge variant="secondary" className="bg-slate-100">AI Compliance</Badge>
                      <Badge variant="secondary" className="bg-slate-100">Risk Assessment</Badge>
                      <Badge variant="secondary" className="bg-slate-100">ESG</Badge>
                      <Badge variant="secondary" className="bg-slate-100">Cybersecurity</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Subscribe to Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 mb-4">
                      Get the latest compliance insights delivered to your inbox.
                    </p>
                    <form className="space-y-2">
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                      />
                      <Button className="w-full" size="sm">Subscribe</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Whitepapers Tab Content */}
          <TabsContent value="whitepapers" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whitepapers.map(paper => (
                <Card key={paper.id} className="card-hover">
                  <CardHeader>
                    <Badge className="mb-2">{paper.category}</Badge>
                    <CardTitle className="text-xl">{paper.title}</CardTitle>
                    <CardDescription className="mt-2">{paper.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{paper.date}</span>
                      </div>
                      <div>
                        <span>{paper.pages} pages</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" /> Download Whitepaper
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Webinars Tab Content */}
          <TabsContent value="webinars" className="mt-6">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Upcoming Webinars</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {webinars.filter(webinar => webinar.upcoming).map(webinar => (
                    <Card key={webinar.id} className="card-hover">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge variant="default" className="bg-primary">Upcoming</Badge>
                          <div className="flex items-center text-sm text-slate-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{webinar.date}</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl">{webinar.title}</CardTitle>
                        <CardDescription className="mt-2">{webinar.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">Time:</span>
                            <span>{webinar.time}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">Duration:</span>
                            <span>{webinar.duration}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Speakers:</span>
                            <div className="mt-1">
                              {webinar.speakers.map((speaker, index) => (
                                <div key={index}>{speaker}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Register Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-2xl font-bold mb-4">On-Demand Webinars</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {webinars.filter(webinar => !webinar.upcoming && webinar.recording).map(webinar => (
                    <Card key={webinar.id} className="card-hover">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge variant="outline">Recorded</Badge>
                          <div className="flex items-center text-sm text-slate-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{webinar.date}</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl">{webinar.title}</CardTitle>
                        <CardDescription className="mt-2">{webinar.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">Duration:</span>
                            <span>{webinar.duration}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Speakers:</span>
                            <div className="mt-1">
                              {webinar.speakers.map((speaker, index) => (
                                <div key={index}>{speaker}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Watch Recording</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default Resources;
