
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lock, Shield, Clock } from 'lucide-react';
import { Label } from "@/components/ui/label";

const SecurityTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm bg-gray-900 text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your password and account security
              </CardDescription>
            </div>
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Separator className="bg-gray-800" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-gray-300">Current Password</Label>
            <Input id="current-password" type="password" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-gray-300">New Password</Label>
            <Input id="new-password" type="password" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-gray-300">Confirm New Password</Label>
            <Input id="confirm-password" type="password" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="flex justify-end">
            <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm bg-gray-900 text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription className="text-gray-400">
                Add an extra layer of security to your account
              </CardDescription>
            </div>
            <Shield className="h-5 w-5 text-gray-400" />
          </div>
          <Separator className="bg-gray-800" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-900/20 rounded-lg border border-blue-900">
            <div>
              <h4 className="font-medium text-blue-300">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-400">Protect your account with 2FA</p>
            </div>
            <Button variant="outline" className="bg-transparent border-blue-700 text-blue-300 hover:bg-blue-800/30">Enable</Button>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3 text-white">Login Sessions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-800 border-gray-700">
                <div className="flex items-center">
                  <div className="bg-green-900/30 p-2 rounded-full mr-3">
                    <Clock className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Current Session</h4>
                    <p className="text-sm text-gray-400">New York, USA • Chrome on Windows</p>
                  </div>
                </div>
                <Badge className="bg-green-900/40 text-green-400 border-green-600">Active Now</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-800 border-gray-700">
                <div className="flex items-center">
                  <div className="bg-gray-700 p-2 rounded-full mr-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Mobile App</h4>
                    <p className="text-sm text-gray-400">New York, USA • Xvidia App</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-transparent border-gray-600 text-gray-400">2 days ago</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;
