// components/editor/edit-website/pages/SchedulePageEditor.tsx
'use client';

import { useState } from 'react';
import { useWebsite } from '@/context/WebsiteContext';
import AccordionPanel from '../../AccordionPanel';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';

interface SectionState {
  header: boolean;
  events: boolean;
  [key: string]: boolean;
}

export default function SchedulePageEditor() {
  const { content, updateContent } = useWebsite();
  const [openSections, setOpenSections] = useState<SectionState>({
    header: true,
    events: true,
  });
  const scheduleHeaderImage = content?.scheduleHeaderImage || ''; 
  const schedule = content?.schedule || [];
  const scheduleDescription = content?.scheduleDescription || '';
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [visible, setVisible] = useState(true);
  
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleAddEvent = () => {
    setEditingEvent(null); // New event
    setIsModalOpen(true);
  };
  
  const handleEditEvent = (event: any, index: number) => {
    setEditingEvent({ ...event, index });
    setIsModalOpen(true);
  };
  
  const handleRemoveEvent = (index: number) => {
    const newEvents = schedule;
    newEvents.splice(index, 1);
    updateContent('schedule', newEvents);
  };
  
  const handleSaveEvent = (event: any) => {
    let newEvents;
    
    if (editingEvent && editingEvent.index !== undefined) {
      // Edit existing event
      newEvents = schedule;
      newEvents[editingEvent.index] = event;
    } else {
      // Add new event
      newEvents = schedule, event;
    }
    
    updateContent('schedule', newEvents);
    setIsModalOpen(false);
  };
  
  const toggleVisibility = () => {
    setVisible(!visible);
    // Burada gerçek bir uygulamada sayfanın görünürlüğünü güncellemeniz gerekebilir
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Visible</span>
          <button 
            className={`w-12 h-6 rounded-full ${visible ? 'bg-green-500' : 'bg-gray-300'} 
            relative transition-colors duration-200 focus:outline-none`}
            onClick={toggleVisibility}
          >
            <span 
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
              transform transition-transform duration-200 ${visible ? 'translate-x-6' : ''}`}
            />
          </button>
        </div>
      </div>
      
      {/* Header Section */}
      <AccordionPanel 
        title="Header" 
        isOpen={openSections.header}
        onToggle={() => toggleSection('header')}
      >
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium mb-2">Main photo</h3>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-20 bg-gray-200 rounded overflow-hidden">
                {scheduleHeaderImage && (
                  <img 
                    src={scheduleHeaderImage}
                    alt="Schedule header"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <button className="text-sm flex items-center space-x-1 mb-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Swap</span>
                </button>
                <button className="text-sm flex items-center space-x-1 text-red-500">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <textarea 
              className="w-full border rounded-md p-3 text-sm min-h-[100px]"
              placeholder="Add a description for your schedule page"
              value={scheduleDescription || "Here's what to expect during our wedding weekend. There will also be a printout of this schedule available in your hotel rooms. We can't wait to celebrate with you!"}
              onChange={(e) => updateContent('scheduleDescription', e.target.value)}
            />
            <div className="text-right text-xs text-gray-500">0/1000</div>
          </div>
        </div>
      </AccordionPanel>
      
      {/* Events Section */}
      <AccordionPanel 
        title="Events" 
        isOpen={openSections.events}
        onToggle={() => toggleSection('events')}
      >
        <div className="mt-4 space-y-4">
          {schedule.map((event, index) => (
            <EventCard 
              key={index}
              event={event}
              onEdit={() => handleEditEvent(event, index)}
              onRemove={() => handleRemoveEvent(index)}
            />
          ))}
          
          <div className="flex justify-between">
            <button 
              className="bg-black text-white rounded-full px-4 py-2 text-sm"
              onClick={handleAddEvent}
            >
              Add an event
            </button>
            <button className="text-sm text-gray-600 hover:underline">
              Customize
            </button>
          </div>
        </div>
      </AccordionPanel>
      
      {/* Event Modal */}
      {isModalOpen && (
        <EventModal 
          event={editingEvent}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
}