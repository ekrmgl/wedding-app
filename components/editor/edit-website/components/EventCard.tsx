// components/editor/edit-website/components/EventCard.tsx
'use client';

interface EventCardProps {
  event: any;
  onEdit: () => void;
  onRemove: () => void;
}

export default function EventCard({ event, onEdit, onRemove }: EventCardProps) {
  const formatDate = (date: string) => {
    // Format date properly
    return date;
  };
  
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-1">
            <h3 className="font-medium">{event.name}</h3>
            {event.isPublic && (
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Public
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-1">
            {formatDate(event.startDate)}, {event.startTime} - {event.endTime}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            {event.venueName || "Dear Irving Gramercy"}
          </p>
          
          {(event.venueName || event.streetAddress) && (
            <p className="text-sm">
              Venue added to: 
              <a href="#" className="text-blue-600 underline ml-1">booked vendors</a>
            </p>
          )}
        </div>
        
        <div className="flex space-x-1">
          <button 
            onClick={onEdit}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            onClick={onRemove}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}