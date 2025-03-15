
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Grid, List, Plus, PenTool, Eye, Award, ExternalLink, Calendar, Heart } from 'lucide-react';

const PortfolioTab: React.FC = () => {
  const [portfolioView, setPortfolioView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm bg-gray-900 text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Portfolio Projects</CardTitle>
              <CardDescription className="text-gray-400">
                Showcase your work and highlight your best projects
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 w-8 p-0 ${portfolioView === 'grid' ? 'text-mixip-blue bg-blue-900/30' : 'text-gray-400'}`}
                onClick={() => setPortfolioView('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 w-8 p-0 ${portfolioView === 'list' ? 'text-mixip-blue bg-blue-900/30' : 'text-gray-400'}`}
                onClick={() => setPortfolioView('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Separator className="bg-gray-800" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-sm bg-gray-800 border-gray-700 text-white">
                All Projects
              </Button>
              <Button variant="ghost" size="sm" className="text-sm text-gray-400 hover:text-white">
                Active
              </Button>
              <Button variant="ghost" size="sm" className="text-sm text-gray-400 hover:text-white">
                Archived
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          {portfolioView === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-lg overflow-hidden group shadow-md bg-gray-800 border border-gray-700">
                <div className="aspect-video bg-gray-700 relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/14b17f87-e506-457b-b992-763644cf9daf.png" 
                    alt="Commercial project"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">
                      <PenTool className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-mixip-blue">
                    <Award className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
                <div className="p-3 bg-gray-800">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white flex items-center">
                        Commercial Project
                        <Badge variant="outline" className="ml-2 bg-green-900/40 text-green-400 border-green-600">
                          Verified
                        </Badge>
                      </h4>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        June 2023
                        <Separator orientation="vertical" className="h-3 mx-1 bg-gray-700" />
                        <Heart className="h-3 w-3" />
                        24
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden group shadow-md bg-gray-800 border border-gray-700">
                <div className="aspect-video bg-gray-700 relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/d9035047-8ceb-4e65-b080-7fc1f99ceb41.png" 
                    alt="Documentary film"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">
                      <PenTool className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
                <div className="p-3 bg-gray-800">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white">Documentary Film</h4>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        April 2023
                        <Separator orientation="vertical" className="h-3 mx-1 bg-gray-700" />
                        <Heart className="h-3 w-3" />
                        42
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden border-dashed flex flex-col items-center justify-center p-8 text-center h-full min-h-[240px] bg-gray-800 border-gray-700">
                <Plus className="h-8 w-8 mb-2 text-gray-400" />
                <h4 className="font-medium mb-1 text-white">Add New Project</h4>
                <p className="text-sm text-gray-400 mb-4">Showcase your work</p>
                <Button>Create Project</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
                <div className="p-4 flex items-start gap-4">
                  <div className="w-24 h-16 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                    <img 
                      src="/lovable-uploads/14b17f87-e506-457b-b992-763644cf9daf.png" 
                      alt="Commercial project"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-white flex items-center">
                        Commercial Project
                        <Badge variant="outline" className="ml-2 bg-green-900/40 text-green-400 border-green-600">
                          Verified
                        </Badge>
                        <Badge className="ml-2 bg-mixip-blue">Featured</Badge>
                      </h4>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                          <PenTool className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Client: Brand Name</p>
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        June 2023
                      </span>
                      <Separator orientation="vertical" className="h-3 mx-2 bg-gray-700" />
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        24 likes
                      </span>
                      <Separator orientation="vertical" className="h-3 mx-2 bg-gray-700" />
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        142 views
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
                <div className="p-4 flex items-start gap-4">
                  <div className="w-24 h-16 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                    <img 
                      src="/lovable-uploads/d9035047-8ceb-4e65-b080-7fc1f99ceb41.png" 
                      alt="Documentary film"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-white">Documentary Film</h4>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                          <PenTool className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Personal Project</p>
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        April 2023
                      </span>
                      <Separator orientation="vertical" className="h-3 mx-2 bg-gray-700" />
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        42 likes
                      </span>
                      <Separator orientation="vertical" className="h-3 mx-2 bg-gray-700" />
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        287 views
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-dashed rounded-lg p-4 flex items-center justify-center bg-gray-800 border-gray-700">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Project
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioTab;
