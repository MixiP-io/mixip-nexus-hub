
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShieldCheck, ScrollText, AlertCircle, CheckCircle } from 'lucide-react';

const ComplianceAgreement: React.FC = () => {
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    dataProcessing: false,
    ethicalUse: false,
    attributionRequirements: false,
    allAgreements: false
  });
  
  const handleSingleAgreementChange = (key: string, checked: boolean) => {
    const newAgreements = { ...agreements, [key]: checked };
    
    // Check if all individual agreements are checked
    const allChecked = 
      newAgreements.termsOfService && 
      newAgreements.dataProcessing && 
      newAgreements.ethicalUse && 
      newAgreements.attributionRequirements;
    
    setAgreements({ ...newAgreements, allAgreements: allChecked });
  };
  
  const handleAllAgreementsChange = (checked: boolean) => {
    setAgreements({
      termsOfService: checked,
      dataProcessing: checked,
      ethicalUse: checked,
      attributionRequirements: checked,
      allAgreements: checked
    });
  };
  
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">Compliance Agreement</h2>
        <p className="text-mixip-gray-medium">
          Please review and accept our terms for responsible AI data usage
        </p>
      </div>
      
      <div className="mb-6 space-y-5">
        <div className="flex gap-5 items-start p-5 border rounded-xl bg-green-50">
          <div className="mt-0.5">
            <ShieldCheck className="h-7 w-7 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-1">Responsible AI Data Usage</h3>
            <p className="text-sm text-green-800 mb-3">
              Mix-IP is committed to promoting the ethical and responsible use of visual data in AI training and development. 
              Our platform provides access to high-quality, rights-cleared datasets while ensuring protections for content 
              creators and the subjects depicted in the content.
            </p>
            <p className="text-sm text-green-800">
              Please review and accept the following agreements to complete your AI Platform setup.
            </p>
          </div>
        </div>
        
        <Accordion type="multiple" className="space-y-3">
          <AccordionItem value="terms" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center text-left">
                <ScrollText className="h-5 w-5 mr-3 text-blue-500" />
                <div>
                  <p className="font-medium">Terms of Service</p>
                  <p className="text-sm text-gray-500">Legal terms governing your use of licensed data</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 border-t">
              <div className="space-y-4 text-sm">
                <p>
                  By accepting these Terms of Service, you agree to be bound by all provisions governing the use 
                  of datasets and services provided by Mix-IP. These terms outline the scope of licensed usage, 
                  limitations, warranties, and liabilities.
                </p>
                <p>
                  Key provisions include:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Usage of licensed content is restricted to the specific AI training purposes declared at the time of licensing</li>
                  <li>Redistribution of raw datasets is strictly prohibited unless explicitly allowed by the license terms</li>
                  <li>Content may not be used to train AI systems that generate outputs competing directly with the original content creators</li>
                  <li>Mix-IP reserves the right to audit usage of licensed datasets to ensure compliance</li>
                </ul>
              </div>
              <div className="flex items-start space-x-2 mt-4">
                <Checkbox 
                  id="termsAgreement" 
                  checked={agreements.termsOfService}
                  onCheckedChange={(checked) => handleSingleAgreementChange('termsOfService', checked as boolean)}
                />
                <Label htmlFor="termsAgreement" className="text-sm font-normal cursor-pointer">
                  I have read and agree to the Terms of Service
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="data" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center text-left">
                <ScrollText className="h-5 w-5 mr-3 text-purple-500" />
                <div>
                  <p className="font-medium">Data Processing Agreement</p>
                  <p className="text-sm text-gray-500">Guidelines for processing and protecting creator data</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 border-t">
              <div className="space-y-4 text-sm">
                <p>
                  This Data Processing Agreement outlines your responsibilities regarding the storage, processing, 
                  and protection of licensed visual data from Mix-IP. It is designed to ensure that all data is 
                  handled in accordance with applicable laws and ethical standards.
                </p>
                <p>
                  As a licensee, you agree to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Implement appropriate technical and organizational measures to secure the datasets</li>
                  <li>Process data only for the purposes specified in your licensing agreement</li>
                  <li>Delete or anonymize data when the license expires or the specified purpose is complete</li>
                  <li>Notify Mix-IP promptly of any data breach that may affect licensed content</li>
                  <li>Keep records of all data processing activities related to licensed datasets</li>
                </ul>
              </div>
              <div className="flex items-start space-x-2 mt-4">
                <Checkbox 
                  id="dataAgreement" 
                  checked={agreements.dataProcessing}
                  onCheckedChange={(checked) => handleSingleAgreementChange('dataProcessing', checked as boolean)}
                />
                <Label htmlFor="dataAgreement" className="text-sm font-normal cursor-pointer">
                  I agree to process data in accordance with this agreement
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="ethical" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center text-left">
                <ScrollText className="h-5 w-5 mr-3 text-green-500" />
                <div>
                  <p className="font-medium">Ethical Use Commitment</p>
                  <p className="text-sm text-gray-500">Pledge to use data responsibly in AI development</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 border-t">
              <div className="space-y-4 text-sm">
                <p>
                  The Ethical Use Commitment represents your pledge to utilize licensed visual data in ways that 
                  respect human dignity, promote fairness, and avoid harm. This commitment goes beyond legal 
                  requirements to encompass moral and ethical considerations in AI development.
                </p>
                <p>
                  By accepting this commitment, you agree to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Not use licensed data to develop systems designed to deceive, discriminate, or cause harm</li>
                  <li>Implement bias detection and mitigation strategies in your AI development process</li>
                  <li>Test AI systems trained with our data for unintended consequences before deployment</li>
                  <li>Prioritize transparency in how data influences your AI system's outputs</li>
                  <li>Respect the dignity and rights of individuals depicted in the visual content</li>
                </ul>
              </div>
              <div className="flex items-start space-x-2 mt-4">
                <Checkbox 
                  id="ethicalAgreement" 
                  checked={agreements.ethicalUse}
                  onCheckedChange={(checked) => handleSingleAgreementChange('ethicalUse', checked as boolean)}
                />
                <Label htmlFor="ethicalAgreement" className="text-sm font-normal cursor-pointer">
                  I commit to the ethical use of licensed visual data
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="attribution" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center text-left">
                <ScrollText className="h-5 w-5 mr-3 text-orange-500" />
                <div>
                  <p className="font-medium">Attribution Requirements</p>
                  <p className="text-sm text-gray-500">Rules for crediting content creators</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 border-t">
              <div className="space-y-4 text-sm">
                <p>
                  Attribution Requirements outline how you must acknowledge and credit content creators 
                  whose work has contributed to your AI training datasets. Proper attribution ensures 
                  transparency and respects creators' intellectual contributions.
                </p>
                <p>
                  Your attribution responsibilities include:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Maintaining internal records of all datasets used in training, including creator information</li>
                  <li>Including attribution notices in your AI system's documentation as specified in your license</li>
                  <li>When required by specific licenses, providing public attribution in user-facing interfaces</li>
                  <li>Not implying endorsement from creators beyond the scope of the licensing agreement</li>
                  <li>Respecting creators' right to be identified or to remain anonymous as specified in their content licenses</li>
                </ul>
              </div>
              <div className="flex items-start space-x-2 mt-4">
                <Checkbox 
                  id="attributionAgreement" 
                  checked={agreements.attributionRequirements}
                  onCheckedChange={(checked) => handleSingleAgreementChange('attributionRequirements', checked as boolean)}
                />
                <Label htmlFor="attributionAgreement" className="text-sm font-normal cursor-pointer">
                  I agree to follow all attribution requirements for licensed content
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className={`border ${agreements.allAgreements ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'} rounded-lg p-4 flex items-start`}>
          {agreements.allAgreements ? 
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" /> : 
            <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
          }
          <div>
            <div className="flex items-start space-x-2 mb-1">
              <Checkbox 
                id="allAgreements" 
                checked={agreements.allAgreements}
                onCheckedChange={(checked) => handleAllAgreementsChange(checked as boolean)}
              />
              <Label htmlFor="allAgreements" className="font-medium cursor-pointer">
                I accept all agreements and commit to responsible AI data usage
              </Label>
            </div>
            <p className="text-sm ml-6">
              By checking this box, you confirm that you have read, understood, and agree to all of the above terms and commitments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceAgreement;
