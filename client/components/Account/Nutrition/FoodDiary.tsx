import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiCalendar } from 'react-icons/bi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiFillMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import styles from './Nutrition.module.css';
import {
  Food,
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
import { FiMoreHorizontal } from 'react-icons/fi';

interface FoodDiaryProps {}

const todaysDate = new Date();
const yesterdaysDate = new Date(Date.now() - 86400000);

export const FoodDiary: React.FC<FoodDiaryProps> = ({}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(todaysDate);
  const [isShowingCalendar, setIsShowingCalendar] = useState(false);
  const [isAddFoodDrawerOpen, setIsAddFoodDrawerOpen] = useState(false);

  const { data: usersGoals, refetch: refetchUsersGoals } =
    useGetCurrentUsersGoalsQuery();
  const { data: usersFood, refetch: refetchUsersFood } =
    useGetCurrentUsersFoodByDateQuery({ date: selectedDate });

  const { mutate: deleteFood } = useDeleteFoodFromMealByDateMutation({
    onSuccess: () => refetchUsersFood(),
  });

  const handleChangeDate = (date: Date) => {
    setSelectedDate(date);
    // refetchUsersFood({date: selectedDate});
  };

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

  const handleShowAddFoodDrawer = () => {
    setIsAddFoodDrawerOpen(!isAddFoodDrawerOpen)

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
                        {convertFloatToOneDecimalPlace(foodEntry.carbohydrate)}
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
                    onClick={handleShowAddFoodDrawer}
                    className={styles.addFood}
                  >
                    Add Food
                  </button>
                  <div className={styles.quickTools}>
                    <a className="toggle_diary_options">Quick Tools</a>
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
                        {convertFloatToOneDecimalPlace(foodEntry.carbohydrate)}
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
                  <button className={styles.addFood}>Add Food</button>
                  <div className={styles.quickTools}>
                    <a className="toggle_diary_options">Quick Tools</a>
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
                        {convertFloatToOneDecimalPlace(foodEntry.carbohydrate)}
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
                  <a className={styles.addFood}>Add Food</a>
                  <div className={styles.quickTools}>
                    <a className="toggle_diary_options">Quick Tools</a>
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
                        {convertFloatToOneDecimalPlace(foodEntry.carbohydrate)}
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
                  <a className={styles.addFood}>Add Food</a>
                  <div className={styles.quickTools}>
                    <a className="toggle_diary_options">Quick Tools</a>
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
                        {convertFloatToOneDecimalPlace(foodEntry.carbohydrate)}
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
                  <a className={styles.addFood}>Add Food</a>
                  <div className={styles.quickTools}>
                    <a className="toggle_diary_options">Quick Tools</a>
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
                        {convertFloatToOneDecimalPlace(foodEntry.carbohydrate)}
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
                  <a className={styles.addFood}>Add Food</a>
                  <div className={styles.quickTools}>
                    <a className="toggle_diary_options">Quick Tools</a>
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

                <td>?</td>

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
                <td>?</td>
                <td>?</td>
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
        <Drawer
          isOpen={isAddFoodDrawerOpen}
          setIsOpen={handleShowAddFoodDrawer}
          title="Add Food"
          size="lg"
        >
          <div>
            <header className="flex items-center justify-between px-2 py-4 bg-brand-green text-white ">
              <div className="flex items-center justify-between w-full">
                <div>
                  <h2 className="font-bold text-2xl">Add Food</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="relative cursor-pointer flex text-center items-center justify-center h-8 w-8 rounded-full bg-brand-green hover:bg-brand-green-hover"
                    data-modal-toggle="default-modal"
                  >
                    <AiOutlinePlus
                      onClick={handleShowAddFoodDrawer}
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
              <div className="flex w-full justify-center items-center py-1">
                <div className="relative mt-1 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
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
                  <input
                    type="text"
                    id="searchExercises"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-brand-green focus:border-brand-green w-full pl-10 p-2.5"
                    placeholder="Search"
                  />
                </div>
              </div>
              {/* <div>
                <div>
                  <button>Add Checked</button>
                </div>
                <div>
                  <div>Recent</div>
                  <div>Frequent</div>
                  <div>My Foods</div>
                  <div>Meals</div>
                  Recipes
                </div>
              </div> */}
              <div className="flex items-center justify-between mt-4">
                <div>
                  <button className="px-5 py-2 rounded text-white bg-brand-green hover:bg-brand-green-hover">
                    Add Checked
                  </button>
                </div>
                <div>
                  <select
                    className="bg-gray-200 px-2 py-2 rounded"
                    name="sortBy"
                    id="sortBy"
                  >
                    <option defaultChecked disabled value="sorBy">
                      Sort by
                    </option>
                    <option  value="mostRecent">Recent</option>
                    <option value="mostFrequent">Frequency</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                  </select>
                </div>
              </div>
              <div className="min-h-[300px] mt-3" style={{ display: 'block' }}>
                <div
                  id="recent_page_1"
                  className="recent_page"
                  style={{ display: 'block' }}
                >
                  <table className={styles.addFoodDrawerTable}>
                    <tbody>
                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_38_food_id"
                            name="favorites[38][food_id]"
                            type="hidden"
                            value="483205378"
                          />
                          <input
                            name="favorites[38][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_38_checked"
                            name="favorites[38][checked]"
                            type="checkbox"
                            value="1"
                            data-index="38"
                            data-food-id="483205378"
                            data-food-external-id="38f3ef90-2efb-4ccd-8b59-708c5a46dd61"
                            data-food-version="93"
                            data-food-verified="true"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Egg - Egg</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_38_quantity"
                            name="favorites[38][quantity]"
                            size={30}
                            type="text"
                            value="2"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_38_weight_id"
                            name="favorites[38][weight_id]"
                          >
                            <option
                              value="610127708"
                              // selected="&quot;selected&quot;"
                            >
                              1 large
                            </option>
                            <option value="610127709">1 extra large</option>
                            <option value="610127710">1 jumbo</option>
                            <option value="610127711">
                              1 cup (4.86 large eggs)
                            </option>
                            <option value="610127712">1 medium</option>
                            <option value="610127713">1 small</option>
                            <option value="610127714">100 g</option>
                            <option value="610127715">1 lb(s)</option>
                            <option value="610127716">1 oz(s)</option>
                            <option value="610127717">1 mg(s)</option>
                            <option value="610127718">1 tbsp(s)</option>
                            <option value="610127719">1 tsp(s)</option>
                            <option value="610127720">1 kg(s)</option>
                            <option value="610127721">100 grams</option>
                            <option value="610127722">1 egg</option>
                            <option value="610127723">1 ml(s)</option>
                            <option value="610127724">1 Egg (33g)</option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_39_food_id"
                            name="favorites[39][food_id]"
                            type="hidden"
                            value="490024054"
                          />
                          <input
                            name="favorites[39][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_39_checked"
                            name="favorites[39][checked]"
                            type="checkbox"
                            value="1"
                            data-index="39"
                            data-food-id="490024054"
                            data-food-external-id="d8af4dfc-cff0-4a4d-b980-1013b9ceeaf6"
                            data-food-version="12"
                            data-food-verified="false"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Tesco - R British Beef Lean Steak Mince</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_39_quantity"
                            name="favorites[39][quantity]"
                            size={30}
                            type="text"
                            value="39"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_39_weight_id"
                            name="favorites[39][weight_id]"
                          >
                            <option value="617709668">100 g</option>
                            <option
                              value="617709669"
                              // selected="&quot;selected&quot;"
                            >
                              1 g
                            </option>
                            <option value="617709670">
                              1 container (500 gs ea.)
                            </option>
                            <option value="617709671">1 ounce</option>
                            <option value="617709672">3.5 ounce</option>
                            <option value="617709673">1 kg(s)</option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_40_food_id"
                            name="favorites[40][food_id]"
                            type="hidden"
                            value="774623766"
                          />
                          <input
                            name="favorites[40][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_40_checked"
                            name="favorites[40][checked]"
                            type="checkbox"
                            value="1"
                            data-index="40"
                            data-food-id="774623766"
                            data-food-external-id="2b19dd51-747a-4b12-b3b5-be0afc03f5d8"
                            data-food-version="9"
                            data-food-verified="true"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Perdue - Cooked Chicken Breast</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_40_quantity"
                            name="favorites[40][quantity]"
                            size={30}
                            type="text"
                            value="115"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_40_weight_id"
                            name="favorites[40][weight_id]"
                          >
                            <option value="956566269">3 oz.</option>
                            <option
                              value="956566270"
                              // selected="&quot;selected&quot;"
                            >
                              1 gram
                            </option>
                            <option value="956566271">1 oz.</option>
                            <option value="956566272">85 gram</option>
                            <option value="956566273">1 oz(s)</option>
                            <option value="956566274">1 lb(s)</option>
                            <option value="956566275">1 kg(s)</option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_41_food_id"
                            name="favorites[41][food_id]"
                            type="hidden"
                            value="352137935"
                          />
                          <input
                            name="favorites[41][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_41_checked"
                            name="favorites[41][checked]"
                            type="checkbox"
                            value="1"
                            data-index="41"
                            data-food-id="352137935"
                            data-food-external-id="f798a127-ee91-4d03-b3db-74a18f047653"
                            data-food-version="2"
                            data-food-verified="false"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Riviana - Basmatti Rice, Cooked</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_41_quantity"
                            name="favorites[41][quantity]"
                            size={30}
                            type="text"
                            value="205"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_41_weight_id"
                            name="favorites[41][weight_id]"
                          >
                            <option value="459829175">150 g cooked</option>
                            <option
                              value="459829176"
                              // selected="&quot;selected&quot";
                            >
                              1 g cooked
                            </option>
                            <option value="459829177">
                              1 container (1500 g cookeds ea.)
                            </option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_42_food_id"
                            name="favorites[42][food_id]"
                            type="hidden"
                            value="420558923"
                          />
                          <input
                            name="favorites[42][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_42_checked"
                            name="favorites[42][checked]"
                            type="checkbox"
                            value="1"
                            data-index="42"
                            data-food-id="420558923"
                            data-food-external-id="b45bf1a5-cb7b-4347-b248-715eb1931051"
                            data-food-version="23"
                            data-food-verified="true"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Kroger - Extra Virgin Olive Oil</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_42_quantity"
                            name="favorites[42][quantity]"
                            size={30}
                            type="text"
                            value="12"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_42_weight_id"
                            name="favorites[42][weight_id]"
                          >
                            <option value="539659121">1 tbsp.</option>
                            <option value="539659122">1 fluid ounce</option>
                            <option
                              value="539659123"
                              // selected="&quot;selected&quot;"
                            >
                              1 milliliter
                            </option>
                            <option value="539659124">15 milliliter</option>
                            <option value="539659125">
                              1 container (34 tbsp. ea.)
                            </option>
                            <option value="539659126">0.5 fluid ounce</option>
                            <option value="539659127">1 tbsp(s)</option>
                            <option value="539659128">1 cup(s)</option>
                            <option value="539659129">1 tsp(s)</option>
                            <option value="539659130">1 ml(s)</option>
                            <option value="539659131">1 tbsp</option>
                            <option value="539659132">1 tablespoon</option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_43_food_id"
                            name="favorites[43][food_id]"
                            type="hidden"
                            value="1411222316"
                          />
                          <input
                            name="favorites[43][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_43_checked"
                            name="favorites[43][checked]"
                            type="checkbox"
                            value="1"
                            data-index="43"
                            data-food-id="1411222316"
                            data-food-external-id="2964909c-814d-439e-90e4-d51a41c6f89f"
                            data-food-version="24"
                            data-food-verified="false"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Tesco - Turkey Mince - 2% (cooked)</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_43_quantity"
                            name="favorites[43][quantity]"
                            size={30}
                            type="text"
                            value="170"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_43_weight_id"
                            name="favorites[43][weight_id]"
                          >
                            <option value="1711270152">100 g</option>
                            <option
                              value="1711270153"
                              // selected="&quot;selected&quot;"
                            >
                              1 g
                            </option>
                            <option value="1711270154">
                              1 container (500 gs ea.)
                            </option>
                            <option value="1711270155">1 ounce</option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_44_food_id"
                            name="favorites[44][food_id]"
                            type="hidden"
                            value="746153985"
                          />
                          <input
                            name="favorites[44][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_44_checked"
                            name="favorites[44][checked]"
                            type="checkbox"
                            value="1"
                            data-index="44"
                            data-food-id="746153985"
                            data-food-external-id="b4782c83-ca61-4d53-b554-3391ed89d67d"
                            data-food-version="3"
                            data-food-verified="false"
                            data-list-type="recent"
                          />
                        </td>

                        <td>aldi freshfield beef medalions - steak</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_44_quantity"
                            name="favorites[44][quantity]"
                            size={30}
                            type="text"
                            value="170"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_44_weight_id"
                            name="favorites[44][weight_id]"
                          >
                            <option value="923127213">100 gram</option>
                            <option
                              value="923127214"
                              // selected="&quot;selected&quot;"
                            >
                              1 gram
                            </option>
                            <option value="923127215">1 ounce</option>
                            <option value="923127216">3.5 ounce</option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_45_food_id"
                            name="favorites[45][food_id]"
                            type="hidden"
                            value="384858372"
                          />
                          <input
                            name="favorites[45][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_45_checked"
                            name="favorites[45][checked]"
                            type="checkbox"
                            value="1"
                            data-index="45"
                            data-food-id="384858372"
                            data-food-external-id="fc3aa760-8559-4212-b57f-b3ec4d4bfa4f"
                            data-food-version="28"
                            data-food-verified="false"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Tesco Whole Foods - Macadamia Nuts</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_45_quantity"
                            name="favorites[45][quantity]"
                            size={30}
                            type="text"
                            value="15"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_45_weight_id"
                            name="favorites[45][weight_id]"
                          >
                            <option value="499152007">100 gram</option>
                            <option
                              value="499152008"
                              // selected="&quot;selected&quot;"
                            >
                              1 gram
                            </option>
                            <option value="499152009">1 ounce</option>
                            <option value="499152010">3.5 ounce</option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_46_food_id"
                            name="favorites[46][food_id]"
                            type="hidden"
                            value="1440578377"
                          />
                          <input
                            name="favorites[46][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_46_checked"
                            name="favorites[46][checked]"
                            type="checkbox"
                            value="1"
                            data-index="46"
                            data-food-id="1440578377"
                            data-food-external-id="1e9c00df-6f47-417d-b77f-ee20052fbc16"
                            data-food-version="2"
                            data-food-verified="false"
                            data-list-type="recent"
                          />
                        </td>

                        <td>
                          Tesco - Fresh British Beef Medallion Steak (Ant)
                        </td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_46_quantity"
                            name="favorites[46][quantity]"
                            size={30}
                            type="text"
                            value="180"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_46_weight_id"
                            name="favorites[46][weight_id]"
                          >
                            <option value="1745038590">100 gram</option>
                            <option
                              value="1745038591"
                              // selected="&quot;selected&quot;"
                            >
                              1 gram
                            </option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_47_food_id"
                            name="favorites[47][food_id]"
                            type="hidden"
                            value="1202833130"
                          />
                          <input
                            name="favorites[47][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_47_checked"
                            name="favorites[47][checked]"
                            type="checkbox"
                            value="1"
                            data-index="47"
                            data-food-id="1202833130"
                            data-food-external-id="84cd7cc5-5bb8-42c5-b827-d2d53d17cc93"
                            data-food-version="1"
                            data-food-verified="false"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Per4m&nbsp;Whey - Choc&nbsp;Brownie&nbsp;Battet</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_47_quantity"
                            name="favorites[47][quantity]"
                            size={30}
                            type="text"
                            value="50"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_47_weight_id"
                            name="favorites[47][weight_id]"
                          >
                            <option value="1468806654">100 g</option>
                            <option
                              value="1468806655"
                              // selected="&quot;selected&quot;"
                            >
                              1 g
                            </option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_48_food_id"
                            name="favorites[48][food_id]"
                            type="hidden"
                            value="907229638"
                          />
                          <input
                            name="favorites[48][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_48_checked"
                            name="favorites[48][checked]"
                            type="checkbox"
                            value="1"
                            data-index="48"
                            data-food-id="907229638"
                            data-food-external-id="3dd66a7a-42a8-4d6d-b08a-dd0119a3fdc5"
                            data-food-version="51"
                            data-food-verified="false"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Lindt - 85% Dark Chocolate Bar</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_48_quantity"
                            name="favorites[48][quantity]"
                            size={30}
                            type="text"
                            value="15"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_48_weight_id"
                            name="favorites[48][weight_id]"
                          >
                            <option value="1114931380">4 squares (40g)</option>
                            <option value="1114931381">1.4 ounce</option>
                            <option value="1114931382">1 squares (40g)</option>
                            <option
                              value="1114931383"
                              // selected="&quot;selected&quot;"
                            >
                              1 gram
                            </option>
                            <option value="1114931384">1 ounce</option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_49_food_id"
                            name="favorites[49][food_id]"
                            type="hidden"
                            value="713932216"
                          />
                          <input
                            name="favorites[49][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_49_checked"
                            name="favorites[49][checked]"
                            type="checkbox"
                            value="1"
                            data-index="49"
                            data-food-id="713932216"
                            data-food-external-id="e9a5b936-e69c-4068-affd-2494d404507f"
                            data-food-version="8"
                            data-food-verified="false"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Whitworths - Ground Rice</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_49_quantity"
                            name="favorites[49][quantity]"
                            size={30}
                            type="text"
                            value="75"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_49_weight_id"
                            name="favorites[49][weight_id]"
                          >
                            <option value="885183135">100 g</option>
                            <option
                              value="885183136"
                              // selected="&quot;selected&quot;"
                            >
                              1 g
                            </option>
                            <option value="885183137">
                              1 container (500 gs ea.)
                            </option>
                            <option value="885183138">1 ounce</option>
                            <option value="885183139">3.5 ounce</option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_50_food_id"
                            name="favorites[50][food_id]"
                            type="hidden"
                            value="1504323915"
                          />
                          <input
                            name="favorites[50][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_50_checked"
                            name="favorites[50][checked]"
                            type="checkbox"
                            value="1"
                            data-index="50"
                            data-food-id="1504323915"
                            data-food-external-id="77629084-d763-4c8a-9077-995920739805"
                            data-food-version="1"
                            data-food-verified="false"
                            data-list-type="recent"
                          />
                        </td>

                        <td>co-op - beef rum steak</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_50_quantity"
                            name="favorites[50][quantity]"
                            size={30}
                            type="text"
                            value="200"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_50_weight_id"
                            name="favorites[50][weight_id]"
                          >
                            <option value="1819135989">227 gram</option>
                            <option
                              value="1819135990"
                              // selected="&quot;selected&quot;"
                            >
                              1 gram
                            </option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_51_food_id"
                            name="favorites[51][food_id]"
                            type="hidden"
                            value="833289681"
                          />
                          <input
                            name="favorites[51][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_51_checked"
                            name="favorites[51][checked]"
                            type="checkbox"
                            value="1"
                            data-index="51"
                            data-food-id="833289681"
                            data-food-external-id="cc84214c-0689-4e79-a727-25778a137c20"
                            data-food-version="5"
                            data-food-verified="false"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Lind Excellence - 90% Cacao</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_51_quantity"
                            name="favorites[51][quantity]"
                            size={30}
                            type="text"
                            value="15"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_51_weight_id"
                            name="favorites[51][weight_id]"
                          >
                            <option value="1025898702">100 g</option>
                            <option
                              value="1025898703"
                              // selected="&quot;selected&quot;"
                            >
                              1 g
                            </option>
                            <option value="1025898704">1 ounce</option>
                            <option value="1025898705">3.5 ounce</option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_52_food_id"
                            name="favorites[52][food_id]"
                            type="hidden"
                            value="662136965"
                          />
                          <input
                            name="favorites[52][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_52_checked"
                            name="favorites[52][checked]"
                            type="checkbox"
                            value="1"
                            data-index="52"
                            data-food-id="662136965"
                            data-food-external-id="25f3b902-e708-4b5f-b416-bb308e1b8c6c"
                            data-food-version="3"
                            data-food-verified="false"
                            data-list-type="recent"
                          />
                        </td>

                        <td>whole earth Peanut butter - peanut butter</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_52_quantity"
                            name="favorites[52][quantity]"
                            size={30}
                            type="text"
                            value="15"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_52_weight_id"
                            name="favorites[52][weight_id]"
                          >
                            <option value="824995886">100 g</option>
                            <option
                              value="824995887"
                              // selected="&quot;selected&quot;"
                            >
                              1 g
                            </option>
                            <option value="824995889">1 ounce</option>
                            <option value="824995890">3.5 ounce</option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_53_food_id"
                            name="favorites[53][food_id]"
                            type="hidden"
                            value="425578799"
                          />
                          <input
                            name="favorites[53][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_53_checked"
                            name="favorites[53][checked]"
                            type="checkbox"
                            value="1"
                            data-index="53"
                            data-food-id="425578799"
                            data-food-external-id="3f1b3ff9-ecdf-42dd-aa89-a1e2a651a891"
                            data-food-version="189"
                            data-food-verified="true"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Broccoli, raw</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_53_quantity"
                            name="favorites[53][quantity]"
                            size={30}
                            type="text"
                            value="100"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_53_weight_id"
                            name="favorites[53][weight_id]"
                          >
                            <option value="545393796">1 cup chopped</option>
                            <option value="545393797">1 bunch</option>
                            <option value="545393798">
                              1 spear (about 5" long)
                            </option>
                            <option value="545393799">1 stalk</option>
                            <option value="545393800">
                              0.5 cup, chopped or diced
                            </option>
                            <option value="545393801">1 NLEA serving</option>
                            <option value="545393802">100 g</option>
                            <option value="545393803">1 cup, chopped</option>
                            <option value="545393804">1 lb(s)</option>
                            <option value="545393805">1 oz(s)</option>
                            <option value="545393806">1 kg(s)</option>
                            <option value="545393807">1 cup(s)</option>
                            <option value="545393808">1 ml(s)</option>
                            <option
                              value="545393809"
                              // selected="&quot;selected&quot;"
                            >
                              1 gram
                            </option>
                            <option value="545393810">1 tbsp(s)</option>
                            <option value="545393811">1 g(s)</option>
                            <option value="545393812">1 mg(s)</option>
                            <option value="545393813">1 tsp(s)</option>
                            <option value="545393814">1 bunch(es)</option>
                          </select>
                        </td>
                      </tr>

                      <tr className="favorite">
                        <td>
                          <input
                            id="favorites_54_food_id"
                            name="favorites[54][food_id]"
                            type="hidden"
                            value="1877099294"
                          />
                          <input
                            name="favorites[54][checked]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="checkbox"
                            id="favorites_54_checked"
                            name="favorites[54][checked]"
                            type="checkbox"
                            value="1"
                            data-index="54"
                            data-food-id="1877099294"
                            data-food-external-id="c3a40a3a-b0f2-4d08-a454-bf0176588707"
                            data-food-version="5"
                            data-food-verified="true"
                            data-list-type="recent"
                          />
                        </td>

                        <td>Mushroom</td>

                        <td>
                          <strong>Qty:</strong>
                          <input
                            autoComplete="off"
                            className="w-[40px] mr-2"
                            id="favorites_54_quantity"
                            name="favorites[54][quantity]"
                            size={30}
                            type="text"
                            value="3"
                          />
                          <label>of</label>
                          <select
                            className="w-[200px] ml-2"
                            id="favorites_54_weight_id"
                            name="favorites[54][weight_id]"
                          >
                            <option
                              value="2172543387"
                              // selected="&quot;selected&quot;"
                            >
                              1 mushroom
                            </option>
                            <option value="2172543388">1 gram(s)</option>
                            <option value="2172543389">1 cup pieces</option>
                            <option value="2172543390">1 tbsp</option>
                            <option value="2172543391">1 wt. oz</option>
                            <option value="2172543392">1 cup</option>
                            <option value="2172543393">1 tsp</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* <div className="block-4 table-footer">
                    <div className="col-1">
                      <input
                        type="submit"
                        name="add"
                        className="button"
                        value="Add Checked"
                      />

                      <p className="explanation">
                        Note: Checked items from all tabs will be added
                      </p>
                    </div>

                    <div className="col-2">
                      <div style={{ marginBottom: '50px', clear: 'both' }}>
                        <input
                          type="submit"
                          name="delete"
                          value="DELETE FROM LIST"
                          alt="DELETE FROM LIST"
                          className="button"
                          data-disable-with="DELETE FROM LIST"
                        />
                        <a
                          className="button"
                          href="/food/view_deleted?meal=0&amp;tab_name=recent"
                        >
                          View Deleted Items
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};
