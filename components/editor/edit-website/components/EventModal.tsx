// components/editor/edit-website/components/EventModal.tsx
'use client';

import { useState, useEffect } from 'react';

interface EventModalProps {
  event: any;
  onClose: () => void;
  onSave: (event: any) => void;
}

const EVENT_TYPES = [
  'Welcome Event',
  'Rehearsal',
  'Dinner',
  'Wedding',
  'Ceremony',
  'Reception',
  'After Party',
  'Brunch'
];

export default function EventModal({ event, onClose, onSave }: EventModalProps) {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    venueName: '',
    streetAddress: '',
    aptFloor: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    isPublic: true,
    allowRsvp: true
  });
  
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    if (event) {
      setFormData({
        type: event.type || '',
        name: event.name || '',
        startDate: event.startDate || '',
        startTime: event.startTime || '',
        endDate: event.endDate || '',
        endTime: event.endTime || '',
        venueName: event.venueName || '',
        streetAddress: event.streetAddress || '',
        aptFloor: event.aptFloor || '',
        city: event.city || '',
        state: event.state || '',
        zipCode: event.zipCode || '',
        country: event.country || 'United States',
        isPublic: event.isPublic !== false,
        allowRsvp: event.allowRsvp !== false
      });
    }
  }, [event]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string) => {
    setFormData(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };
  
  const handleSelectType = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
    setShowTypeDropdown(false);
  };
  
  const handleSubmit = () => {
    onSave({
      ...formData,
      // Transform data as needed for API
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-90vh overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Event Type & Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Event type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-3 py-2 border rounded-md text-left flex items-center justify-between"
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                >
                  <span>{formData.type || "Select..."}</span>
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {showTypeDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    {EVENT_TYPES.map(type => (
                      <div
                        key={type}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelectType(type)}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Event name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Our ceremony"
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="text-right text-xs text-gray-500">0/100</div>
            </div>
          </div>
          
          {/* Date & Time Pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                placeholder="MM/DD/YYYY"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Start time <span className="text-red-500">*</span>
              </label>
              <select
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md appearance-none"
              >
                <option>6:00 pm</option>
                <option>6:30 pm</option>
                <option>7:00 pm</option>
                {/* Other time options */}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                End date
              </label>
              <input
                type="text"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                placeholder="MM/DD/YYYY"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                End time
              </label>
              <select
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md appearance-none"
              >
                <option>Please select</option>
                <option>11:45 pm</option>
                {/* Other time options */}
              </select>
            </div>
          </div>
          
          {/* Venue */}
          <div>
            <div className="flex items-center mb-1">
              <label className="block text-sm font-medium">Venue name</label>
              <button className="ml-2 text-sm text-blue-600">Reset address →</button>
            </div>
            <input
              type="text"
              name="venueName"
              value={formData.venueName}
              onChange={handleInputChange}
              placeholder="Brooklyn Winery"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          {/* Address */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Street Address</label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="text-right text-xs text-gray-500">0/100</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Apt / Floor</label>
              <input
                type="text"
                name="aptFloor"
                value={formData.aptFloor}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="text-right text-xs text-gray-500">0/100</div>
            </div>
          </div>
          
          {/* City, State, Zip */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="text-right text-xs text-gray-500">0/35</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md appearance-none"
              >
                <option>Please select</option>
                <option value="NY">New York</option>
                <option value="CA">California</option>
                {/* Other states */}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          
          {/* Country */}
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md appearance-none"
            >
              <option value="United States">United States</option>
              {/* Other countries */}
            </select>
          </div>
          
          {/* Website Settings */}
          <div>
            <h3 className="text-sm font-medium mb-3">Event Settings on Website</h3>
            
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm">Make event public to all guests</label>
              <button 
                className={`w-12 h-6 rounded-full ${formData.isPublic ? 'bg-green-500' : 'bg-gray-300'} 
                relative transition-colors duration-200 focus:outline-none`}
                onClick={() => handleCheckboxChange('isPublic')}
              >
                <span 
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
                  transform transition-transform duration-200 ${formData.isPublic ? 'translate-x-6' : ''}`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm">Let guests RSVP on website</label>
              <button 
                className={`w-12 h-6 rounded-full ${formData.allowRsvp ? 'bg-green-500' : 'bg-gray-300'} 
                relative transition-colors duration-200 focus:outline-none`}
                onClick={() => handleCheckboxChange('allowRsvp')}
              >
                <span 
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
                  transform transition-transform duration-200 ${formData.allowRsvp ? 'translate-x-6' : ''}`}
                />
              </button>
            </div>
          </div>
          
          {/* Additional Details Toggle */}
          <div className="border-t pt-4">
            <button
              type="button"
              className="flex items-center justify-between w-full"
              onClick={() => setShowDetails(!showDetails)}
            >
              <span className="font-medium">Other event details</span>
              <svg 
                className={`w-5 h-5 transform transition-transform ${showDetails ? 'rotate-180' : ''}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showDetails && (
              <div className="mt-4 space-y-4">
                {/* Additional fields like dress code, description, etc. */}
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex justify-end">
          <button 
            className="px-5 py-2 bg-gray-200 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-5 py-2 bg-blue-600 text-white rounded-md"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}