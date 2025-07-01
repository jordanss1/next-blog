import Sidebar from '@/components/dashboard/Sidebar';
import { ReactNode } from 'react';
import { assets } from '../assets/assets';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
            <h3 className="font-semibold">Dashboard Panel</h3>
            <img src={assets.profile_icon.src} width={40} alt="" />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
