import React, { useEffect, useState } from 'react';

const Notification = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2700);
    
    return () => clearTimeout(timer);
  }, [message]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'exclamation-circle';
      default:
        return 'info-circle';
    }
  };

  return (
    <div 
      className={`notification ${type}`} 
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)'
      }}
    >
      <i className={`fas fa-${getIcon()}`}></i> {message}
    </div>
  );
};

export default Notification;