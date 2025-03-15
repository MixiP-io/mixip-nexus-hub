
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, LayoutGrid, List, Eye, Pencil, Trash, MoreHorizontal, Image, FolderOpen } from 'lucide-react';
import { getProjects } from '../batch-uploader/utils/projectUtils';
import SectionHeader from '../SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CreateProjectDialog from './CreateProjectDialog';

interface ProjectGridProps {
  onProjectSelect: (projectId: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ onProjectSelect }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const projectsData = getProjects();
    setProjects(projectsData);
  };

  const handleCreateProject = (name: string) => {
    // Project creation is handled in the dialog component
    // After creation, we reload the projects
    loadProjects();
    setCreateProjectOpen(false);
  };

  const handleProjectClick = (projectId: string) => {
    onProjectSelect(projectId);
    navigate(`/dashboard/workspace?tab=assets&project=${projectId}`);
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real implementation, this would call an API to delete the project
    console.log(`Delete project: ${projectId}`);
    // Then reload projects
    loadProjects();
  };

  const handleEditProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real implementation, this would open a project edit dialog
    console.log(`Edit project: ${projectId}`);
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header with search and actions */}
      <div className="mb-6">
        <SectionHeader 
          title="Projects" 
          description="Organize and manage your creative projects"
        />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-gray-700' : ''}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-gray-700' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setCreateProjectOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="cleared">Rights Cleared</TabsTrigger>
          <TabsTrigger value="pending">Rights Pending</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Project Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map(project => (
            <Card 
              key={project.id} 
              className="bg-gray-800 border-gray-700 overflow-hidden hover:ring-2 hover:ring-green-600 transition-all cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="h-40 bg-gray-700 relative">
                {project.assets && project.assets.length > 0 && project.assets[0].preview ? (
                  <img 
                    src={project.assets[0].preview} 
                    alt={project.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderOpen className="w-16 h-16 text-gray-500" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="bg-gray-800/70 hover:bg-gray-700">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-800 border-gray-700">
                      <DropdownMenuItem onClick={(e) => handleEditProject(project.id, e as React.MouseEvent)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => handleDeleteProject(project.id, e as React.MouseEvent)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-400">
                      {project.assets ? project.assets.length : 0} assets • Updated {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-4 py-3 border-t border-gray-700 flex justify-between">
                <Badge variant="outline" className="bg-gray-700 text-gray-300">
                  <Image className="mr-1 h-3 w-3" />
                  {project.assets ? project.assets.length : 0}
                </Badge>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Eye className="mr-1 h-3 w-3" />
                  View
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {/* Create New Project Card */}
          <Card 
            className="bg-gray-800 border-gray-700 border-dashed hover:border-green-600 overflow-hidden cursor-pointer flex flex-col justify-center items-center h-full min-h-[240px]"
            onClick={() => setCreateProjectOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-lg mb-1">Create New Project</h3>
              <p className="text-sm text-gray-400">
                Start organizing your assets
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        // List View
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900 border-b border-gray-700">
              <tr>
                <th className="text-left p-4 font-medium text-gray-400">Name</th>
                <th className="text-left p-4 font-medium text-gray-400">Assets</th>
                <th className="text-left p-4 font-medium text-gray-400">Last Updated</th>
                <th className="text-left p-4 font-medium text-gray-400">Rights Status</th>
                <th className="text-right p-4 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(project => (
                <tr 
                  key={project.id} 
                  className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <FolderOpen className="mr-3 h-5 w-5 text-gray-400" />
                      <span>{project.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{project.assets ? project.assets.length : 0}</td>
                  <td className="p-4">{new Date(project.updatedAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <Badge className="bg-yellow-600 hover:bg-yellow-700">Needs Review</Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="mr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project.id);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="mr-2"
                      onClick={(e) => handleEditProject(project.id, e)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => handleDeleteProject(project.id, e)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateProjectDialog
        isOpen={createProjectOpen}
        setIsOpen={setCreateProjectOpen}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default ProjectGrid;
