import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiCalendar } from 'react-icons/bi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiFillMinusCircle } from 'react-icons/ai';
import styles from './Nutrition.module.css';
import {
  Food,
  useGetCurrentUsersFoodByDateQuery,
  useGetCurrentUsersGoalsQuery,
} from '../../../graphql/generated/graphql';
import {
  calculateGramsFromMacronutrient,
  calculatePercentage,
} from '../../../utils/macroCalculations';

interface FoodDiaryProps {}

const todaysDate = new Date();
const yesterdaysDate = new Date(Date.now() - 86400000);

export const FoodDiary: React.FC<FoodDiaryProps> = ({}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(todaysDate);
  const [isShowingCalendar, setIsShowingCalendar] = useState(false);
  const { data: usersGoals, refetch: refetchUsersGoals } =
    useGetCurrentUsersGoalsQuery();
  const { data: usersFood, refetch: refetchUsersFood } =
    useGetCurrentUsersFoodByDateQuery({ date: selectedDate });
  console.log('usersGoals: ', usersGoals);

  const handleChangeDate = (date: Date | null) => {
    setSelectedDate(date);
    // refetchUsersFood({date: selectedDate});
  };

  function convertFloatToOneDecimalPlace(number: number) {
    const isDecimal = number - Math.floor(number) !== 0;

    if (isDecimal) {
      return parseFloat(((Math.round(number * 100) / 100).toFixed(1)));
    } else {
      return number;
    }
  }

  function isNumberPositive(num: number) {
    if(isNaN(Number(num)) || Number(num) < 0) {
      return false;
    } else {
      return true
    }
  }

  function sumBy(
    foodItemValues: Food[],
    key: 'calories' | 'carbohydrate' | 'protein' | 'fat' | 'sugar',
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
        if (cur.servingSize === 'g') {
          return (acc += cur[key]);
        } else {
          return (acc += cur[key] * cur.numOfServings);
        }
      }
      if (cur.mealName === mealName) {
        if (cur.servingSize === 'g') {
          return (acc += cur[key]);
        } else {
          return (acc += cur[key] * cur.numOfServings);
        }
      }

      return acc;
    }, 0);

    return total;
  }

  return (
    <div className="mt-10">
      <div className=" border-t-2">
        <div className="flex items-center py-5">
          <div>
            <h2 className="text-2xl text-[#2b3042] font-bold">
              Food Diary for:
            </h2>
          </div>
          <div className="flex items-center gap-1 ml-3">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsShowingCalendar(!isShowingCalendar)}
                aria-label="Choose Date"
                className="p-2 m-0 outline-none bg-[#00548F] rounded-l"
              >
                <FaChevronLeft size={24} color="white" />
              </button>
            </div>
            <div>
              <ReactDatePicker
                dateFormat="do, MMMM, yyyy"
                selected={selectedDate}
                onChange={(date) => handleChangeDate(date)}
                onClickOutside={() => setIsShowingCalendar(!isShowingCalendar)}
                open={isShowingCalendar}
                onInputClick={() => setIsShowingCalendar(!isShowingCalendar)}
                className="block cursor-pointer text-center text-[20px] text-white px-4 py-[5px] font-bold bg-[#00548F]  w-full outline-none"
              />
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsShowingCalendar(!isShowingCalendar)}
                aria-label="Choose Date"
                className="p-2 m-0 outline-none bg-[#00548F]"
              >
                <FaChevronRight size={24} color="white" />
              </button>
            </div>
          </div>
          <div className="flex items-center ml-1">
            <button
              type="button"
              onClick={() => setIsShowingCalendar(!isShowingCalendar)}
              aria-label="Choose Date"
              className="p-1 m-0 outline-none rounded-r"
            >
              <BiCalendar size={40} color="#5E5F5F" />
            </button>
          </div>
        </div>
        <div className="overflow-visible clear-both container">
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
                    <>
                      <tr>
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

                        {foodEntry.servingSize === 'g' ? (
                          <td>
                            {convertFloatToOneDecimalPlace(foodEntry.calories)}
                          </td>
                        ) : (
                          <td>
                            {convertFloatToOneDecimalPlace(
                              (foodEntry.calories as number) *
                                foodEntry.numOfServings
                            )}
                          </td>
                        )}

                        <td>
                          {convertFloatToOneDecimalPlace(
                            foodEntry.carbohydrate
                          )}
                        </td>

                        <td>{convertFloatToOneDecimalPlace(foodEntry.fat)}</td>

                        <td>
                          {convertFloatToOneDecimalPlace(foodEntry.protein)}
                        </td>

                        <td>?</td>

                        <td>
                          {foodEntry.sugar === null
                            ? 0
                            : convertFloatToOneDecimalPlace(foodEntry.sugar)}
                        </td>

                        <td className="delete">
                          <div className="flex items-center justify-center">
                            <AiFillMinusCircle size={24} color="red" />
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                }
              })}
              <tr className={styles.bottom}>
                <td className={styles.foodName} style={{ zIndex: 9 }}>
                  <a
                    className={styles.addFood}
                    href="/user/perrysmithmoss/diary/add?meal=1"
                  >
                    Add Food
                  </a>
                  <div className={styles.quickTools}>
                    <a href="#quick_tools_1" className="toggle_diary_options">
                      Quick Tools
                    </a>
                  </div>
                </td>
                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Breakfast'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'Breakfast'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'Breakfast'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'Breakfast'
                      )
                    )}
                </td>

                <td>?</td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'Breakfast'
                      )
                    )}
                </td>
              </tr>

              <tr className="meal_header">
                <td className={`${styles.mealHeading}`}>Lunch</td>
              </tr>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Lunch') {
                  return (
                    <>
                      <tr>
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

                        {foodEntry.servingSize === 'g' ? (
                          <td>
                            {convertFloatToOneDecimalPlace(foodEntry.calories)}
                          </td>
                        ) : (
                          <td>
                            {convertFloatToOneDecimalPlace(
                              (foodEntry.calories as number) *
                                foodEntry.numOfServings
                            )}
                          </td>
                        )}

                        <td>
                          {convertFloatToOneDecimalPlace(
                            foodEntry.carbohydrate
                          )}
                        </td>

                        <td>{convertFloatToOneDecimalPlace(foodEntry.fat)}</td>

                        <td>
                          {convertFloatToOneDecimalPlace(foodEntry.protein)}
                        </td>

                        <td>?</td>

                        <td>
                          {' '}
                          {foodEntry.sugar === null
                            ? 0
                            : convertFloatToOneDecimalPlace(foodEntry.sugar)}
                        </td>

                        <td className="delete">
                          <div className="flex items-center justify-center">
                            <AiFillMinusCircle size={24} color="red" />
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                }
              })}
              <tr className={styles.bottom}>
                <td className={styles.foodName} style={{ zIndex: 8 }}>
                  <a
                    className={styles.addFood}
                    href="/user/perrysmithmoss/diary/add?meal=2"
                  >
                    Add Food
                  </a>
                  <div className={styles.quickTools}>
                    <a href="#quick_tools_2" className="toggle_diary_options">
                      Quick Tools
                    </a>
                  </div>
                </td>
                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Lunch'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'Lunch'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'Lunch'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'Lunch'
                      )
                    )}
                </td>

                <td>?</td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'Lunch'
                      )
                    )}
                </td>

                <td></td>
              </tr>
              <tr className="meal_header">
                <td className={`${styles.mealHeading}`}>Dinner</td>
              </tr>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Dinner') {
                  return (
                    <>
                      <tr>
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

                        {foodEntry.servingSize === 'g' ? (
                          <td>
                            {convertFloatToOneDecimalPlace(foodEntry.calories)}
                          </td>
                        ) : (
                          <td>
                            {convertFloatToOneDecimalPlace(
                              (foodEntry.calories as number) *
                                foodEntry.numOfServings
                            )}
                          </td>
                        )}

                        <td>
                          {convertFloatToOneDecimalPlace(
                            foodEntry.carbohydrate
                          )}
                        </td>

                        <td>{convertFloatToOneDecimalPlace(foodEntry.fat)}</td>

                        <td>
                          {convertFloatToOneDecimalPlace(foodEntry.protein)}
                        </td>

                        <td>?</td>

                        <td>
                          {' '}
                          {foodEntry.sugar === null
                            ? 0
                            : convertFloatToOneDecimalPlace(foodEntry.sugar)}
                        </td>

                        <td className="delete">
                          <div className="flex items-center justify-center">
                            <AiFillMinusCircle size={24} color="red" />
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                }
              })}
              <tr className={styles.bottom}>
                <td className={styles.foodName} style={{ zIndex: 9 }}>
                  <a
                    className={styles.addFood}
                    href="/user/perrysmithmoss/diary/add?meal=1"
                  >
                    Add Food
                  </a>
                  <div className={styles.quickTools}>
                    <a href="#quick_tools_1" className="toggle_diary_options">
                      Quick Tools
                    </a>
                  </div>
                </td>
                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Dinner'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'Dinner'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'Dinner'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'Dinner'
                      )
                    )}
                </td>

                <td>?</td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'Dinner'
                      )
                    )}
                </td>

                <td></td>
              </tr>

              <tr className="meal_header">
                <td className={`${styles.mealHeading}`}>Snacks</td>
              </tr>

              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Snacks') {
                  return (
                    <>
                      <tr>
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

                        {foodEntry.servingSize === 'g' ? (
                          <td>
                            {convertFloatToOneDecimalPlace(foodEntry.calories)}
                          </td>
                        ) : (
                          <td>
                            {convertFloatToOneDecimalPlace(
                              (foodEntry.calories as number) *
                                foodEntry.numOfServings
                            )}
                          </td>
                        )}

                        <td>
                          {convertFloatToOneDecimalPlace(
                            foodEntry.carbohydrate
                          )}
                        </td>

                        <td>{convertFloatToOneDecimalPlace(foodEntry.fat)}</td>

                        <td>
                          {convertFloatToOneDecimalPlace(foodEntry.protein)}
                        </td>

                        <td>?</td>

                        <td>
                          {' '}
                          {foodEntry.sugar === null
                            ? 0
                            : convertFloatToOneDecimalPlace(foodEntry.sugar)}
                        </td>

                        <td className="delete">
                          <div className="flex items-center justify-center">
                            <AiFillMinusCircle size={24} color="red" />
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                }
              })}
              <tr className={styles.bottom}>
                <td className={styles.foodName} style={{ zIndex: 7 }}>
                  <a
                    className={styles.addFood}
                    href="/user/perrysmithmoss/diary/add?meal=3"
                  >
                    Add Food
                  </a>
                  <div className={styles.quickTools}>
                    <a href="#quick_tools_3" className="toggle_diary_options">
                      Quick Tools
                    </a>
                  </div>
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Snacks'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'Snacks'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'Snacks'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'Snacks'
                      )
                    )}
                </td>

                <td>?</td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'Snacks'
                      )
                    )}
                </td>

                <td></td>
              </tr>

              <tr className="meal_header">
                <td className={`${styles.mealHeading}`}>Meal&nbsp;5</td>
              </tr>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Meal 5') {
                  return (
                    <>
                      <tr>
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

                        {foodEntry.servingSize === 'g' ? (
                          <td>
                            {convertFloatToOneDecimalPlace(foodEntry.calories)}
                          </td>
                        ) : (
                          <td>
                            {convertFloatToOneDecimalPlace(
                              (foodEntry.calories as number) *
                                foodEntry.numOfServings
                            )}
                          </td>
                        )}

                        <td>
                          {convertFloatToOneDecimalPlace(
                            foodEntry.carbohydrate
                          )}
                        </td>

                        <td>{convertFloatToOneDecimalPlace(foodEntry.fat)}</td>

                        <td>
                          {convertFloatToOneDecimalPlace(foodEntry.protein)}
                        </td>

                        <td>?</td>

                        <td>
                          {' '}
                          {foodEntry.sugar === null
                            ? 0
                            : convertFloatToOneDecimalPlace(foodEntry.sugar)}
                        </td>

                        <td className="delete">
                          <div className="flex items-center justify-center">
                            <AiFillMinusCircle size={24} color="red" />
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                }
              })}
              <tr className={styles.bottom}>
                <td className={styles.foodName} style={{ zIndex: 6 }}>
                  <a
                    className={styles.addFood}
                    href="/user/perrysmithmoss/diary/add?meal=4"
                  >
                    Add Food
                  </a>
                  <div className={styles.quickTools}>
                    <a href="#quick_tools_4" className="toggle_diary_options">
                      Quick Tools
                    </a>
                  </div>
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Meal 5'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'Meal 5'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'Meal 5'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'Meal 5'
                      )
                    )}
                </td>

                <td>?</td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'Meal 5'
                      )
                    )}
                </td>

                <td></td>
              </tr>

              <tr className="meal_header">
                <td className={`${styles.mealHeading}`}>Meal&nbsp;6</td>
              </tr>
              {usersFood?.getCurrentUsersFoodByDate.data?.map((foodEntry) => {
                if (foodEntry.mealName === 'Meal 6') {
                  return (
                    <>
                      <tr>
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

                        {foodEntry.servingSize === 'g' ? (
                          <td>
                            {convertFloatToOneDecimalPlace(foodEntry.calories)}
                          </td>
                        ) : (
                          <td>
                            {convertFloatToOneDecimalPlace(
                              (foodEntry.calories as number) *
                                foodEntry.numOfServings
                            )}
                          </td>
                        )}

                        <td>
                          {convertFloatToOneDecimalPlace(
                            foodEntry.carbohydrate
                          )}
                        </td>

                        <td>{convertFloatToOneDecimalPlace(foodEntry.fat)}</td>

                        <td>
                          {convertFloatToOneDecimalPlace(foodEntry.protein)}
                        </td>

                        <td>?</td>

                        <td>
                          {' '}
                          {foodEntry.sugar === null
                            ? 0
                            : convertFloatToOneDecimalPlace(foodEntry.sugar)}
                        </td>

                        <td className="delete">
                          <div className="flex items-center justify-center">
                            <AiFillMinusCircle size={24} color="red" />
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                }
              })}
              <tr className={styles.bottom}>
                <td className={styles.foodName} style={{ zIndex: 5 }}>
                  <a
                    className={styles.addFood}
                    href="/user/perrysmithmoss/diary/add?meal=5"
                  >
                    Add Food
                  </a>
                  <div className={styles.quickTools}>
                    <a href="#quick_tools_5" className="toggle_diary_options">
                      Quick Tools
                    </a>
                  </div>
                </td>
                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'Meal 6'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'Meal 6'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'Meal 6'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'Meal 6'
                      )
                    )}
                </td>

                <td>?</td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'sugar',
                        'Meal 6'
                      )
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
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'calories',
                        'All'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'carbohydrate',
                        'All'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'fat',
                        'All'
                      )
                    )}
                </td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      sumBy(
                        usersFood?.getCurrentUsersFoodByDate.data as Food[],
                        'protein',
                        'All'
                      )
                    )}
                </td>

                <td>?</td>

                <td>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
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
                  {convertFloatToOneDecimalPlace(
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
                    )
                  )}
                </td>
                <td>
                  {convertFloatToOneDecimalPlace(
                    Math.round(
                      calculateGramsFromMacronutrient(
                        calculatePercentage(
                          usersGoals?.getCurrentUsersGoals.data?.fat as number,
                          usersGoals?.getCurrentUsersGoals.data
                            ?.calories as number
                        ),
                        'fat'
                      )
                    )
                  )}
                </td>
                <td>
                  {convertFloatToOneDecimalPlace(
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
                    )
                  )}
                </td>
                <td>?</td>
                <td>?</td>
                <td className={styles.emptyCell}></td>
              </tr>

              <tr className={styles.totals}>
                <td className={styles.totalsFirstCell}>Remaining</td>

                <td className={`${usersFood?.getCurrentUsersFoodByDate.data && isNumberPositive(
                    convertFloatToOneDecimalPlace(
                      (usersGoals?.getCurrentUsersGoals.data
                        ?.calories as number) -
                        sumBy(
                          usersFood?.getCurrentUsersFoodByDate.data as Food[],
                          'calories',
                          'All'
                        )
                    )) ? styles.possitive : styles.negative}`}>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
                      (usersGoals?.getCurrentUsersGoals.data
                        ?.calories as number) -
                        sumBy(
                          usersFood?.getCurrentUsersFoodByDate.data as Food[],
                          'calories',
                          'All'
                        )
                    )}
                </td>
                <td className={`${usersFood?.getCurrentUsersFoodByDate.data && isNumberPositive(
                    convertFloatToOneDecimalPlace(
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
                    )) ? styles.possitive : styles.negative}`}>
                  {usersFood?.getCurrentUsersFoodByDate.data &&
                    convertFloatToOneDecimalPlace(
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
                <td className={`${usersFood?.getCurrentUsersFoodByDate.data && isNumberPositive(
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
                        )
                    )) ? styles.possitive : styles.negative}`}>
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
                        )
                    )}
                </td>
                <td className={`${usersFood?.getCurrentUsersFoodByDate.data && isNumberPositive(
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
                        )
                    )) ? styles.possitive : styles.negative}`}>
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
                        )
                    )}
                </td>
                <td className={styles.possitive}>?</td>
                <td className={styles.possitive}>?</td>
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
      </div>
    </div>
  );
};
