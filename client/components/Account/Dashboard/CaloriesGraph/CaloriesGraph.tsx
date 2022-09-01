import React, { FunctionComponent } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';

interface CaloriesGraphProps {}

const caloriesData = [
  {
    name: 'Mon',
    calories: 4000,
  },
  {
    name: 'Tue',
    calories: 1870,
  },
  {
    name: 'Wed',
    calories: 2000,
  },
  {
    name: 'Thr',
    calories: 2780,
  },
    {
      name: 'Fri',
      calories: 1890,
    },
  //   {
  //     name: 'Sat',
  //     calories: 2390,
  //   },
  //   {
  //     name: 'Sun',
  //     calories: 3490,
  //   },
];

const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        opacity={0.5}
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export const CaloriesGraph: React.FC<CaloriesGraphProps> = ({}) => {
  return (
    <section className="col-span-12 lg:col-span-5 flex flex-col ">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-[#2b3042]">Calories</h3>
        </div>
        <div>
          <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded">
            View all
          </button>
        </div>
      </div>
      <div
        className="shadow mt-5 rounded-lg cursor-pointer pt-4 pr-4 flex-1 justify-center items-center bg-[#fafafa]"
        style={{ height: 240, width: '100%', display: 'block' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={caloriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              axisLine={false}
              dataKey="name"
              height={50}
              tick={<CustomizedAxisTick />}
            />
            <YAxis
              axisLine={false}
              //   tick={false}
              type="number"
              tick={{ color: '#515156', opacity: 0.5 }}
              domain={['dataMin', 'dataMax']}
            />
            <Tooltip />
            <Line type="monotone" dataKey="calories" stroke="#8884d8">
              {/* <LabelList content={<CustomizedLabel />} /> */}
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
