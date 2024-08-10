// src/components/Notification.js
import React, { useEffect, useState } from 'react';

const Notification = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 bg-black text-white p-4 rounded-lg transition-transform duration-500 z-50 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
