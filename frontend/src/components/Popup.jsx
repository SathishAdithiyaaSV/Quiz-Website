import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const Popup = ({ link, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Room link</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">&times;</button>
        </div>
        <div className="mt-4">
          <div className="bg-gray-700 p-2 rounded flex items-center justify-between">
            <span>{link}</span>
            <button onClick={copyToClipboard} className="text-blue-400 hover:text-blue-600 ml-2">
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
          {copied && <p className="text-green-400 mt-2">Link copied to clipboard!</p>}
        </div>
      </div>
    </div>
  );
};

export default Popup;
