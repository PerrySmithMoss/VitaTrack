import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlinePlus,
} from 'react-icons/ai';
import styles from './Nutrition.module.css';
import {
  Food,
  useAddNutritionWithFoodsMutation,
  useDeleteFoodFromMealByDateMutation,
  useGetCurrentUsersFoodByDateQuery,
  useGetCurrentUsersGoalsQuery,
} from '../../../graphql/generated/graphql';
import {
  calculateGramsFromMacronutrient,
  calculatePercentage,
} from '../../../utils/macroCalculations';
import { isNumberPositive } from '../../../utils/isNumberPositive';
import {
  convertFloatToOneDecimalPlace,
  convertFloatToOneDecimalPlacev2,
} from '../../../utils/convertFloatToOneDecimalPlace';
import { Drawer } from '../../Drawer/Drawer';
import useDebounce from '../../../hooks/useDebounce';
import { FiChevronLeft } from 'react-icons/fi';
import { BasketItem } from './Basket/BasketItem';

interface FoodDiaryProps {}

const todaysDate = new Date();
const yesterdaysDate = new Date(Date.now() - 86400000);

type mealNames =
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Snacks'
  | 'Meal 5'
  | 'Meal 6'
  | undefined;

export const FoodDiary: React.FC<FoodDiaryProps> = ({}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(todaysDate);
  const [isShowingCalendar, setIsShowingCalendar] = useState(false);
  const [isAddFoodDrawerOpen, setIsAddFoodDrawerOpen] = useState(false);
  const [mealNameToEdit, setMealNameToEdit] = useState<mealNames>(undefined);

  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchTerm = useDebounce(searchInput, 1000);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [foods, setFoods] = useState<any>([]);
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);

  const { data: usersGoals, refetch: refetchUsersGoals } =
    useGetCurrentUsersGoalsQuery();

  const { data: usersFood, refetch: refetchUsersFood } =
    useGetCurrentUsersFoodByDateQuery({ date: selectedDate });

  const { mutate: deleteFood } = useDeleteFoodFromMealByDateMutation({
    onSuccess: () => refetchUsersFood(),
  });

  const { mutate: logFoods } = useAddNutritionWithFoodsMutation({
    onSuccess: () => refetchUsersFood(),
  });

  function sumBy(
    foodItemValues: Food[],
    key: 'calories' | 'carbohydrate' | 'protein' | 'fat' | 'sugar' | 'sodium',
    mealName:
      | 'Breakfast'
      | 'Lunch'
      | 'Dinner'
      | 'Snacks'
      | 'Meal 5'
      | 'Meal 6'
      | 'All'
  ) {
    const total = foodItemValues.reduce((acc, cur) => {
      if (mealName === 'All') {
        if (
          cur.servingSize === 'g' ||
          cur.servingSize === 'gram' ||
          cur.servingSize === 'grams'
        ) {
          return (acc += cur[key]);
        } else {
          return (acc += cur[key]);
        }
      }
      if (cur.mealName === mealName) {
        if (
          cur.servingSize === 'g' ||
          cur.servingSize === 'gram' ||
          cur.servingSize === 'grams'
        ) {
          return (acc += cur[key]);
        } else {
          return (acc += cur[key]);
        }
      }

      return acc;
    }, 0);

    return total;
  }

  function sumOfSelectedFoodsMacros() {
    const sum = selectedFoods.reduce(
      (acc, curr) => {
        return {
          ...acc,
          total_calories: acc.total_calories + curr.userMeasurements.calories,
          total_fat: acc.total_fat + curr.userMeasurements.fat,
          total_carbs: acc.total_carbs + curr.userMeasurements.carbs,
          total_protein: acc.total_protein + curr.userMeasurements.protein,
          total_sodium: acc.total_sodium + curr.userMeasurements.sodium,
        };
      },
      {
        total_calories: 0,
        total_fat: 0,
        total_carbs: 0,
        total_protein: 0,
        total_sodium: 0,
      }
    );
    return sum;
  }

  async function getFoods() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NUTRITIONIX_API_URL}/search/instant?query=${debouncedSearchTerm}`,
      {
        headers: {
          'x-app-id': process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID as string,
          'x-app-KEY': process.env.NEXT_PUBLIC_NUTRITIONIX_APP_KEY as string,
          'x-remote-user-id': '0',
        },
      }
    );

    const foodsJSON = await res.json();

    setFoods(foodsJSON ?? []);
    setIsSearching(false);
  }

  const handleChangeDate = (date: Date) => {
    setSelectedDate(date);
  };

  const memoizedSumOfSelectedFoodsMacros = useMemo(
    () => sumOfSelectedFoodsMacros(),
    [selectedFoods]
  );

  const handleGoForwardOneDay = () => {
    const tomorowsDate = selectedDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(new Date(tomorowsDate));
  };

  const handleGoBackOneDay = () => {
    const tomorowsDate = selectedDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(new Date(tomorowsDate));
  };

  const handleDeleteFood = (id: number, mealName: string) => {
    deleteFood({ foodId: id, mealName: mealName, date: selectedDate });
  };

  const handleShowAddFoodDrawer = (mealName: mealNames) => {
    setMealNameToEdit(mealName);
    setIsAddFoodDrawerOpen(!isAddFoodDrawerOpen);

    if (isAddFoodDrawerOpen) {
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'scroll';
      }
    } else {
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'hidden';
      }
    }
  };

  const handleSelectFood = async (food: any, type: 'branded' | 'common') => {
    if (type === 'branded') {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NUTRITIONIX_API_URL}/search/item?nix_item_id=${food.nix_item_id}`,
        {
          headers: {
            'x-app-id': process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID as string,
            'x-app-KEY': process.env.NEXT_PUBLIC_NUTRITIONIX_APP_KEY as string,
            'x-remote-user-id': '0',
          },
        }
      );

      const foodJSON = await res.json();
      const foodItem = foodJSON.foods[0];

      const defaultFoodItem = {
        ...foodItem,
        userMeasurements: {
          quantity: foodItem.serving_qty,
          measure: foodItem.serving_unit,
          servingWeight: foodItem.serving_weight_grams,
          calories: Math.round(foodItem.nf_calories),
          carbs: Math.round(foodItem.nf_total_carbohydrate),
          protein: Math.round(foodItem.nf_protein),
          fat: Math.round(foodItem.nf_total_fat),
          sodium: Math.round(foodItem.nf_sodium),
          sugar: Math.round(foodItem.nf_sugars),
        },
      };

      setSelectedFoods((prevState: any) => [...prevState, defaultFoodItem]);
    } else {
      const body = {
        query: food['food_name'],
        timezone: 'Europe/London',
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NUTRITIONIX_API_URL}/natural/nutrients`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'x-app-id': process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID as string,
            'x-app-KEY': process.env.NEXT_PUBLIC_NUTRITIONIX_APP_KEY as string,
            'x-remote-user-id': '0',
            'Content-Type': 'application/json',
          },
        }
      );

      const foodJSON = await res.json();
      const foodItem = foodJSON.foods[0];

      const defaultFoodItem = {
        ...foodItem,
        userMeasurements: {
          quantity: foodItem.serving_qty,
          measure: foodItem.serving_unit,
          servingWeight: foodItem.serving_weight_grams,
          calories: Math.round(foodItem.nf_calories),
          carbs: Math.round(foodItem.nf_total_carbohydrate),
          protein: Math.round(foodItem.nf_protein),
          fat: Math.round(foodItem.nf_total_fat),
          sodium: Math.round(foodItem.nf_sodium),
          sugar: Math.round(foodItem.nf_sugars),
        },
      };

      setSelectedFoods((prevState: any) => [...prevState, defaultFoodItem]);
    }
    setSearchInput('');
  };

  const handleLogFoods = () => {
    const loggedFoods = selectedFoods.map((food) => {
      if (
        food.userMeasurements.measure === 'g' ||
        food.userMeasurements.measure === 'gram' ||
        food.userMeasurements.measure === 'grams'
      ) {
        return {
          calories: convertFloatToOneDecimalPlacev2(
            food.userMeasurements.calories
          ),
          fat: convertFloatToOneDecimalPlacev2(food.userMeasurements.fat),
          carbohydrate: convertFloatToOneDecimalPlacev2(
            food.userMeasurements.carbs
          ),
          protein: convertFloatToOneDecimalPlacev2(
            food.userMeasurements.protein
          ),
          sodium: convertFloatToOneDecimalPlacev2(food.userMeasurements.sodium),
          sugar: convertFloatToOneDecimalPlacev2(food.userMeasurements.sugar),
          servingSize: food.userMeasurements.measure as string,
          name: food.food_name as string,
          numOfServings: food.userMeasurements.quantity as number,
          mealName: mealNameToEdit as string,
        };
      } else {
        return {
          calories: convertFloatToOneDecimalPlacev2(
            food.userMeasurements.calories
          ),
          fat: convertFloatToOneDecimalPlacev2(food.userMeasurements.fat),
          carbohydrate: convertFloatToOneDecimalPlacev2(
            food.userMeasurements.carbs
          ),
          protein: convertFloatToOneDecimalPlacev2(
            food.userMeasurements.protein
          ),
          sodium: convertFloatToOneDecimalPlacev2(food.userMeasurements.sodium),
          sugar: convertFloatToOneDecimalPlacev2(food.userMeasurements.sugar),
          servingSize: food.userMeasurements.measure as string,
          name: food.food_name as string,
          numOfServings: food.userMeasurements.quantity as number,
          mealName: mealNameToEdit as string,
        };
      }
    });

    logFoods({
      foods: loggedFoods,
      nutritionInput: {
        calories: usersGoals?.getCurrentUsersGoals.data?.calories,
        carbohydrate: usersGoals?.getCurrentUsersGoals.data?.carbohydrate,
        fat: usersGoals?.getCurrentUsersGoals.data?.fat,
        protein: usersGoals?.getCurrentUsersGoals.data?.protein,
        date: selectedDate.toISOString(),
      },
    });

    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'scroll';
    }

    setSelectedFoods([]);
    setIsAddFoodDrawerOpen(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm.length === 0) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // @TODO: Change this so that it only searches after
    // the user has typed a minimum of 3 characters.
    getFoods();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (searchInput.length === 0) {
      setIsSearching(false);

      return;
    }

    setIsSearching(true);
  }, [searchInput]);

  return (
    <div className="mt-0">
      <div>
        <div className="block md:flex items-center pb-5">
          <div>
            <h2 className="text-2xl text-[#2b3042] font-bold">
              Food Diary for:
            </h2>
          </div>
          <div className="flex items-center gap-1 ml-0 md:ml-3 mt-2 md:mt-0">
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleGoBackOneDay}
                aria-label="Go to yesterday's date"
                className="p-2 m-0 outline-none bg-[#00548F] rounded-l"
              >
                <FaChevronLeft size={24} color="white" />
              </button>
            </div>
            <div>
              <ReactDatePicker
                dateFormat="do, MMMM, yyyy"
                selected={selectedDate}
                onChange={(date) => handleChangeDate(date as Date)}
                onClickOutside={() => setIsShowingCalendar(!isShowingCalendar)}
                open={isShowingCalendar}
                onInputClick={() => setIsShowingCalendar(!isShowingCalendar)}
                className="block cursor-pointer text-center text-[20px] text-white px-4 py-[5px] font-bold bg-[#00548F]  w-full outline-none"
              />
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleGoForwardOneDay}
                aria-label="Go to tomorrow's date"
                className="p-2 m-0 outline-none bg-[#00548F]"
              >
                <FaChevronRight size={24} color="white" />
              </button>
            </div>
          </div>
        </div>
        <div className="block smm:hidden">
          <div className="bg-[#eee] pb-3 px-2 xxs:px-5 pt-3">
            <h3 className="text-lg text-[#2b3042] font-bold">
              Calories Remaining
            </h3>
            <div className="flex items-center w-full mt-2 xs:mt-5">
              <div className="flex items-center justify-between w-full px-2">
                {/* Goals */}
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <span>
                      {usersGoals?.getCurrentUsersGoals.data?.calories}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">Goal</span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl">-</span>
                </div>
                {/* Food */}
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <span>
                      {' '}
                      {usersFood?.getCurrentUsersFoodByDate.data &&
                        convertFloatToOneDecimalPlacev2(
                          sumBy(
                            usersFood?.getCurrentUsersFoodByDate.data as Food[],
                            'calories',
                            'All'
                          )
                        )}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">Food</span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl">=</span>
                </div>
                {/* Food */}
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <span
                      className={`${
                        usersFood?.getCurrentUsersFoodByDate.data &&
                        isNumberPositive(
                          convertFloatToOneDecimalPlacev2(
                            (usersGoals?.getCurrentUsersGoals.data
                              ?.calories as number) -
                              sumBy(
                                usersFood?.getCurrentUsersFoodByDate
                                  .data as Food[],
                                'calories',
                                'All'
                              )
                          )
                        )
                          ? styles.possitive
                          : styles.negative
                      }`}
                    >
                      {usersFood?.getCurrentUsersFoodByDate.data &&
                        convertFloatToOneDecimalPlacev2(
                          (usersGoals?.getCurrentUsersGoals.data
                            ?.calories as number) -
                            sumBy(
                              usersFood?.getCurrentUsersFoodByDate
                                .data as Food[],
                              'calories',
                              'All'
                            )
                        )}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">Remaining</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* <div className="flex items-center w-full mt-5"> */}
            <div className={styles.basketMacroBreakdown}>
              <div className={`${styles.basketMacroBreakdownCol}`}>
                {/* {memoizedSumOfSelectedFoodsMacros.total_protein.toLocaleString()} */}
                {usersFood?.getCurrentUsersFoodByDate.data &&
                  convertFloatToOneDecimalPlacev2(
                    sumBy(
                      usersFood?.getCurrentUsersFoodByDate.data as Food[],
                      'protein',
                      'All'
                    )
                  )}{' '}
                g<span>Protein</span>
              </div>
              <div className={`${styles.basketMacroBreakdownCol}`}>
                {usersFood?.getCurrentUsersFoodByDate.data &&
                  convertFloatToOneDecimalPlacev2(
                    sumBy(
                      usersFood?.getCurrentUsersFoodByDate.data as Food[],
                      'carbohydrate',
                      'All'
                    )
                  )}
                g<span>Carbs</span>
              </div>
              <div className={`${styles.basketMacroBreakdownCol}`}>
                {usersFood?.getCurrentUsersFoodByDate.data &&
                  convertFloatToOneDecimalPlacev2(
                    sumBy(
                      usersFood?.getCurrentUsersFoodByDate.data as Food[],
                      'fat',
                      'All'
                    )
                  )}
                g<span>Fat</span>
              </div>
              <div className={`${styles.basketMacroBreakdownCol}`}>
                {usersFood?.getCurrentUsersFoodByDate.data &&
                  convertFloatToOneDecimalPlacev2(
                    sumBy(
                      usersFood?.getCurrentUsersFoodByDate.data as Food[],
                      'sodium',
                      'All'
                    )
                  )}
                mg
                <span>Sodium</span>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className=" bg-[#f6f6f6]">
            <div className="flex items-center justify-between px-2 pt-3 pb-1 border-b">
              <div className={`text-[#00548f] font-bold uppercase`}>
                Breakfast{' '}
                <AiFillPlusCircle
                  size={23}
                  onClick={() => handleShowAddFoodDrawer('Breakfast')}
                  className="cursor-pointer inline-block mb-1 ml-1 text-brand-green hover:text-brand-green-hover"
                />
              </div>
              <div className="text-sm inline-block">
                {' '}
                <span className="font-bold">
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Breakfast'
                      ),
                      false
                    )}{' '}
                </span>
                calories
              </div>
            </div>
            <div className='bg-[#fff] py-1'>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Breakfast') {
                  return (
                    <div
                      key={foodEntry.id}
                      className="flex items-center justify-between pt-1"
                    >
                      <div className={`${styles.foodName}`}>
                        <div>
                          {foodEntry.name},{' '}
                          {`${foodEntry.numOfServings} ${foodEntry.servingSize}`}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="text-sm text-brand-green">
                          {convertFloatToOneDecimalPlace(
                            foodEntry.calories,
                            true
                          )}
                        </div>

                        <div>
                          <div className="inline">
                            <AiFillMinusCircle
                              size={21}
                              onClick={() =>
                                handleDeleteFood(
                                  parseInt(foodEntry.id),
                                  foodEntry.mealName
                                )
                              }
                              className="cursor-pointer inline mb-1 ml-2 mr-1  text-[red] hover:text-red-700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="flex items-center justify-between px-2 pt-3 pb-1 border-t border-b">
              <div className={`text-[#00548f] font-bold uppercase`}>
                Lunch
                <AiFillPlusCircle
                  size={23}
                  onClick={() => handleShowAddFoodDrawer('Lunch')}
                  className="cursor-pointer inline-block mb-1 ml-1 text-brand-green hover:text-brand-green-hover"
                />
              </div>
              <div className="text-sm inline-block">
                <span className="font-bold">
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Lunch'
                      ),
                      false
                    )}
                </span>{' '}
                calories
              </div>
            </div>
            <div className='bg-[#fff] py-1'>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Lunch') {
                  return (
                    <div
                      key={foodEntry.id}
                      className="flex items-center justify-between pt-1"
                    >
                      <div className={styles.foodName}>
                        <div>
                          {foodEntry.name},{' '}
                          {`${foodEntry.numOfServings} ${foodEntry.servingSize}`}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="text-sm text-brand-green">
                          {convertFloatToOneDecimalPlace(
                            foodEntry.calories,
                            true
                          )}
                        </div>

                        <div>
                          <div className="inline">
                            <AiFillMinusCircle
                              size={21}
                              onClick={() =>
                                handleDeleteFood(
                                  parseInt(foodEntry.id),
                                  foodEntry.mealName
                                )
                              }
                              className="cursor-pointer inline mb-1 ml-2 mr-1  text-[red] hover:text-red-700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="flex items-center justify-between px-2 pt-3 pb-1 border-t border-b">
              <div className={`text-[#00548f] font-bold uppercase`}>
                Dinner
                <AiFillPlusCircle
                  size={23}
                  onClick={() => handleShowAddFoodDrawer('Dinner')}
                  className="cursor-pointer inline-block mb-1 ml-1 text-brand-green hover:text-brand-green-hover"
                />
              </div>
              <div className="text-sm inline-block">
                {' '}
                <span className="font-bold">
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Dinner'
                      ),
                      false
                    )}
                </span>{' '}
                calories
              </div>
            </div>
            <div className='bg-[#fff] py-1'>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Dinner') {
                  return (
                    <div
                      key={foodEntry.id}
                      className="flex items-center justify-between pt-1"
                    >
                      <div className={styles.foodName}>
                        <div>
                          {foodEntry.name},{' '}
                          {`${foodEntry.numOfServings} ${foodEntry.servingSize}`}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="text-sm text-brand-green">
                          {convertFloatToOneDecimalPlace(
                            foodEntry.calories,
                            true
                          )}
                        </div>

                        <div>
                          <div>
                            <div className="inline">
                              <AiFillMinusCircle
                                size={21}
                                onClick={() =>
                                  handleDeleteFood(
                                    parseInt(foodEntry.id),
                                    foodEntry.mealName
                                  )
                                }
                                className="cursor-pointer inline mb-1 ml-2 mr-1  text-[red] hover:text-red-700"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="flex items-center justify-between px-2 pt-3 pb-1 border-t border-b">
              <div className={`text-[#00548f] font-bold uppercase`}>
                Snacks
                <AiFillPlusCircle
                  size={23}
                  onClick={() => handleShowAddFoodDrawer('Snacks')}
                  className="cursor-pointer inline-block mb-1 ml-1 text-brand-green hover:text-brand-green-hover"
                />
              </div>
              <div className="text-sm inline-block">
                {' '}
                <span className="font-bold">
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Snacks'
                      ),
                      false
                    )}
                </span>{' '}
                calories
              </div>
            </div>
            <div className='bg-[#fff] py-1'>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Snacks') {
                  return (
                    <div
                      key={foodEntry.id}
                      className="flex items-center justify-between pt-1"
                    >
                      <div className={styles.foodName}>
                        <div>
                          {foodEntry.name},{' '}
                          {`${foodEntry.numOfServings} ${foodEntry.servingSize}`}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="text-sm text-brand-green">
                          {convertFloatToOneDecimalPlace(
                            foodEntry.calories,
                            true
                          )}
                        </div>

                        <div>
                          <div className="inline">
                            <AiFillMinusCircle
                              size={21}
                              onClick={() =>
                                handleDeleteFood(
                                  parseInt(foodEntry.id),
                                  foodEntry.mealName
                                )
                              }
                              className="cursor-pointer inline mb-1 ml-2 mr-1  text-[red] hover:text-red-700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="flex items-center justify-between px-2 pt-3 pb-1 border-t border-b">
              <div className={`text-[#00548f] font-bold uppercase`}>
                Meal 5
                <AiFillPlusCircle
                  size={23}
                  onClick={() => handleShowAddFoodDrawer('Meal 5')}
                  className="cursor-pointer inline-block mb-1 ml-1 text-brand-green hover:text-brand-green-hover"
                />
              </div>
              <div className="text-sm inline-block">
                {' '}
                <span className="font-bold">
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Meal 5'
                      ),
                      false
                    )}
                </span>{' '}
                calories
              </div>
            </div>
            <div className='bg-[#fff] py-1'>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Meal 5') {
                  return (
                    <div
                      key={foodEntry.id}
                      className="flex items-center justify-between pt-1"
                    >
                      <div className={styles.foodName}>
                        <div>
                          {foodEntry.name},{' '}
                          {`${foodEntry.numOfServings} ${foodEntry.servingSize}`}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="text-sm text-brand-green">
                          {convertFloatToOneDecimalPlace(
                            foodEntry.calories,
                            true
                          )}
                        </div>

                        <div>
                          <div className="inline">
                            <AiFillMinusCircle
                              size={21}
                              onClick={() =>
                                handleDeleteFood(
                                  parseInt(foodEntry.id),
                                  foodEntry.mealName
                                )
                              }
                              className="cursor-pointer inline mb-1 ml-2 mr-1  text-[red] hover:text-red-700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="flex items-center justify-between px-2 pt-3 pb-1 border-t border-b">
              <div className={`text-[#00548f] font-bold uppercase`}>
                Meal 6
                <AiFillPlusCircle
                  size={23}
                  onClick={() => handleShowAddFoodDrawer('Meal 6')}
                  className="cursor-pointer inline-block mb-1 ml-1 text-brand-green hover:text-brand-green-hover"
                />
              </div>
              <div className="text-sm inline-block">
                {' '}
                <span className="font-bold">
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Meal 6'
                      ),
                      false
                    )}
                </span>{' '}
                calories
              </div>
            </div>
            <div className='bg-[#fff] py-1'>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Meal 6') {
                  return (
                    <div
                      key={foodEntry.id}
                      className="flex items-center justify-between pt-1"
                    >
                      <div className={styles.foodName}>
                        <div>
                          {foodEntry.name},{' '}
                          {`${foodEntry.numOfServings} ${foodEntry.servingSize}`}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="text-sm text-brand-green">
                          {convertFloatToOneDecimalPlace(
                            foodEntry.calories,
                            true
                          )}
                        </div>

                        <div>
                          <div className="inline">
                            <AiFillMinusCircle
                              size={21}
                              onClick={() =>
                                handleDeleteFood(
                                  parseInt(foodEntry.id),
                                  foodEntry.mealName
                                )
                              }
                              className="cursor-pointer inline mb-1 ml-2 mr-1  text-[red] hover:text-red-700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        <div className="hidden smm:block overflow-visible clear-both container">
          <table className={styles.foodDiaryTable}>
            <tbody>
              <tr>
                <td className={`${styles.mealHeading}`}>Breakfast</td>
                <td
                  className={`${styles.macrosHeading} ${styles.nutritionColumn}`}
                >
                  Calories
                  <div className={styles.tableCellSubtitle}>kcal</div>
                </td>
                <td
                  className={`${styles.macrosHeading} ${styles.nutritionColumn}`}
                >
                  Carbs
                  <div className={styles.tableCellSubtitle}>g</div>
                </td>
                <td
                  className={`${styles.macrosHeading} ${styles.nutritionColumn}`}
                >
                  Fat
                  <div className={styles.tableCellSubtitle}>g</div>
                </td>
                <td
                  className={`${styles.macrosHeading} ${styles.nutritionColumn}`}
                >
                  Protein
                  <div className={styles.tableCellSubtitle}>g</div>
                </td>
                <td
                  className={`${styles.macrosHeading} ${styles.nutritionColumn}`}
                >
                  Sodium
                  <div className={styles.tableCellSubtitle}>mg</div>
                </td>
                <td
                  className={`${styles.macrosHeading} ${styles.nutritionColumn}`}
                >
                  Sugar
                  <div className={styles.tableCellSubtitle}>g</div>
                </td>
              </tr>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Breakfast') {
                  return (
                    <tr key={foodEntry.id}>
                      <td className={styles.foodName}>
                        <a
                          className="js-show-edit-food"
                          data-food-entry-id="10049060228"
                          data-locale=""
                          href="#"
                        >
                          {foodEntry.name},{' '}
                          {`${foodEntry.numOfServings} ${foodEntry.servingSize}`}
                        </a>
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(
                          foodEntry.calories,
                          true
                        )}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(
                          foodEntry.carbohydrate,
                          true
                        )}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.fat, true)}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.protein, true)}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.sodium, true)}
                      </td>

                      <td>
                        {foodEntry.sugar === null
                          ? 0
                          : convertFloatToOneDecimalPlace(
                              foodEntry.sugar,
                              true
                            )}
                      </td>

                      <td className="delete">
                        <div className="flex items-center justify-center">
                          <AiFillMinusCircle
                            size={24}
                            onClick={() =>
                              handleDeleteFood(
                                parseInt(foodEntry.id),
                                foodEntry.mealName
                              )
                            }
                            className="cursor-pointer text-[red] hover:text-red-700"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
              <tr className={styles.bottom}>
                <td className={styles.foodName} style={{ zIndex: 9 }}>
                  <button
                    onClick={() => handleShowAddFoodDrawer('Breakfast')}
                    className={styles.addFood}
                  >
                    Add Food
                  </button>
                  {/* <div className={styles.quickTools}>
                    <a className="toggle_diary_options">Quick Tools</a>
                  </div> */}
                </td>
                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Breakfast'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'Breakfast'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'Breakfast'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'Breakfast'
                      ),
                      false
                    )}
                </td>

                <td>
                  {' '}
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sodium',
                        'Breakfast'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'Breakfast'
                      ),
                      false
                    )}
                </td>
              </tr>

              <tr>
                <td className={`${styles.mealHeading}`}>Lunch</td>
              </tr>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Lunch') {
                  return (
                    <tr key={foodEntry.id}>
                      <td className={styles.foodName}>
                        <a
                          className="js-show-edit-food"
                          data-food-entry-id="10049060228"
                          data-locale=""
                          href="#"
                        >
                          {foodEntry.name},{' '}
                          {`${foodEntry.numOfServings} ${foodEntry.servingSize}`}
                        </a>
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(
                          foodEntry.calories,
                          true
                        )}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(
                          foodEntry.carbohydrate,
                          true
                        )}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.fat, true)}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.protein, true)}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.sodium, true)}
                      </td>

                      <td>
                        {' '}
                        {foodEntry.sugar === null
                          ? 0
                          : convertFloatToOneDecimalPlace(
                              foodEntry.sugar,
                              true
                            )}
                      </td>

                      <td className="delete">
                        <div className="flex items-center justify-center">
                          <AiFillMinusCircle
                            size={24}
                            onClick={() =>
                              handleDeleteFood(
                                parseInt(foodEntry.id),
                                foodEntry.mealName
                              )
                            }
                            className="cursor-pointer text-[red] hover:text-red-700"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
              <tr className={styles.bottom}>
                <td className={styles.foodName} style={{ zIndex: 8 }}>
                  <button
                    onClick={() => handleShowAddFoodDrawer('Lunch')}
                    className={styles.addFood}
                  >
                    Add Food
                  </button>
                  {/* <div className={styles.quickTools}>
                    <a className="toggle_diary_options">Quick Tools</a>
                  </div> */}
                </td>
                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Lunch'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'Lunch'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'Lunch'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'Lunch'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sodium',
                        'Lunch'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'Lunch'
                      ),
                      false
                    )}
                </td>

                <td></td>
              </tr>
              <tr>
                <td className={`${styles.mealHeading}`}>Dinner</td>
              </tr>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Dinner') {
                  return (
                    <tr key={foodEntry.id}>
                      <td className={styles.foodName}>
                        <a
                          className="js-show-edit-food"
                          data-food-entry-id="10049060228"
                          data-locale=""
                          href="#"
                        >
                          {foodEntry.name},{' '}
                          {`${foodEntry.numOfServings} ${foodEntry.servingSize}`}
                        </a>
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(
                          foodEntry.calories,
                          true
                        )}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(
                          foodEntry.carbohydrate,
                          true
                        )}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.fat, true)}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.protein, true)}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.sodium, true)}
                      </td>

                      <td>
                        {' '}
                        {foodEntry.sugar === null
                          ? 0
                          : convertFloatToOneDecimalPlace(
                              foodEntry.sugar,
                              true
                            )}
                      </td>

                      <td className="delete">
                        <div className="flex items-center justify-center">
                          <AiFillMinusCircle
                            size={24}
                            onClick={() =>
                              handleDeleteFood(
                                parseInt(foodEntry.id),
                                foodEntry.mealName
                              )
                            }
                            className="cursor-pointer text-[red] hover:text-red-700"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
              <tr className={styles.bottom}>
                <td className={styles.foodName} style={{ zIndex: 9 }}>
                  <button
                    onClick={() => handleShowAddFoodDrawer('Dinner')}
                    className={styles.addFood}
                  >
                    Add Food
                  </button>
                  {/* <div className={styles.quickTools}>
                    <a className="toggle_diary_options">Quick Tools</a>
                  </div> */}
                </td>
                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Dinner'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'Dinner'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'Dinner'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'Dinner'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sodium',
                        'Dinner'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'Dinner'
                      ),
                      false
                    )}
                </td>

                <td></td>
              </tr>

              <tr>
                <td className={`${styles.mealHeading}`}>Snacks</td>
              </tr>

              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Snacks') {
                  return (
                    <tr key={foodEntry.id}>
                      <td className={styles.foodName}>
                        <a
                          className="js-show-edit-food"
                          data-food-entry-id="10049060228"
                          data-locale=""
                          href="#"
                        >
                          {foodEntry.name},{' '}
                          {`${foodEntry.numOfServings} ${foodEntry.servingSize}`}
                        </a>
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(
                          foodEntry.calories,
                          true
                        )}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(
                          foodEntry.carbohydrate,
                          true
                        )}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.fat, true)}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.protein, true)}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.sodium, true)}
                      </td>

                      <td>
                        {' '}
                        {foodEntry.sugar === null
                          ? 0
                          : convertFloatToOneDecimalPlace(
                              foodEntry.sugar,
                              true
                            )}
                      </td>

                      <td className="delete">
                        <div className="flex items-center justify-center">
                          <AiFillMinusCircle
                            size={24}
                            onClick={() =>
                              handleDeleteFood(
                                parseInt(foodEntry.id),
                                foodEntry.mealName
                              )
                            }
                            className="cursor-pointer text-[red] hover:text-red-700"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
              <tr className={styles.bottom}>
                <td className={styles.foodName} style={{ zIndex: 7 }}>
                  <button
                    onClick={() => handleShowAddFoodDrawer('Snacks')}
                    className={styles.addFood}
                  >
                    Add Food
                  </button>
                  {/* <div className={styles.quickTools}>
                    <a className="toggle_diary_options">Quick Tools</a>
                  </div> */}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Snacks'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'Snacks'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'Snacks'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'Snacks'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sodium',
                        'Snacks'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'Snacks'
                      ),
                      false
                    )}
                </td>

                <td></td>
              </tr>

              <tr>
                <td className={`${styles.mealHeading}`}>Meal&nbsp;5</td>
              </tr>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Meal 5') {
                  return (
                    <tr key={foodEntry.id}>
                      <td className={styles.foodName}>
                        <a
                          className="js-show-edit-food"
                          data-food-entry-id="10049060228"
                          data-locale=""
                          href="#"
                        >
                          {foodEntry.name},{' '}
                          {`${foodEntry.numOfServings} ${foodEntry.servingSize}`}
                        </a>
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(
                          foodEntry.calories,
                          true
                        )}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(
                          foodEntry.carbohydrate,
                          true
                        )}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.fat, true)}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.protein, true)}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.sodium, true)}
                      </td>

                      <td>
                        {' '}
                        {foodEntry.sugar === null
                          ? 0
                          : convertFloatToOneDecimalPlace(
                              foodEntry.sugar,
                              true
                            )}
                      </td>

                      <td className="delete">
                        <div className="flex items-center justify-center">
                          <AiFillMinusCircle
                            size={24}
                            onClick={() =>
                              handleDeleteFood(
                                parseInt(foodEntry.id),
                                foodEntry.mealName
                              )
                            }
                            className="cursor-pointer text-[red] hover:text-red-700"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
              <tr className={styles.bottom}>
                <td className={styles.foodName} style={{ zIndex: 6 }}>
                  <button
                    onClick={() => handleShowAddFoodDrawer('Meal 5')}
                    className={styles.addFood}
                  >
                    Add Food
                  </button>
                  {/* <div className={styles.quickTools}>
                    <a className="toggle_diary_options">Quick Tools</a>
                  </div> */}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Meal 5'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'Meal 5'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'Meal 5'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'Meal 5'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sodium',
                        'Meal 5'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'Meal 5'
                      ),
                      false
                    )}
                </td>

                <td></td>
              </tr>

              <tr>
                <td className={`${styles.mealHeading}`}>Meal&nbsp;6</td>
              </tr>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Meal 6') {
                  return (
                    <tr key={foodEntry.id}>
                      <td className={styles.foodName}>
                        <a
                          className="js-show-edit-food"
                          data-food-entry-id="10049060228"
                          data-locale=""
                          href="#"
                        >
                          {foodEntry.name},{' '}
                          {`${foodEntry.numOfServings} ${foodEntry.servingSize}`}
                        </a>
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(
                          (foodEntry.calories as number) *
                            foodEntry.numOfServings,
                          true
                        )}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(
                          foodEntry.carbohydrate,
                          true
                        )}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.fat, true)}
                      </td>

                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.protein, true)}
                      </td>
                      <td>
                        {convertFloatToOneDecimalPlace(foodEntry.sodium, true)}
                      </td>

                      <td>
                        {' '}
                        {foodEntry.sugar === null
                          ? 0
                          : convertFloatToOneDecimalPlace(
                              foodEntry.sugar,
                              true
                            )}
                      </td>

                      <td className="delete">
                        <div className="flex items-center justify-center">
                          <AiFillMinusCircle
                            size={24}
                            onClick={() =>
                              handleDeleteFood(
                                parseInt(foodEntry.id),
                                foodEntry.mealName
                              )
                            }
                            className="cursor-pointer text-[red] hover:text-red-700"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
              <tr className={styles.bottom}>
                <td className={styles.foodName} style={{ zIndex: 5 }}>
                  <button
                    onClick={() => handleShowAddFoodDrawer('Meal 6')}
                    className={styles.addFood}
                  >
                    Add Food
                  </button>
                  {/* <div className={styles.quickTools}>
                    <a className="toggle_diary_options">Quick Tools</a>
                  </div> */}
                </td>
                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Meal 6'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'Meal 6'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'Meal 6'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'Meal 6'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sodium',
                        'Meal 6'
                      ),
                      false
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'Meal 6'
                      ),
                      false
                    )}
                </td>

                <td></td>
              </tr>

              <tr className={styles.spacer}>
                <td className={styles.space} colSpan={6}>
                  &nbsp;
                </td>
                <td className={styles.emptyCell}>&nbsp;</td>
              </tr>

              <tr className={styles.totals}>
                <td className={styles.totalsFirstCell}>Totals</td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlacev2(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'All'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlacev2(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'All'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlacev2(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'All'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlacev2(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'All'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlacev2(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sodium',
                        'All'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlacev2(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'All'
                      )
                    )}
                </td>

                <td className={styles.emptyCell}></td>
              </tr>

              <tr className={styles.totals}>
                <td className={styles.totalsFirstCell}>Your Daily Goal </td>

                <td>{usersGoals?.getCurrentUsersGoals.data?.calories}</td>
                <td>
                  {usersGoals?.getCurrentUsersGoals.data &&
                    Math.round(
                      convertFloatToOneDecimalPlacev2(
                        calculateGramsFromMacronutrient(
                          calculatePercentage(
                            usersGoals?.getCurrentUsersGoals.data
                              ?.carbohydrate as number,
                            usersGoals?.getCurrentUsersGoals.data
                              ?.calories as number
                          ),
                          'carbohydrate'
                        )
                      )
                    )}
                </td>
                <td>
                  {usersGoals?.getCurrentUsersGoals.data &&
                    Math.round(
                      convertFloatToOneDecimalPlacev2(
                        calculateGramsFromMacronutrient(
                          calculatePercentage(
                            usersGoals?.getCurrentUsersGoals.data
                              ?.fat as number,
                            usersGoals?.getCurrentUsersGoals.data
                              ?.calories as number
                          ),
                          'fat'
                        )
                      )
                    )}
                </td>
                <td>
                  {usersGoals?.getCurrentUsersGoals.data &&
                    Math.round(
                      convertFloatToOneDecimalPlacev2(
                        calculateGramsFromMacronutrient(
                          calculatePercentage(
                            usersGoals?.getCurrentUsersGoals.data
                              ?.protein as number,
                            usersGoals?.getCurrentUsersGoals.data
                              ?.calories as number
                          ),
                          'protein'
                        )
                      )
                    )}
                </td>
                <td>2,300</td>
                <td>74</td>
                <td className={styles.emptyCell}></td>
              </tr>

              <tr className={styles.totals}>
                <td className={styles.totalsFirstCell}>Remaining</td>

                <td
                  className={`${
                    usersFood?.getCurrentUsersFoodByDate.data &&
                    isNumberPositive(
                      convertFloatToOneDecimalPlacev2(
                        (usersGoals?.getCurrentUsersGoals.data
                          ?.calories as number) -
                          sumBy(
                            usersFood?.getCurrentUsersFoodByDate.data as Food[],
                            'calories',
                            'All'
                          )
                      )
                    )
                      ? styles.possitive
                      : styles.negative
                  }`}
                >
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlacev2(
                      (usersGoals?.getCurrentUsersGoals.data
                        ?.calories as number) -
                        sumBy(
                          usersFood?.getCurrentUsersFoodByDate.data as Food[],
                          'calories',
                          'All'
                        )
                    )}
                </td>
                <td
                  className={`${
                    usersFood?.getCurrentUsersFoodByDate.data &&
                    isNumberPositive(
                      convertFloatToOneDecimalPlacev2(
                        Math.round(
                          calculateGramsFromMacronutrient(
                            calculatePercentage(
                              usersGoals?.getCurrentUsersGoals.data
                                ?.carbohydrate as number,
                              usersGoals?.getCurrentUsersGoals.data
                                ?.calories as number
                            ),
                            'carbohydrate'
                          )
                        ) -
                          sumBy(
                            usersFood?.getCurrentUsersFoodByDate.data as Food[],
                            'carbohydrate',
                            'All'
                          )
                      )
                    )
                      ? styles.possitive
                      : styles.negative
                  }`}
                >
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlacev2(
                      Math.round(
                        calculateGramsFromMacronutrient(
                          calculatePercentage(
                            usersGoals?.getCurrentUsersGoals.data
                              ?.carbohydrate as number,
                            usersGoals?.getCurrentUsersGoals.data
                              ?.calories as number
                          ),
                          'carbohydrate'
                        )
                      ) -
                        sumBy(
                          usersFood?.getCurrentUsersFoodByDate.data as Food[],
                          'carbohydrate',
                          'All'
                        )
                    )}
                </td>
                <td
                  className={`${
                    usersFood?.getCurrentUsersFoodByDate.data &&
                    isNumberPositive(
                      convertFloatToOneDecimalPlacev2(
                        Math.round(
                          calculateGramsFromMacronutrient(
                            calculatePercentage(
                              usersGoals?.getCurrentUsersGoals.data
                                ?.fat as number,
                              usersGoals?.getCurrentUsersGoals.data
                                ?.calories as number
                            ),
                            'fat'
                          )
                        ) -
                          sumBy(
                            usersFood?.getCurrentUsersFoodByDate.data as Food[],
                            'fat',
                            'All'
                          )
                      )
                    )
                      ? styles.possitive
                      : styles.negative
                  }`}
                >
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      Math.round(
                        calculateGramsFromMacronutrient(
                          calculatePercentage(
                            usersGoals?.getCurrentUsersGoals.data
                              ?.fat as number,
                            usersGoals?.getCurrentUsersGoals.data
                              ?.calories as number
                          ),
                          'fat'
                        )
                      ) -
                        sumBy(
                          usersFood?.getCurrentUsersFoodByDate.data as Food[],
                          'fat',
                          'All'
                        ),
                      true
                    )}
                </td>
                <td
                  className={`${
                    usersFood?.getCurrentUsersFoodByDate.data &&
                    isNumberPositive(
                      convertFloatToOneDecimalPlacev2(
                        Math.round(
                          calculateGramsFromMacronutrient(
                            calculatePercentage(
                              usersGoals?.getCurrentUsersGoals.data
                                ?.protein as number,
                              usersGoals?.getCurrentUsersGoals.data
                                ?.calories as number
                            ),
                            'protein'
                          )
                        ) -
                          sumBy(
                            usersFood?.getCurrentUsersFoodByDate.data as Food[],
                            'protein',
                            'All'
                          )
                      )
                    )
                      ? styles.possitive
                      : styles.negative
                  }`}
                >
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      Math.round(
                        calculateGramsFromMacronutrient(
                          calculatePercentage(
                            usersGoals?.getCurrentUsersGoals.data
                              ?.protein as number,
                            usersGoals?.getCurrentUsersGoals.data
                              ?.calories as number
                          ),
                          'protein'
                        )
                      ) -
                        sumBy(
                          usersFood?.getCurrentUsersFoodByDate.data as Food[],
                          'protein',
                          'All'
                        ),
                      true
                    )}
                </td>
                <td
                  className={`${
                    usersFood?.getCurrentUsersFoodByDate.data &&
                    isNumberPositive(
                      convertFloatToOneDecimalPlacev2(
                        2300 -
                          sumBy(
                            usersFood?.getCurrentUsersFoodByDate.data as Food[],
                            'sodium',
                            'All'
                          )
                      )
                    )
                      ? styles.possitive
                      : styles.negative
                  }`}
                >
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlacev2(
                      2300 -
                        sumBy(
                          usersFood?.getCurrentUsersFoodByDate.data as Food[],
                          'sodium',
                          'All'
                        )
                    )}
                </td>
                <td
                  className={`${
                    usersFood?.getCurrentUsersFoodByDate.data &&
                    isNumberPositive(
                      convertFloatToOneDecimalPlacev2(
                        74 -
                          sumBy(
                            usersFood?.getCurrentUsersFoodByDate.data as Food[],
                            'sugar',
                            'All'
                          )
                      )
                    )
                      ? styles.possitive
                      : styles.negative
                  }`}
                >
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlacev2(
                      74 -
                        sumBy(
                          usersFood?.getCurrentUsersFoodByDate.data as Food[],
                          'sugar',
                          'All'
                        )
                    )}
                </td>
                <td className={styles.emptyCell}></td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <td className={styles.totalsFirstCell}></td>
                <td
                  className={`${styles.macrosHeading} ${styles.nutritionColumn}`}
                >
                  Calories
                  <div className={styles.tableCellSubtitle}>kcal</div>
                </td>
                <td
                  className={`${styles.macrosHeading} ${styles.nutritionColumn}`}
                >
                  Carbs
                  <div className={styles.tableCellSubtitle}>g</div>
                </td>
                <td
                  className={`${styles.macrosHeading} ${styles.nutritionColumn}`}
                >
                  Fat
                  <div className={styles.tableCellSubtitle}>g</div>
                </td>
                <td
                  className={`${styles.macrosHeading} ${styles.nutritionColumn}`}
                >
                  Protein
                  <div className={styles.tableCellSubtitle}>g</div>
                </td>
                <td
                  className={`${styles.macrosHeading} ${styles.nutritionColumn}`}
                >
                  Sodium
                  <div className={styles.tableCellSubtitle}>mg</div>
                </td>
                <td
                  className={`${styles.macrosHeading} ${styles.nutritionColumn}`}
                >
                  Sugar
                  <div className={styles.tableCellSubtitle}>g</div>
                </td>
                <td className={styles.emptyCell}></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <Drawer
          isOpen={isAddFoodDrawerOpen}
          setIsOpen={() => handleShowAddFoodDrawer(undefined)}
          title="Add Food"
          size="md"
        >
          <div>
            <header className="flex items-center justify-between px-4 py-4 bg-brand-green text-white ">
              <div className="flex items-center justify-between w-full">
                {selectedFoods.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setSelectedFoods([])}
                      className="relative pr-1 cursor-pointer flex text-center items-center justify-center h-8 w-8 rounded-full bg-brand-green hover:bg-brand-green-hover"
                      data-modal-toggle="default-modal"
                    >
                      <FiChevronLeft
                        size={30}
                        className="cursor-pointer text-white group-hover:text-gray-200"
                      />
                    </button>
                  </div>
                )}
                {selectedFoods.length > 0 ? (
                  <h2 className="font-bold text-2xl">Basket</h2>
                ) : (
                  <h2 className="font-bold text-2xl">Add Food</h2>
                )}

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="relative cursor-pointer flex text-center items-center justify-center h-8 w-8 rounded-full bg-brand-green hover:bg-brand-green-hover"
                    data-modal-toggle="default-modal"
                  >
                    <AiOutlinePlus
                      onClick={() => handleShowAddFoodDrawer(undefined)}
                      style={{ transform: 'rotate(45deg)' }}
                      size={30}
                      color="white"
                    />
                  </button>
                </div>
              </div>
            </header>
            <div className="mx-4 mt-4">
              <div>
                <h3 className="font-bold text-xl text-gray-800">
                  Search by food name
                </h3>
              </div>
              <div className="flex w-full relative justify-center items-center pt-1">
                <div className="static mt-1 w-full">
                  <input
                    type="text"
                    id="searchExercises"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-brand-green focus:border-brand-green w-full pl-3 p-2.5"
                    placeholder="Search"
                  />
                  <div className="absolute top-[19px] right-0 flex items-center px-3 pointer-events-none">
                    <div>
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {!isSearching && debouncedSearchTerm.length > 0 && foods && (
                    <div
                      className={`border rounded-bl rounded-br absolute ${styles.foodChoicesList}`}
                    >
                      <div>
                        <p className="text-gray-500 font-semibold py-1  text-sm mt-2 pl-3 border-b">
                          Common Foods {`(${foods['common'].length})`}
                        </p>
                        {!isSearching &&
                          debouncedSearchTerm.length > 0 &&
                          foods &&
                          Object.keys(foods).length > 0 && (
                            <div>
                              {foods['common'].slice(0, 5).map((food: any) => (
                                <div
                                  key={food.food_name}
                                  onClick={() =>
                                    handleSelectFood(food, 'common')
                                  }
                                  className="border-b px-4 p-1 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  <div>
                                    <Image
                                      src={food['photo']['thumb']}
                                      height={30}
                                      width={30}
                                    />
                                  </div>
                                  <div>
                                    <p>{food.food_name}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                      <div className="mt-3">
                        <p className="text-gray-500 font-semibold py-1  text-sm mt-1 pl-3 border-b">
                          Branded Foods {`(${foods['branded'].length})`}
                        </p>
                        {!isSearching &&
                          debouncedSearchTerm.length > 0 &&
                          foods &&
                          Object.keys(foods).length > 0 && (
                            <div>
                              {foods['branded'].slice(0, 5).map((food: any) => (
                                <div
                                  key={food.food_name}
                                  onClick={() =>
                                    handleSelectFood(food, 'branded')
                                  }
                                  className="border-b px-4 p-1 flex items-center justify-between space-x-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  <div className="flex items-center space-x-2 ">
                                    <div>
                                      <Image
                                        src={food['photo']['thumb']}
                                        height={30}
                                        width={30}
                                      />
                                    </div>
                                    <div>
                                      <p>{food.food_name}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center pr-1">
                                    <div className="font-medium text-green-500">
                                      {Math.round(food.nf_calories)}
                                    </div>
                                    <div>cal</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {selectedFoods.length > 0 && (
                <ul className="mt-4">
                  {selectedFoods.map((food: any) => (
                    <BasketItem
                      key={food.food_name}
                      food={food}
                      selectedFoods={selectedFoods}
                      setSelectedFoods={setSelectedFoods}
                    />
                  ))}
                </ul>
              )}

              {selectedFoods.length > 0 && (
                <div>
                  <div className="bg-gray-200 flex justify-between items-center py-2 px-4">
                    <div>
                      <h4>Total Calories</h4>
                    </div>
                    <div>
                      <span className="text-green-500">
                        {Math.round(
                          memoizedSumOfSelectedFoodsMacros.total_calories
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className={styles.basketMacroBreakdown}>
                    <div className={`${styles.basketMacroBreakdownCol}`}>
                      {memoizedSumOfSelectedFoodsMacros.total_protein.toLocaleString()}
                      g<span>Protein</span>
                    </div>
                    <div className={`${styles.basketMacroBreakdownCol}`}>
                      {memoizedSumOfSelectedFoodsMacros.total_carbs.toLocaleString()}
                      g<span>Carbs</span>
                    </div>
                    <div className={`${styles.basketMacroBreakdownCol}`}>
                      {memoizedSumOfSelectedFoodsMacros.total_fat.toLocaleString()}
                      g<span>Fat</span>
                    </div>
                    <div className={`${styles.basketMacroBreakdownCol}`}>
                      {memoizedSumOfSelectedFoodsMacros.total_sodium.toLocaleString()}
                      mg
                      <span>Sodium</span>
                    </div>
                  </div>

                  {/* <div className="py-7">
                    <hr />
                  </div>
                  <div className=" flex justify-between pr-2">
                    <div>
                      <p>
                        {' '}
                        <b>When: </b> {selectedDate.toDateString()}, Breakfast
                      </p>
                    </div>
                    <div>
                      <FaChevronDown
                        size={18}
                        // className="text-[#0073e6] group-hover:text-blue-700"
                        className="text-gray-700 cursor-pointer"
                      />
                    </div>
                  </div> */}
                  <div>
                    <div>
                      {selectedFoods.length === 0 ? (
                        <button
                          disabled={true}
                          className="w-full cursor-not-allowed opacity-50 mt-8 py-2 bg-brand-green text-white text-bold rounded hover:bg-brand-green-hover"
                        >
                          Log {selectedFoods.length} foods
                        </button>
                      ) : selectedFoods.length === 1 ? (
                        <button
                          onClick={handleLogFoods}
                          className="w-full mt-8 py-2 bg-brand-green text-white text-bold rounded hover:bg-brand-green-hover"
                        >
                          Log {selectedFoods.length} food
                        </button>
                      ) : (
                        <button
                          onClick={handleLogFoods}
                          className="w-full mt-8 py-2 bg-brand-green text-white text-bold rounded hover:bg-brand-green-hover"
                        >
                          Log {selectedFoods.length} foods
                        </button>
                      )}
                    </div>
                    <div className="flex justify-center mt-4 group">
                      <button
                        onClick={() => setSelectedFoods([])}
                        className="flex items-center gap-1"
                      >
                        <div>
                          <FaPlus
                            style={{ transform: 'rotate(45deg)' }}
                            size={18}
                            className="text-[#0073e6] group-hover:text-blue-700"
                          />
                        </div>
                        <div className="mt-1 text-[#0073e6] group-hover:text-blue-700">
                          Clear basket
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};
