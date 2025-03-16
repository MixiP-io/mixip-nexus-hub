
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Sample data - in a real app, this would come from an API
const generateData = (timeRange: '7d' | '30d' | '90d' | 'all') => {
  // Generate different data based on time range
  const numDays = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 120;
  const data = [];
  
  for (let i = 0; i < numDays; i += timeRange === '7d' ? 1 : timeRange === '30d' ? 3 : 7) {
    const date = new Date();
    date.setDate(date.getDate() - (numDays - i));
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total: Math.floor(Math.random() * 150 + 50),
      viewed: Math.floor(Math.random() * 120 + 30),
      responded: Math.floor(Math.random() * 80 + 20),
      interested: Math.floor(Math.random() * 50 + 10),
    });
  }
  
  return data;
};

interface ResponsesChartProps {
  timeRange: '7d' | '30d' | '90d' | 'all';
}

const ResponsesChart: React.FC<ResponsesChartProps> = ({ timeRange }) => {
  const data = generateData(timeRange);
  
  const chartConfig = {
    total: { label: 'Total Reached', color: '#94a3b8' },
    viewed: { label: 'Viewed', color: '#60a5fa' },
    responded: { label: 'Responded', color: '#34d399' },
    interested: { label: 'Interested', color: '#f97316' },
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-6">Campaign Response Metrics</h3>
        
        <ChartContainer className="h-[400px]" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="total" fill="#94a3b8" name="Total Reached" />
              <Bar dataKey="viewed" fill="#60a5fa" name="Viewed" />
              <Bar dataKey="responded" fill="#34d399" name="Responded" />
              <Bar dataKey="interested" fill="#f97316" name="Interested" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Conversion Rates</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">View Rate</span>
                <span className="text-sm font-medium">76%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">Response Rate</span>
                <span className="text-sm font-medium">48%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">Interest Rate</span>
                <span className="text-sm font-medium">24%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Campaign Effectiveness</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">Avg. Response Time</p>
              <p className="text-2xl font-bold">3.2h</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">Completion Rate</p>
              <p className="text-2xl font-bold">64%</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">Avg. Creator Rating</p>
              <p className="text-2xl font-bold">4.8</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">Creator Retention</p>
              <p className="text-2xl font-bold">78%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResponsesChart;
