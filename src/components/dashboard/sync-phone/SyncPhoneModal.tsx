
import React, { useState } from 'react';
import { X, Smartphone, QrCode, Mail, Bell, Users, Code, Check, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface SyncPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SyncPhoneModal: React.FC<SyncPhoneModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<'connect' | 'discover' | 'sync' | 'complete'>('connect');
  const [connectionMethod, setConnectionMethod] = useState<'qr' | 'link' | 'push' | 'auto' | 'manual'>('qr');
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'failed'>('idle');
  const [syncProgress, setSyncProgress] = useState(0);

  if (!isOpen) return null;

  const handleConnect = (method: 'qr' | 'link' | 'push' | 'auto' | 'manual') => {
    setConnectionMethod(method);
    setConnectionStatus('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setConnectionStatus('connected');
      setCurrentStep('discover');
    }, 2000);
  };

  const handleStartSync = () => {
    setCurrentStep('sync');
    
    // Simulate sync progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setSyncProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentStep('complete');
        }, 500);
      }
    }, 300);
  };

  const handleComplete = () => {
    onClose();
    // Reset state for next time
    setTimeout(() => {
      setCurrentStep('connect');
      setConnectionStatus('idle');
      setSyncProgress(0);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center">
            <Smartphone className="mr-2 h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Sync with Phone</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          {currentStep === 'connect' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Connect Your Device</h3>
                <p className="text-gray-400">Choose a method to connect your mobile device</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => handleConnect('qr')}
                  className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-3 transition-colors ${
                    connectionMethod === 'qr' && connectionStatus === 'connecting' 
                      ? 'bg-blue-900/30 border-blue-600' 
                      : 'border-gray-700 hover:border-blue-600'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                    <QrCode className="h-8 w-8 text-blue-400" />
                  </div>
                  <span className="font-medium text-white">Scan QR Code</span>
                  <span className="text-xs text-gray-400">Fastest method</span>
                  {connectionMethod === 'qr' && connectionStatus === 'connecting' && (
                    <div className="mt-2 text-blue-400 flex items-center">
                      <RefreshCw className="animate-spin h-4 w-4 mr-1" />
                      <span>Waiting for scan...</span>
                    </div>
                  )}
                </button>
                
                <button
                  onClick={() => handleConnect('link')}
                  className="p-4 border border-gray-700 hover:border-blue-600 rounded-lg flex flex-col items-center justify-center space-y-3 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-blue-400" />
                  </div>
                  <span className="font-medium text-white">Email/SMS Link</span>
                  <span className="text-xs text-gray-400">Send link to your device</span>
                </button>
                
                <button
                  onClick={() => handleConnect('push')}
                  className="p-4 border border-gray-700 hover:border-blue-600 rounded-lg flex flex-col items-center justify-center space-y-3 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                    <Bell className="h-8 w-8 text-blue-400" />
                  </div>
                  <span className="font-medium text-white">Push Notification</span>
                  <span className="text-xs text-gray-400">To MixiP mobile app</span>
                </button>
                
                <button
                  onClick={() => handleConnect('auto')}
                  className="p-4 border border-gray-700 hover:border-blue-600 rounded-lg flex flex-col items-center justify-center space-y-3 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                  <span className="font-medium text-white">Auto-detect</span>
                  <span className="text-xs text-gray-400">Same account on both devices</span>
                </button>
                
                <button
                  onClick={() => handleConnect('manual')}
                  className="p-4 border border-gray-700 hover:border-blue-600 rounded-lg flex flex-col items-center justify-center space-y-3 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                    <Code className="h-8 w-8 text-blue-400" />
                  </div>
                  <span className="font-medium text-white">Manual Code</span>
                  <span className="text-xs text-gray-400">Enter 6-digit code</span>
                </button>
              </div>
              
              {connectionMethod === 'qr' && (
                <div className="mt-6 bg-gray-800 p-6 rounded-lg flex flex-col items-center">
                  <div className="w-48 h-48 bg-white p-4 rounded-lg mb-4">
                    <div className="w-full h-full bg-gray-800 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">QR Code Placeholder</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">Open the MixiP app on your phone and scan this code</p>
                </div>
              )}
            </div>
          )}
          
          {currentStep === 'discover' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Phone Content</h3>
                <p className="text-gray-400">Select content to sync from your device</p>
              </div>
              
              <div className="flex mb-4 space-x-2 border-b border-gray-800 pb-4">
                <Button variant="secondary" size="sm" className="bg-blue-600 hover:bg-blue-700">All Media</Button>
                <Button variant="ghost" size="sm">Photos</Button>
                <Button variant="ghost" size="sm">Videos</Button>
                <Button variant="ghost" size="sm">Recent</Button>
                <Button variant="ghost" size="sm">Albums</Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="relative group">
                    <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        {i % 2 === 0 ? 'Photo' : 'Video'}
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-5 h-5 border-2 border-white rounded-sm bg-gray-800/50"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between pt-4 border-t border-gray-800 mt-6">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleStartSync}>Sync Selected (12)</Button>
              </div>
            </div>
          )}
          
          {currentStep === 'sync' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Syncing Content</h3>
                <p className="text-gray-400">Transferring files from your device</p>
              </div>
              
              <div className="space-y-4">
                <Progress value={syncProgress} className="h-2 w-full bg-gray-700" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{syncProgress}% Complete</span>
                  <span className="text-gray-400">Transferring 12 items</span>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Current file:</span>
                    <span className="text-gray-400">IMG_1234.jpg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Transfer speed:</span>
                    <span className="text-gray-400">2.4 MB/s</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button variant="outline" disabled>Cancel</Button>
              </div>
            </div>
          )}
          
          {currentStep === 'complete' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Sync Complete</h3>
                <p className="text-gray-400">All content has been successfully transferred</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Total items:</span>
                  <span className="text-gray-400">12</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Photos:</span>
                  <span className="text-gray-400">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Videos:</span>
                  <span className="text-gray-400">4</span>
                </div>
              </div>
              
              <div className="flex justify-between space-x-4 pt-4 border-t border-gray-800 mt-6">
                <Button variant="outline" onClick={onClose}>Close</Button>
                <div className="space-x-2">
                  <Button variant="secondary">View Content</Button>
                  <Button onClick={handleComplete}>Done</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncPhoneModal;
