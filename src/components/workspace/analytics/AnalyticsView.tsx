
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SectionHeader from '../SectionHeader';
import ResponsesChart from './charts/ResponsesChart';
import AssetsChart from './charts/AssetsChart';

const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  
  return (
    <div className="p-6">
      <SectionHeader 
        title="Analytics Dashboard" 
        description="Track campaign performance and asset usage across your projects"
      />
      
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="campaigns" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="campaigns">Campaign Metrics</TabsTrigger>
            <TabsTrigger value="assets">Asset Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2">
          <Button 
            variant={timeRange === '7d' ? 'default' : 'outline'} 
            onClick={() => setTimeRange('7d')}
            size="sm"
          >
            7 Days
          </Button>
          <Button 
            variant={timeRange === '30d' ? 'default' : 'outline'} 
            onClick={() => setTimeRange('30d')}
            size="sm"
          >
            30 Days
          </Button>
          <Button 
            variant={timeRange === '90d' ? 'default' : 'outline'} 
            onClick={() => setTimeRange('90d')}
            size="sm"
          >
            90 Days
          </Button>
          <Button 
            variant={timeRange === 'all' ? 'default' : 'outline'} 
            onClick={() => setTimeRange('all')}
            size="sm"
          >
            All Time
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="campaigns">
        <TabsContent value="campaigns" className="mt-0">
          <ResponsesChart timeRange={timeRange} />
        </TabsContent>
        
        <TabsContent value="assets" className="mt-0">
          <AssetsChart timeRange={timeRange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsView;
