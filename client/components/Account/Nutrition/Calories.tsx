import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import {
  useGetCurrentUsersGoalsQuery,
  useGetCurrentUsersNutritionByDateQuery,
  useGetCurrentUsersRemainingCaloriesByDateQuery,
} from '../../../graphql/generated/graphql';

interface CaloriesProps {}

const CustomLabelv2 = ({
  viewBox,
  caloriesRemaining = 0,
}: {
  viewBox: any;
  caloriesRemaining: number;
}) => {
  const { cx, cy } = viewBox;
  return (
    <React.Fragment>
      <text
        x={cx}
        y={cy}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        //   fill="#0088FE"
        fontSize="36"
        fontWeight="600"
      >
        {caloriesRemaining}
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
        Remaining
      </text>
    </React.Fragment>
  );
};

const todaysDate = new Date().toISOString();

export const Calories: React.FC<CaloriesProps> = ({}) => {
  const { data: usersGoals, refetch: refetchUsersGoals } =
    useGetCurrentUsersGoalsQuery();
  const { data: todaysNutrition, refetch: refetchTodaysNutrition } =
    useGetCurrentUsersNutritionByDateQuery({
      date: todaysDate,
    });
  const { data: caloriesRemaining } =
    useGetCurrentUsersRemainingCaloriesByDateQuery({
      date: todaysDate,
    });

  const caloriesComsumedVsCaloriesRemainingData = [
    {
      name: 'Calories consumed',
      value:
        todaysNutrition?.getCurrentUsersNutritionByDate.data === null
          ? 0
          : caloriesRemaining?.getCurrentUsersRemainingCaloriesByDate,
    },
    {
      name: 'Calories remaining',
      value:
        todaysNutrition?.getCurrentUsersNutritionByDate.data === null
          ? usersGoals?.getCurrentUsersGoals.data?.calories
          :  (todaysNutrition?.getCurrentUsersNutritionByDate.data
            ?.calories as number) -
          (caloriesRemaining?.getCurrentUsersRemainingCaloriesByDate as number)
    },
  ];

  console.log('todaysNutrition: ', todaysNutrition);
  console.log('caloriesRemaining: ', caloriesRemaining);
  return (
    <section className="mt-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-[#2b3042] font-bold">Calories</h2>
        </div>
      </div>
      <div
        className="shadow min-w-[350px] rounded-lg cursor-pointer flex justify-center items-center bg-[#fafafa] hover:bg-gray-100 mt-3 pr-6"
        style={{ height: 270, width: '100%', display: 'block' }}
      >
        <ResponsiveContainer width="100%" height={270}>
          <PieChart>
            <Pie
              data={caloriesComsumedVsCaloriesRemainingData}
              dataKey="value"
              cx={175}
              cy={130}
              innerRadius={80}
              outerRadius={100}
            >
              {caloriesComsumedVsCaloriesRemainingData.map((entry, index) => {
                if (index === 1) {
                  // Calories remaining
                  if ((entry.value as number) < 0) {
                    return (
                      <Cell key={`cell-${index}`} fill="#f44336" stroke={'0'} />
                    );
                  } else {
                    return (
                      <Cell key={`cell-${index}`} fill="#f3f6f9" stroke={'0'} />
                    );
                  }
                }
                // Calories consumed
                if (
                  index === 0 &&
                  (caloriesComsumedVsCaloriesRemainingData[1].value as number) <
                    0
                ) {
                  return (
                    <Cell key={`cell-${index}`} fill="#f44336" stroke={'0'} />
                  );
                } else {
                  return (
                    <Cell key={`cell-${index}`} fill="#2E5DD1" stroke={'0'} />
                  );
                }
              })}
              <Label
                content={
                  <CustomLabelv2
                    viewBox={undefined}
                    caloriesRemaining={
                      // todaysNutrition?.getCurrentUsersNutritionByDate.data ===
                      // null
                      //   ? (usersGoals?.getCurrentUsersGoals.data
                      //       ?.calories as number)
                      //   : (usersGoals?.getCurrentUsersGoals.data
                      //       ?.calories as number) -
                      //     (todaysNutrition?.getCurrentUsersNutritionByDate.data
                      //       ?.calories as number)
                      caloriesRemaining?.getCurrentUsersRemainingCaloriesByDate as number
                    }
                  />
                }
                position="center"
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
