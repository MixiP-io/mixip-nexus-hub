
import React from 'react';
import { User, MapPin, MoreHorizontal, Eye, Download, Share2, Trash } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

interface AssetCardProps {
  asset: any;
  isSelected: boolean;
  onSelect: (assetId: string, e: React.MouseEvent) => void;
  onOpenRightsPanel: (assetId: string, e: React.MouseEvent) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  isSelected,
  onSelect,
  onOpenRightsPanel
}) => {
  return (
    <Card 
      key={asset.id} 
      className={`bg-gray-800 border-gray-700 overflow-hidden cursor-pointer hover:bg-gray-750 transition-all ${
        isSelected ? 'ring-2 ring-green-500' : ''
      }`}
      onClick={(e) => onSelect(asset.id, e as React.MouseEvent)}
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
                  onClick={(e) => onOpenRightsPanel(asset.id, e as React.MouseEvent)}
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
              <DropdownMenuItem onClick={(e) => onOpenRightsPanel(asset.id, e as React.MouseEvent)}>
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
  );
};

export default AssetCard;
