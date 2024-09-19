import React from 'react';
import { ScaleLoader } from 'react-spinners';

const Loader = ({ smallHeight }) => {
    return (
        <div
        className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
        flex 
        flex-col 
        justify-center 
        items-center `}
      >
        <ScaleLoader size={100} color='red' className='text-blue-600' />
      </div>
    );
};

export default Loader;