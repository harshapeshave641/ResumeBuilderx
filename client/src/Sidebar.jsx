import React, { useState, useRef, useCallback } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ResizableSidebar = ({ sections, toggleSection }) => {
  const [sidebarWidth, setSidebarWidth] = useState(250); // Initial width in pixels
  const sidebarRef = useRef(null);
  const resizerRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    
    const startX = e.clientX;
    const startWidth = sidebarRef.current.offsetWidth;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="flex h-screen">
      <div 
        ref={sidebarRef}
        className="h-full bg-gray-800 text-white flex flex-col"
        style={{ width: `${sidebarWidth}px` }}
      >
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Resume Structure
        </div>
        <ul className="flex-1 p-4 overflow-y-auto">
          {sections.map((section) => (
            <li key={section.name} className="mb-4">
              <div
                onClick={() => toggleSection(section.name)}
                className="flex items-center justify-between cursor-pointer hover:text-gray-400"
              >
                <div className="flex items-center">
                  {section.icon}
                  <span className="ml-2">{section.title}</span>
                </div>
                <div>
                  {section.isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              {section.isOpen && (
                <div className="pl-6 mt-2">
                  {section.form}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div
        ref={resizerRef}
        className="bg-gray-600 cursor-col-resize w-2 h-full"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ResizableSidebar;
