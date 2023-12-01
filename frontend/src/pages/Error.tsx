// Error404.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

const Error404: React.FC = () => {
  return (
    <div className='text-center mt-[100px]'>
      <h1 className='text-[72px] text-red-500'>404 - Not Found</h1>
      <p className='text-[18px] my-[16px]'>The page you are looking for might be in another castle.</p>
      <Link to="/" className='text-[20px] text-blue-600'>
        Go back home
      </Link>
    </div>
  );
};


export default Error404;
