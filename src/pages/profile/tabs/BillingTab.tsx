
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Award, Shield, PenTool, Plus, Download } from 'lucide-react';

const BillingTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm bg-gray-900 text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your subscription and billing information
              </CardDescription>
            </div>
            <CreditCard className="h-5 w-5 text-gray-400" />
          </div>
          <Separator className="bg-gray-800" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mt-10 -mr-10 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-lg text-blue-300">Creator Pro Plan</h4>
                    <Badge className="ml-2 bg-mixip-blue">Current Plan</Badge>
                  </div>
                  <p className="text-gray-300 font-medium">$24.99/month</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-400" />
                      Unlimited projects
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-400" />
                      Advanced portfolio tools
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-400" />
                      Client verification
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-full p-3 shadow-md border border-blue-900">
                  <Award className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" className="bg-transparent border-blue-700 text-blue-300 hover:bg-blue-800/30">Manage Subscription</Button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 text-white">Payment Methods</h4>
            <div className="border rounded-lg p-4 mb-2 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
              <div className="flex items-center">
                <div className="h-10 w-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded mr-3 flex items-center justify-center text-white font-bold text-xs">VISA</div>
                <div>
                  <p className="font-medium text-white">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-400">Expires 12/2025</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-transparent border-gray-600 text-gray-300">Default</Badge>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                  <PenTool className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-2 bg-gray-800 border-gray-700 text-gray-300 hover:text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
          
          <div className="border-t border-gray-800 pt-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-white">Billing History</h4>
              <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-gray-300 hover:text-white">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg flex items-center justify-between bg-gray-800 border-gray-700">
                <div>
                  <p className="font-medium text-white">Creator Pro Plan - Monthly</p>
                  <p className="text-sm text-gray-400">Oct 15, 2023</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">$24.99</p>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-3 border rounded-lg flex items-center justify-between bg-gray-800 border-gray-700">
                <div>
                  <p className="font-medium text-white">Creator Pro Plan - Monthly</p>
                  <p className="text-sm text-gray-400">Sep 15, 2023</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">$24.99</p>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingTab;
