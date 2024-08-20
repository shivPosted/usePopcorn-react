import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
import { Test } from './StarComponent';
import StarComponent from './StarComponent';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <StarComponent maxLength={10} />
    <StarComponent
      maxLength={5}
      color="red"
      size={24}
      ratingString={['Terrible', 'Bad', 'Ok', 'Good', 'Amazing']}
    />
    <StarComponent defaultRating={3} color="blue" />
    <Test />
  </StrictMode>
);
