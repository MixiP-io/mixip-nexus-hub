
import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Sample data for asset usage
const generateUsageData = (timeRange: '7d' | '30d' | '90d' | 'all') => {
  const numDays = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 120;
  const data = [];
  
  for (let i = 0; i < numDays; i += timeRange === '7d' ? 1 : timeRange === '30d' ? 3 : 7) {
    const date = new Date();
    date.setDate(date.getDate() - (numDays - i));
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      uploads: Math.floor(Math.random() * 20 + 5),
      downloads: Math.floor(Math.random() * 15 + 3),
      views: Math.floor(Math.random() * 50 + 20),
    });
  }
  
  return data;
};

// Sample data for asset types
const assetTypes = [
  { name: 'Images', value: 65, color: '#3498db' },
  { name: 'Videos', value: 20, color: '#e74c3c' },
  { name: 'Audio', value: 10, color: '#2ecc71' },
  { name: 'Documents', value: 5, color: '#f39c12' },
];

// Sample data for rights status
const rightsStatus = [
  { name: 'Cleared', value: 72, color: '#2ecc71' },
  { name: 'Pending', value: 18, color: '#f39c12' },
  { name: 'Issues', value: 10, color: '#e74c3c' },
];

interface AssetsChartProps {
  timeRange: '7d' | '30d' | '90d' | 'all';
}

const AssetsChart: React.FC<AssetsChartProps> = ({ timeRange }) => {
  const usageData = generateUsageData(timeRange);
  
  const chartConfig = {
    uploads: { label: 'Uploads', color: '#3b82f6' },
    downloads: { label: 'Downloads', color: '#10b981' },
    views: { label: 'Views', color: '#6366f1' },
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-6">Asset Activity Over Time</h3>
        
        <ChartContainer className="h-[400px]" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="uploads" stroke="#3b82f6" activeDot={{ r: 8 }} name="Uploads" />
              <Line type="monotone" dataKey="downloads" stroke="#10b981" name="Downloads" />
              <Line type="monotone" dataKey="views" stroke="#6366f1" name="Views" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-6">Asset Types Distribution</h3>
          <div className="flex justify-center items-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {assetTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-6">Rights Clearance Status</h3>
          <div className="flex justify-center items-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rightsStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {rightsStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Asset Storage Usage</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Used Storage</span>
              <span className="text-sm font-medium">4.2GB / 10GB</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Images</p>
              <p className="text-sm font-medium">2.7GB</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Videos</p>
              <p className="text-sm font-medium">1.2GB</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Audio</p>
              <p className="text-sm font-medium">0.2GB</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Documents</p>
              <p className="text-sm font-medium">0.1GB</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AssetsChart;
