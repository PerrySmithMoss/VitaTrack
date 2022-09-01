import React, { useCallback, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Sector,
  ResponsiveContainer,
  Label,
  Legend,
} from 'recharts';
import styles from './TodaysMacros.module.css';

interface TodaysMacrosProps {}

const data01 = [
  { name: 'Carb', value: 300 },
  { name: 'Fat', value: 56 },
  { name: 'Protein', value: 220 },
];

const COLORS = ['#22d1ee', '#775ada', '#facf5a'];

const Bullet = ({
  backgroundColor,
  size,
}: {
  backgroundColor: string;
  size: string;
}) => {
  return (
    <div
      className="CirecleBullet"
      style={{
        backgroundColor,
        width: size,
        height: size,
      }}
    ></div>
  );
};

const CustomizedLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className={styles.legendList}>
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`}>
          <div className={styles.bulletLabel}>
            <Bullet backgroundColor={entry.payload.fill} size="10px" />
            <div className={styles.bulletLabelText}>{entry.value}</div>
          </div>
          <div style={{ fontWeight: 500 }}>{entry.payload.value}g</div>
        </li>
      ))}
    </ul>
  );
};

const CustomLabel = ({
  viewBox,
  labelText,
  value,
}: {
  viewBox: any;
  labelText: string;
  value: string;
}) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        //   fill="#0088FE"
        fontSize="26"
        fontWeight="600"
      >
        {labelText}
      </text>
      <text
        x={cx}
        y={cy + 25}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fontSize="14"
      >
        {value}
      </text>
    </g>
  );
};

export const TodaysMacros: React.FC<TodaysMacrosProps> = ({}) => {
  return (
    <section className="mt-2  cursor-pointer">
      <h2 className="text-2xl text-[#2b3042] font-bold cursor-pointer">
        Today's Macros
      </h2>
      <div
        className="shadow min-w-[350px] rounded-lg cursor-pointer flex justify-center items-center bg-[#fafafa] hover:bg-gray-100 mt-5 pr-6"
        style={{ height: 270, width: '100%', display: 'block' }}
      >
        <ResponsiveContainer width="100%" height={270}>
          <PieChart layout="vertical">
            <Pie
              data={data01}
              dataKey="value"
              cx={120}
              cy={128}
              innerRadius={80}
              outerRadius={100}
            >
              {data01.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                content={
                  <CustomLabel
                    labelText="2,550"
                    value={'Remaining'}
                    viewBox={undefined}
                  />
                }
                position="center"
              />
            </Pie>
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              content={<CustomizedLegend />}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
