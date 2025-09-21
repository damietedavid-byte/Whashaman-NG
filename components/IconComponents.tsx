
import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
    <path d="M12 6C9.1 6 6.62 7.79 5.68 10.25L7.1 10.99C7.81 9.24 9.75 8 12 8C14.25 8 16.19 9.24 16.9 10.99L18.32 10.25C17.38 7.79 14.9 6 12 6Z" />
    <path d="M8 14C8.55 14 9 14.45 9 15C9 15.55 8.55 16 8 16C7.45 16 7 15.55 7 15C7 14.45 7.45 14 8 14Z" />
    <path d="M16 14C16.55 14 17 14.45 17 15C17 15.55 16.55 16 16 16C15.45 16 15 15.55 15 15C15 14.45 15.45 14 16 14Z" />
  </svg>
);

export const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

export const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-3.51 1.71-6.636 4.386-8.552a.75.75 0 01.819.162z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18a.75.75 0 00.75-.75V15.75a.75.75 0 00-1.5 0v1.5c0 .414.336.75.75.75zM22.5 12a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 00-.75-.75zM6 12a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0v-1.5A.75.75 0 006 12zM12 6a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0V6.75A.75.75 0 0012 6z" />
  </svg>
);

export const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-3.181-4.991v4.99" />
    </svg>
);
