
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, LayoutGrid, List, Plus, SlidersHorizontal, Eye, Download, Trash, Share2, Tag, MoreHorizontal, User, MapPin } from 'lucide-react';
import { getProjectById } from '../batch-uploader/utils/projectUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import RightsManagementPanel from './RightsManagementPanel';

interface AssetsManagerProps {
  selectedProjectId: string | null;
}

const AssetsManager: React.FC<AssetsManagerProps> = ({ selectedProjectId }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [projectData, setProjectData] = useState<any | null>(null);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [rightsPanelOpen, setRightsPanelOpen] = useState(false);
  const [selectedAssetForRights, setSelectedAssetForRights] = useState<string | null>(null);
  
  useEffect(() => {
    if (selectedProjectId) {
      const project = getProjectById(selectedProjectId);
      setProjectData(project || null);
    } else {
      // If no project is selected, show all assets from all projects
      // In a real implementation, this would fetch all assets
      const allProjects = [] as any[];
      setProjectData({
        name: 'All Assets',
        assets: allProjects.flatMap(p => p.assets || [])
      });
    }
  }, [selectedProjectId]);

  const handleAssetClick = (assetId: string, e: React.MouseEvent) => {
    // Check if shift key is pressed for multiple selection
    if (e.shiftKey) {
      setSelectedAssets(prev => {
        if (prev.includes(assetId)) {
          return prev.filter(id => id !== assetId);
        } else {
          return [...prev, assetId];
        }
      });
    } else {
      // Single asset selection
      setSelectedAssets([assetId]);
    }
  };

  const handleSelectAll = () => {
    if (projectData?.assets?.length > 0) {
      if (selectedAssets.length === projectData.assets.length) {
        // Deselect all if all are selected
        setSelectedAssets([]);
      } else {
        // Select all
        setSelectedAssets(projectData.assets.map((asset: any) => asset.id));
      }
    }
  };

  const handleBatchUpload = () => {
    navigate('/dashboard/workspace?tab=uploader');
  };

  const handleOpenRightsPanel = (assetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAssetForRights(assetId);
    setRightsPanelOpen(true);
  };

  const handleBatchRights = () => {
    if (selectedAssets.length === 0) {
      toast.error('Please select at least one asset to manage rights');
      return;
    }
    
    setRightsPanelOpen(true);
  };

  const filteredAssets = projectData?.assets?.filter((asset: any) => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (!projectData) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-96">
        <div className="text-center">
          <h3 className="text-xl font-medium mb-2">No Project Selected</h3>
          <p className="text-gray-400 mb-4">Please select a project to view its assets</p>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => navigate('/dashboard/workspace?tab=projects')}
          >
            Go to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header with search and actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold">{projectData.name}</h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search assets..."
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
          <Button 
            variant="outline"
            className="border-gray-700"
            onClick={handleBatchRights}
          >
            <User className="mr-2 h-4 w-4" />
            Manage Rights
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={handleBatchUpload}>
            <Plus className="mr-2 h-4 w-4" />
            Add Assets
          </Button>
        </div>
      </div>

      {/* Filter tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Assets</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="rights-cleared">Rights Cleared</TabsTrigger>
          <TabsTrigger value="rights-pending">Rights Pending</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Assets display */}
      {filteredAssets.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">No Assets Found</h3>
          <p className="text-gray-400 mb-4">This project doesn't have any assets yet.</p>
          <Button className="bg-green-600 hover:bg-green-700" onClick={handleBatchUpload}>
            Upload Assets
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="space-y-4">
          {/* Batch actions for selected items */}
          {selectedAssets.length > 0 && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex items-center justify-between mb-4">
              <div className="ml-2 text-sm">
                <span className="mr-2">{selectedAssets.length} assets selected</span>
                <Button variant="link" onClick={handleSelectAll} className="text-sm p-0 h-auto">
                  {selectedAssets.length === filteredAssets.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gray-700">
                  <Download className="mr-1 h-3 w-3" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700">
                  <Share2 className="mr-1 h-3 w-3" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700">
                  <Tag className="mr-1 h-3 w-3" />
                  Tag
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700" onClick={handleBatchRights}>
                  <User className="mr-1 h-3 w-3" />
                  Rights
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash className="mr-1 h-3 w-3" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Grid View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredAssets.map((asset: any) => (
              <Card 
                key={asset.id} 
                className={`bg-gray-800 border-gray-700 overflow-hidden cursor-pointer hover:bg-gray-750 transition-all ${
                  selectedAssets.includes(asset.id) ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={(e) => handleAssetClick(asset.id, e as React.MouseEvent)}
              >
                <div className="relative h-40 bg-gray-700">
                  {asset.preview ? (
                    <img 
                      src={asset.preview} 
                      alt={asset.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-gray-500 text-xs uppercase">{asset.type.split('/')[1]}</div>
                    </div>
                  )}
                  
                  {/* Rights status indicators */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge 
                            variant="outline" 
                            className="bg-gray-800/80 hover:bg-gray-700 border-none cursor-pointer"
                            onClick={(e) => handleOpenRightsPanel(asset.id, e as React.MouseEvent)}
                          >
                            <User className="mr-1 h-3 w-3 text-yellow-400" />
                            <span className="text-yellow-400">2</span>
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700">
                          <p>2 faces need rights clearance</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge 
                            variant="outline" 
                            className="bg-gray-800/80 hover:bg-gray-700 border-none cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info('Location rights management coming soon');
                            }}
                          >
                            <MapPin className="mr-1 h-3 w-3 text-blue-400" />
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700">
                          <p>Location rights needed</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  {/* Actions menu */}
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="bg-gray-800/70 hover:bg-gray-700 h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => handleOpenRightsPanel(asset.id, e as React.MouseEvent)}>
                          <User className="mr-2 h-4 w-4" />
                          Manage Rights
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-red-500">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="truncate text-sm font-medium">{asset.name}</div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-400">{(asset.size / 1024).toFixed(0)} KB</span>
                    <Badge variant="outline" className="text-xs">
                      {asset.type.split('/')[0]}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        // List View
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900 border-b border-gray-700">
              <tr>
                <th className="p-4 text-left font-medium text-gray-400 w-12">
                  <input 
                    type="checkbox" 
                    className="rounded bg-gray-700 border-gray-600"
                    checked={selectedAssets.length === filteredAssets.length && filteredAssets.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-4 text-left font-medium text-gray-400">Name</th>
                <th className="p-4 text-left font-medium text-gray-400">Type</th>
                <th className="p-4 text-left font-medium text-gray-400">Size</th>
                <th className="p-4 text-left font-medium text-gray-400">Rights Status</th>
                <th className="p-4 text-right font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset: any) => (
                <tr 
                  key={asset.id} 
                  className={`border-b border-gray-700 hover:bg-gray-750 ${
                    selectedAssets.includes(asset.id) ? 'bg-gray-750' : ''
                  }`}
                  onClick={(e) => handleAssetClick(asset.id, e as React.MouseEvent)}
                >
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      className="rounded bg-gray-700 border-gray-600"
                      checked={selectedAssets.includes(asset.id)}
                      onChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-gray-700 mr-3 overflow-hidden flex-shrink-0">
                        {asset.preview ? (
                          <img 
                            src={asset.preview} 
                            alt={asset.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-gray-500 text-xs uppercase">{asset.type.split('/')[1]}</div>
                          </div>
                        )}
                      </div>
                      <span className="truncate max-w-[200px]">{asset.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{asset.type.split('/')[1]}</td>
                  <td className="p-4">{(asset.size / 1024).toFixed(0)} KB</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-600 hover:bg-yellow-700">
                        <User className="mr-1 h-3 w-3" />
                        Faces: 2
                      </Badge>
                      <Badge variant="outline">
                        <MapPin className="mr-1 h-3 w-3" />
                        Location
                      </Badge>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="mr-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.info('Preview coming soon');
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="mr-1"
                      onClick={(e) => handleOpenRightsPanel(asset.id, e as React.MouseEvent)}
                    >
                      <User className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.info('Download coming soon');
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rights Management Panel */}
      <RightsManagementPanel
        isOpen={rightsPanelOpen}
        onClose={() => {
          setRightsPanelOpen(false);
          setSelectedAssetForRights(null);
        }}
        assetIds={selectedAssetForRights ? [selectedAssetForRights] : selectedAssets}
        assets={filteredAssets.filter((asset: any) => 
          selectedAssetForRights 
            ? asset.id === selectedAssetForRights 
            : selectedAssets.includes(asset.id)
        )}
      />
    </div>
  );
};

export default AssetsManager;
