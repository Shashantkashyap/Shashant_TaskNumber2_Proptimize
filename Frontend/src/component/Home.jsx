import React from 'react';
import Navbar from './Navbar';
import CodeBlocks from './CodeBlocks';

function Home() {
  return (
    <div className=" min-h-screen max-w-screen bg-slate-600">
      <Navbar />

      <div className="container mx-auto my-8 p-8 rounded-lg shadow-md bg-slate-300">
        <CodeBlocks
          position="lg:flex-row"
          heading={<div className="text-4xl font-semibold text-blue-600 mb-4">Unlock Your Potential</div>}
          subheading="You will face many defeats in life, but never let yourself be defeated. Go confidently in the direction of your dreams! ...In the end, it's not the years in your life that count. ...Never let the fear of striking out keep you from playing the game. - ...In this life, we cannot do great things."
          codeColor="text-yellow-500"
          codeblock={`<!DOCTYPE html>\n<html lang="LOVE">\n<head>\n  <title>LIFE IS BEAUTIFUL</title>\n</head>\n<body>\n  <h1><a href="/" class="STAY BLESSED hover:underline">Header</a></h1>\n  <nav class="ENJOY"> <a href="/one" class="LIVE LONG hover:underline">One</a> <a href="/two" class="BE SUCCESSFULL hover:underline">Two</a> <a href="/three" class="BE HUMBLE hover:underline">Three</a></nav>\n</body>`}
          backgroundGradient={<div className="codeblock1 absolute"></div>}
        />
      </div>
    </div>
  );
}

export default Home;
