// components/editor/DesignPanel.tsx
'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';
import AccordionPanel from './AccordionPanel';
import ColorPicker from './ColorPicker';
import FontSelector from './FontSelector';

// Açık accordion panellerini takip etmek için bir tip tanımlayalım
interface AccordionState {
  yourDesign: boolean;
  customFonts: boolean;
  navigation: boolean;
  [key: string]: boolean; // Dinamik erişim için index imzası
}

export default function DesignPanel() {
  const { selectedTheme, getCurrentTheme } = useTheme();
  const currentTheme = getCurrentTheme();
  
  // Accordion açılma durumları
  const [openAccordions, setOpenAccordions] = useState<AccordionState>({
    yourDesign: true,
    customFonts: false,
    navigation: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Geri kalan bileşen kodu...
  return (
    <div className="p-4">
      <AccordionPanel 
        title="Your design" 
        isOpen={openAccordions.yourDesign}
        onToggle={() => toggleAccordion('yourDesign')}
      >
        <div className="mt-4 space-y-4">
          {currentTheme ? (
            <div className="flex items-start space-x-4">
              <div className="min-w-[80px] h-[100px] border rounded overflow-hidden mr-4">
                <Image 
                  src={currentTheme.image || '/placeholder.jpg'} 
                  alt={currentTheme.name}
                  width={80}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{currentTheme.name}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentTheme.colorOptions.map((color) => (
                    <button
                      key={color.id}
                      className={`w-6 h-6 rounded-full border ${
                        selectedTheme?.colorId === color.id 
                          ? 'ring-2 ring-offset-1 ring-blue-500' 
                          : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={`Select ${color.name || color.id} color`}
                    />
                  ))}
                </div>
                
                <div className="flex mt-4 space-x-3">
                  <label className={`flex items-center text-sm ${currentTheme.hasMultiPage ? 'cursor-pointer' : 'cursor-not-allowed text-gray-400'}`}>
                    <input 
                      type="radio" 
                      name="pageType" 
                      value="single" 
                      className="mr-1"
                      defaultChecked={true}
                      disabled={!currentTheme.hasMultiPage}
                    />
                    Single page
                  </label>
                  <label className={`flex items-center text-sm ${currentTheme.hasMultiPage ? 'cursor-pointer' : 'cursor-not-allowed text-gray-400'}`}>
                    <input 
                      type="radio" 
                      name="pageType" 
                      value="multi" 
                      className="mr-1"
                      disabled={!currentTheme.hasMultiPage}
                    />
                    Multi page
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex">
              <div className="w-36 h-44 bg-gray-100 rounded overflow-hidden mr-4">
                <Image 
                  src="/themes/buxton.jpg" 
                  alt="Buxton theme" 
                  width={144}
                  height={176}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h4 className="font-medium">Buxton</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button className="w-6 h-6 rounded-full border bg-white"></button>
                  <button className="w-6 h-6 rounded-full border bg-gray-200"></button>
                  <button className="w-6 h-6 rounded-full border bg-green-900"></button>
                  <button className="w-6 h-6 rounded-full border bg-black"></button>
                  <button className="w-6 h-6 rounded-full border bg-white"></button>
                </div>
                
                <div className="flex mt-4 space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="pageType" value="single" className="mr-1" defaultChecked />
                    <span className="text-sm">Single page</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="pageType" value="multi" className="mr-1" />
                    <span className="text-sm">Multi page</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          <Link 
            href="/editor/design-gallery"
            className="block w-full py-2 px-4 bg-black text-white text-sm text-center rounded-full mt-4"
          >
            Change design
          </Link>
        </div>
      </AccordionPanel>
      
      <AccordionPanel 
        title="Custom fonts and colors" 
        isOpen={openAccordions.customFonts}
        onToggle={() => toggleAccordion('customFonts')}
      >
        <div className="mt-4 space-y-5">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-gray-600">Header font color</label>
              <label className="text-sm text-gray-600">Header font</label>
            </div>
            <div className="flex justify-between">
              <ColorPicker defaultColor="#000000" />
              <FontSelector 
                defaultFont="Libre Baskerville"
                options={['Libre Baskerville', 'Cormorant Garamond', 'Montserrat']}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-gray-600">Body font color</label>
              <label className="text-sm text-gray-600">Body font</label>
            </div>
            <div className="flex justify-between">
              <ColorPicker defaultColor="#000000" />
              <FontSelector 
                defaultFont="Libre Baskerville"
                options={['Libre Baskerville', 'Cormorant Garamond', 'Montserrat']}
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-600 block mb-1">Button and link color</label>
            <ColorPicker defaultColor="#000000" />
          </div>
          
          <div>
            <label className="text-sm text-gray-600 block mb-1">Background color</label>
            <ColorPicker defaultColor="#ffffff" />
          </div>
        </div>
      </AccordionPanel>
      
      <AccordionPanel 
        title="Navigation" 
        isOpen={openAccordions.navigation}
        onToggle={() => toggleAccordion('navigation')}
      >
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Navigation background color</label>
            <ColorPicker defaultColor="#ffffff" />
          </div>
          
          <div>
            <label className="text-sm text-gray-600 block mb-1">Navigation font color</label>
            <ColorPicker defaultColor="#000000" />
          </div>
        </div>
      </AccordionPanel>
    </div>
  );
}