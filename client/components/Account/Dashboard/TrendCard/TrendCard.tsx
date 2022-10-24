import React from 'react';
import { MdTrendingUp } from 'react-icons/md';

interface TrendCardProps {
  title: string;
  value: number;
}

export const TrendCard: React.FC<TrendCardProps> = ({
  title,
  value,
}) => {
  return (
    <div className={`shadow h-[125px] w-full max-w-[325px] rounded-lg bg-[#fafafa] mt-5 flex flex-grow flex-1`}>
      <div className="pt-3 w-full px-4 flex flex-col h-full">
        <div className='flex items-center justify-between'>
        <div className="flex items-center text-[#7e7e89] space-x-3">
          <div>
            <h4 className="text-[#7e7e89] font-semibold">{title}</h4>
          </div>
          <div>
            <MdTrendingUp />
          </div>
        </div>
        <div className='pl-5'>
          <span className='text-brand-green hover:text-brand-green-hover cursor-pointer'>
            Edit
          </span>
        </div>
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <p className="font-bold text-3xl">{value}</p>
        </div>
      </div>
    </div>
  );
};
