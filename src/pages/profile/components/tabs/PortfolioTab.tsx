
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info } from 'lucide-react';

const PortfolioSectionTab: React.FC = () => {
  return (
    <Card className="border-none shadow-sm bg-gray-900 text-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Portfolio</CardTitle>
            <CardDescription className="text-gray-400">
              Add your best work samples to showcase your skills
            </CardDescription>
          </div>
          <Info className="h-5 w-5 text-gray-400" />
        </div>
        <Separator className="bg-gray-800" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-40 border border-dashed border-gray-700 rounded-lg bg-gray-800">
          <p className="text-gray-400">Portfolio management will be added soon</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSectionTab;
