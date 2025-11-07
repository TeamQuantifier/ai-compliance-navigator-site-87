import React from 'react';

const PartnerMap = () => {
  return (
    <div className="w-full h-full">
      <div 
        className="w-full h-full bg-white"
        style={{
          backgroundImage: 'url("/lovable-uploads/partners-world-map.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  );
};

export default PartnerMap;
