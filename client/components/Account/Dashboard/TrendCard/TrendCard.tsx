import React from 'react';
import { MdTrendingUp } from 'react-icons/md';

interface TrendCardProps {
  title: string;
  value: number;
  measurement: 'lbs' | 'kg' | 'calories';
  plusMinusFigure: number;
}

export const TrendCard: React.FC<TrendCardProps> = ({
  title,
  value,
  measurement,
  plusMinusFigure,
}) => {
  return (
    <div className={`shadow h-[125px] rounded-lg cursor-pointer bg-[#fafafa] hover:bg-gray-100 mt-5 flex flex-1`}>
      <div className="pt-3 px-4 flex flex-col h-full">
        <div className="flex items-center text-[#7e7e89] space-x-3">
          <div>
            <h4 className="text-[#7e7e89] font-semibold">{title}</h4>
          </div>
          <div>
            <MdTrendingUp />
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <p className="font-bold text-3xl">{value}</p>
          <span className="text-green-500">
            +{plusMinusFigure} {measurement}
          </span>
        </div>
      </div>
    </div>
  );
};
