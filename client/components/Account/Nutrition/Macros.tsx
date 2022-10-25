import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Sector,
  ResponsiveContainer,
  Label,
  Legend,
} from 'recharts';
import {
  useGetCurrentUsersGoalsQuery,
  useGetCurrentUsersNutritionByDateQuery,
  useGetCurrentUsersRemainingCaloriesByDateQuery,
  useUpsertUserGoalsMutation,
} from '../../../graphql/generated/graphql';
import {
  calculateGramsFromMacronutrient,
  calculatePercentage,
} from '../../../utils/macroCalculations';
import { Modal } from '../../Modals/Modal';
import styles from './Nutrition.module.css';

interface MacrosProps {}

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
        fontSize="36"
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

const todaysDate = new Date().toISOString();

export const Macros: React.FC<MacrosProps> = ({}) => {
  const { data: usersGoals, refetch: refetchUsersGoals } = useGetCurrentUsersGoalsQuery();
  const { refetch: refetchUsersRemainingCalories } =
  useGetCurrentUsersRemainingCaloriesByDateQuery({
    date: todaysDate,
  });
  const { mutate } = useUpsertUserGoalsMutation({ onSuccess: () => {
    refetchUsersGoals()
    refetchUsersRemainingCalories()
  } });

  const [isEditMacrosOpen, setIsEditMacrosModalOpen] = useState(false);
  const [caloriesInput, setCaloriesInput] = useState(
    usersGoals?.getCurrentUsersGoals.data?.calories == null
      ? 0
      : usersGoals?.getCurrentUsersGoals.data?.calories
  );
  const [proteinInput, setProteinInput] = useState(
    usersGoals?.getCurrentUsersGoals.data?.protein == null
      ? 0
      : usersGoals?.getCurrentUsersGoals.data?.protein
  );
  const [carbohydrateInput, setCarbohydrateInput] = useState(
    usersGoals?.getCurrentUsersGoals.data?.carbohydrate == null
      ? 0
      : usersGoals?.getCurrentUsersGoals.data?.carbohydrate
  );
  const [fatInput, setFatInput] = useState(
    usersGoals?.getCurrentUsersGoals.data?.fat == null
      ? 0
      : usersGoals?.getCurrentUsersGoals.data?.fat
  );

  const handleCompleteEditingMacros = () => {
    mutate({
      goalsInput: {
        calories: caloriesInput,
        protein: proteinInput,
        carbohydrate: carbohydrateInput,
        fat: fatInput,
      },
    });

    setIsEditMacrosModalOpen(false);
  };

  useEffect(() => {
    setCaloriesInput(
      usersGoals?.getCurrentUsersGoals.data?.calories == null
        ? 0
        : usersGoals?.getCurrentUsersGoals.data?.calories
    );
  }, [usersGoals?.getCurrentUsersGoals.data?.calories]);

  useEffect(() => {
    setProteinInput(
      usersGoals?.getCurrentUsersGoals.data?.protein == null
        ? 0
        : usersGoals?.getCurrentUsersGoals.data?.protein
    );
  }, [usersGoals?.getCurrentUsersGoals.data?.protein]);

  useEffect(() => {
    setCarbohydrateInput(
      usersGoals?.getCurrentUsersGoals.data?.carbohydrate == null
        ? 0
        : usersGoals?.getCurrentUsersGoals.data?.carbohydrate
    );
  }, [usersGoals?.getCurrentUsersGoals.data?.carbohydrate]);

  useEffect(() => {
    setFatInput(
      usersGoals?.getCurrentUsersGoals.data?.fat == null
        ? 0
        : usersGoals?.getCurrentUsersGoals.data?.fat
    );
  }, [usersGoals?.getCurrentUsersGoals.data?.fat]);

  const data01 = [
    {
      name: 'Carb',
      value: Math.round(
        calculateGramsFromMacronutrient(
          calculatePercentage(
            usersGoals?.getCurrentUsersGoals.data?.carbohydrate === null ||
            usersGoals?.getCurrentUsersGoals.data?.carbohydrate === undefined
              ? 0
              : usersGoals?.getCurrentUsersGoals.data?.carbohydrate,
              usersGoals?.getCurrentUsersGoals.data?.calories === null ||
              usersGoals?.getCurrentUsersGoals.data?.calories === undefined
              ? 0
              : usersGoals?.getCurrentUsersGoals.data?.calories
          ),
          'protein'
        )
      ),
    },
    {
      name: 'Fat',
      value: Math.round(
        calculateGramsFromMacronutrient(
          calculatePercentage(
            usersGoals?.getCurrentUsersGoals.data?.fat === null ||
            usersGoals?.getCurrentUsersGoals.data?.fat === undefined
              ? 0
              : usersGoals?.getCurrentUsersGoals.data?.fat,
              usersGoals?.getCurrentUsersGoals.data?.calories === null ||
              usersGoals?.getCurrentUsersGoals.data?.calories === undefined
              ? 0
              : usersGoals?.getCurrentUsersGoals.data?.calories
          ),
          'fat'
        )
      ),
    },
    {
      name: 'Protein',
      value: Math.round(
        calculateGramsFromMacronutrient(
          calculatePercentage(
            usersGoals?.getCurrentUsersGoals.data?.protein === null ||
            usersGoals?.getCurrentUsersGoals.data?.protein === undefined
              ? 0
              : usersGoals?.getCurrentUsersGoals.data?.protein,
              usersGoals?.getCurrentUsersGoals.data?.calories === null ||
              usersGoals?.getCurrentUsersGoals.data?.calories === undefined
              ? 0
              : usersGoals?.getCurrentUsersGoals.data?.calories
          ),
          'protein'
        )
      ),
    },
  ];

  return (
    <section className="mt-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-[#2b3042] font-bold">Macros</h2>
        </div>
        <div>
          <button
            onClick={() => setIsEditMacrosModalOpen(!isEditMacrosOpen)}
            className="p-0 m-0 text-blue-600 hover:text-blue-500"
          >
            Edit
          </button>
        </div>
      </div>
      <div
        className="shadow min-w-[350px] rounded-lg cursor-pointer flex justify-center items-center bg-[#fafafa] hover:bg-gray-100 mt-3 pr-6"
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
                    labelText={`${
                      usersGoals?.getCurrentUsersGoals.data?.calories
                    }`}
                    value={'Calories'}
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
      {isEditMacrosOpen && (
        <Modal
          open={isEditMacrosOpen}
          onClose={() => setIsEditMacrosModalOpen(false)}
          selector="editMacrosModal"
          title="Daily Nutrition Goals"
        >
          <div className="relative flex  flex-col overflow-x-hidden w-full flex-grow flex-shrink min-h-0 overflow-auto">
            <div className="overflow-y-auto h-auto max-h-[600px] w-full">
              <section className="w-full flex flex-col mb-4">
                <div>
                  <div className="flex items-center bg-gray-100 border-b border-t">
                    <div className="block  text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <span>Calories:</span>
                    </div>
                    <div className="flex justify-end bg-gray-100 text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <input
                        type="text"
                        name="calories"
                        value={(caloriesInput as number) || 0}
                        // defaultValue={data?.getCurrentUsersGoals.data?.calories as number}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        onChange={(e) =>
                          setCaloriesInput(parseInt(e.target.value))
                        }
                        className="bg-gray-50 text-gray-800 text-center border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block w-3/4 p-2.5"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="block border-l text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <span className="font-bold">Macronutrients</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 border-t">
                    <div className="flex items-center gap-2 border-l text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <div>
                        <span>Protein</span>
                      </div>
                      <div>
                        <span className="text-sm">
                          {Math.round(
                            calculateGramsFromMacronutrient(
                              calculatePercentage(proteinInput, caloriesInput),
                              'protein'
                            )
                          )}
                          g
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <select
                        name="protein"
                        onChange={(e) =>
                          setProteinInput(parseInt(e.target.value))
                        }
                        value={proteinInput}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                      >
                        {[...new Array(21)].map((each, index) => {
                          const value = index * 5;
                          return (
                            <option
                              key={value}
                              className="text-center text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500  block w-3/4 p-2.5"
                              value={value}
                            >
                              {value}%
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 border-t">
                    <div className="flex items-center gap-2 border-l text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <div>
                        <span>Carbohydrates</span>
                      </div>
                      <div>
                        <span className="text-sm">
                          {Math.round(
                            calculateGramsFromMacronutrient(
                              calculatePercentage(
                                carbohydrateInput,
                                caloriesInput
                              ),
                              'carbohydrate'
                            )
                          )}
                          g
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end text-gray-800  bg-transparent py-3 px-4 w-full outline-none">
                      <select
                        name="carbohydrates"
                        onChange={(e) =>
                          setCarbohydrateInput(parseInt(e.target.value))
                        }
                        value={carbohydrateInput}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                      >
                        {[...new Array(21)].map((each, index) => {
                          const value = index * 5;
                          return (
                            <option
                              key={value}
                              className="text-center text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500  block w-3/4 p-2.5"
                              value={value}
                            >
                              {value}%
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 border-t">
                    <div className="flex items-center gap-2 border-l text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <div>
                        <span>Fat</span>
                      </div>
                      <div>
                        <span className="text-sm">
                          {Math.round(
                            calculateGramsFromMacronutrient(
                              calculatePercentage(fatInput, caloriesInput),
                              'fat'
                            )
                          )}
                          g
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <select
                        name="fat"
                        value={fatInput}
                        onChange={(e) => setFatInput(parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                      >
                        {[...new Array(21)].map((each, index) => {
                          const value = index * 5;
                          return (
                            <option
                              key={value}
                              className="text-center text-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500  block w-3/4 p-2.5"
                              value={value}
                            >
                              {value}%
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center border-b bg-gray-100 border-t">
                    <div className="block border-l text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <div>
                        <span className="font-bold text-sm">% Total</span>
                      </div>
                      <div>
                        <span className="text-sm">
                          Macronutrients must equal 100%
                        </span>
                      </div>
                    </div>
                    <div className="py-3 px-4">
                      {proteinInput + carbohydrateInput + fatInput === 100 ? (
                        <span className="text-green-500 text-xl">
                          {proteinInput + carbohydrateInput + fatInput}%
                        </span>
                      ) : (
                        <span className="text-red-500 text-xl">
                          {proteinInput + carbohydrateInput + fatInput}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </section>
              <footer className="flex justify-end px-8 pb-6 pt-8">
                <button
                  disabled={proteinInput + carbohydrateInput + fatInput !== 100}
                  onClick={handleCompleteEditingMacros}
                  className={`rounded px-5 py-1.5 bg-brand-green  text-white focus:shadow-outline focus:outline-none ${
                    proteinInput + carbohydrateInput + fatInput !== 100
                      ? `opacity-50 cursor-not-allowed`
                      : `hover:bg-brand-green-hover`
                  }`}
                >
                  Complete
                </button>
                <button
                  onClick={() => setIsEditMacrosModalOpen(false)}
                  id="cancel"
                  className="ml-3 rounded-sm px-3 hover:text-gray-600 focus:shadow-outline focus:outline-none"
                >
                  Cancel
                </button>
              </footer>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
