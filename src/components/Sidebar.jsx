import { useState, useEffect } from 'react';
import avatarImage from '../assets/Oval.svg'; 

const Sidebar = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <aside className="fixed top-0 left-0 w-full h-[72px] lg:h-full lg:w-[103px] bg-[#373B53] dark:bg-[#1E2139] flex lg:flex-col justify-between z-50 lg:rounded-r-[20px] overflow-hidden transition-colors duration-300">
      
      {/* Logo Section */}
      <div className="relative h-full w-[72px] lg:w-full lg:h-[103px] bg-[#7C5DFA] rounded-r-[20px] flex items-center justify-center overflow-hidden cursor-pointer group">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#9277FF] rounded-tl-[20px]" />
        
        <svg 
          viewBox="0 0 28 26" 
          xmlns="http://www.w3.org/2000/svg" 
          className="relative z-10 w-7 h-7"
        >
          <path 
            fill="#FFF" 
            fillRule="evenodd" 
            d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9L20.513 0Z"
          />
        </svg>
      </div>

      <div className="flex lg:flex-col items-center">
        {/* Toggle Section */}
        <button 
          onClick={toggleTheme}
          className="px-8 lg:py-8 flex items-center justify-center outline-none group"
        >
          {isDark ? (
            /* Circle Icon - Shows in Dark Mode */
            <svg 
              width="15" 
              height="15" 
              viewBox="0 0 10 10" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="fill-[#858BB2] group-hover:fill-[#DFE3FA] transition-colors"
            >
              <path d="M4.91783 0C2.20609 0 0 2.20652 0 4.91826C0 7.63 2.20609 9.83652 4.91783 9.83652C7.62913 9.83652 9.83565 7.63043 9.83565 4.91826C9.83565 2.20609 7.62913 0 4.91783 0Z" />
            </svg>
          ) : (
            /* Moon Icon - Shows in Light Mode */
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="fill-[#7E88C3] group-hover:fill-[#DFE3FA] transition-colors"
            >
              <path d="M19.5016 11.3423C19.2971 11.2912 19.0927 11.3423 18.9137 11.4701C18.2492 12.0324 17.4824 12.4924 16.639 12.7991C15.8466 13.1059 14.9776 13.2592 14.0575 13.2592C11.9872 13.2592 10.0958 12.4158 8.74121 11.0611C7.38658 9.70649 6.54313 7.81512 6.54313 5.74483C6.54313 4.87582 6.69649 4.03237 6.95208 3.26559C7.23323 2.4477 7.64217 1.70649 8.17891 1.06751C8.40895 0.786362 8.35783 0.377416 8.07668 0.147384C7.89776 0.0195887 7.69329 -0.0315295 7.48882 0.0195887C5.31629 0.607448 3.42492 1.91096 2.07029 3.64898C0.766773 5.36144 0 7.48285 0 9.78317C0 12.5691 1.1246 15.0995 2.96486 16.9397C4.80511 18.78 7.3099 19.9046 10.1214 19.9046C12.4728 19.9046 14.6454 19.0867 16.3834 17.732C18.147 16.3519 19.4249 14.3838 19.9617 12.1346C20.0639 11.7768 19.8594 11.419 19.5016 11.3423Z" />
            </svg>
          )}
        </button>

        {/* Divider */}
        <div className="w-[1px] h-[72px] lg:h-[1px] lg:w-full bg-[#494E6E]" />

        {/* Avatar Section */}
        <div className="p-6 lg:py-8 flex items-center justify-center">
          <img 
            src={avatarImage} 
            alt="User Profile" 
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-transparent hover:border-[#7C5DFA] cursor-pointer transition-all object-cover"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;