import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <div>
      <div className='footer'>
        <div className='footer-left-content'>
          <p>NBA Value Index</p>
        </div>
        <div className='footer-right-content'>
          <p>Samuel Symonds &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
