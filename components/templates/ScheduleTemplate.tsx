// components/templates/ScheduleTemplate.tsx
'use client';

import { useWebsite } from '@/context/WebsiteContext';
import { useTheme } from '@/context/ThemeContext';

export default function ScheduleTemplate() {
  const { content } = useWebsite();
  const { getCurrentTheme, getCurrentColor } = useTheme();
  const currentTheme = getCurrentTheme();
  const primaryColor = getCurrentColor();
  
  return (
    <div className="wedding-template schedule-template py-8 px-6" >
      <img 
                src={currentTheme?.decorations?.bottom || ''} 
                alt="" 
                style={{
                  width: '80%',
                  zIndex: 50,
                  display: 'block',
                  position: 'absolute',
                  bottom: '0px',
                  right: '0px',
                  userSelect: 'none',
                  pointerEvents: 'none'
              }}
              />
      {/* Header Image */}
      {content?.scheduleHeaderImage && (
        <div className="mb-8 flex justify-center">
          <img
            src={content.scheduleHeaderImage}
            alt="Schedule header"
            className="max-w-full max-h-64 object-cover"
          />
        </div>
      )}
      
      {/* Date */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
          {content?.weddingDate ? content?.weddingDate : "FRIDAY, MAY 30, 2025"}
        </h2>
      </div>
      
      {/* Heart Icon */}
      <div className="flex justify-center mb-8">
        <span className="text-2xl" style={{ color: primaryColor }}>❤❤</span>
      </div>
      
      {/* Events */}
      <div className="max-w-xl mx-auto space-y-10">
        {content?.schedule.map((event, index) => (
          <div key={index} className="text-center">
            <h3 className="text-xl mb-2" style={{ color: primaryColor }}>
              <a href="#" className="hover:underline">{event.name}</a>
            </h3>
            <p className="mb-1 text-sm">
              {event.startTime} - {event.endTime}
            </p>
            <p className="mb-2 text-sm">
              {event.venueName}
            </p>
            {event.streetAddress && (
              <p className="text-sm text-gray-700">
                {event.streetAddress}, {event.city}, {event.state} {event.zipCode}
              </p>
            )}
          </div>
        ))}
        
        {content?.schedule?.length || 0 > 0 && (
          <div className="flex justify-center space-x-4 mt-8">
            <button className="bg-gray-800 text-white px-6 py-2 rounded">Map</button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded">Add to calendar</button>
          </div>
        )}
      </div>
      
      {/* Description */}
      {content?.scheduleDescription && (
        <div className="mt-10 max-w-lg mx-auto text-center">
          <p>{content.scheduleDescription}</p>
        </div>
      )}
      
    </div>
  );
}