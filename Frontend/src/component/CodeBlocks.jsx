import React from 'react';
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({ position, heading, subheading, codeblock, backgroundGradient, codeColor }) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-4 lg:flex-row max-lg:flex-col`}>
      {/* Section 1 */}
      <div className='w-[50%]  flex flex-col gap-8'>
        {heading}
        <div className='text-richblack-300 font-bold text-lg'>
          {subheading}
        </div>
      </div>

      {/* Section 2 */}
      <div className={`h-fit code-border bg-slate-50 flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] code-border ${backgroundGradient} animate__animated animate__fadeIn animate__delay-1s shadow-lg`}>
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold">
          {[...Array(11).keys()].map((number) => (
            <p key={number}>{number + 1}</p>
          ))}
        </div>
        <div className={`w-[90%]  text-black flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 overflow-x-auto`}>
          <TypeAnimation
            sequence={[codeblock, 10000, ""]}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeBlocks;
