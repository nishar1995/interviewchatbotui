import React from 'react';
import MyInterviews from './my-interviews';

function CandidateDashboard() {
  return (
    <div className="@container">
      <div className="col-span-full flex flex-col gap-6  2xl:gap-8 ">
        <MyInterviews />
        
      </div>
    </div>
  );
}

export default CandidateDashboard;
