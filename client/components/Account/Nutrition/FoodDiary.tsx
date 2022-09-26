import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiCalendar } from 'react-icons/bi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiFillMinusCircle } from 'react-icons/ai';
import styles from './Nutrition.module.css';

interface FoodDiaryProps {}

export const FoodDiary: React.FC<FoodDiaryProps> = ({}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isShowingCalendar, setIsShowingCalendar] = useState(false);
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
                onChange={(date) => setSelectedDate(date as Date)}
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

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049059676"
                    data-locale=""
                    href="#"
                  >
                    Perdue - Cooked Chicken Breast, 130 gram
                  </a>
                </td>

                <td>183</td>

                <td>
                  <span className="macro-value">0</span>
                  <span className="macro-percentage">0</span>
                </td>

                <td>
                  <span className="macro-value">2</span>
                  <span className="macro-percentage">8</span>
                </td>

                <td>
                  <span className="macro-value">40</span>
                  <span className="macro-percentage">92</span>
                </td>

                <td>115</td>

                <td>0</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049059678"
                    data-locale=""
                    href="#"
                  >
                    Egg - Egg, 2 large
                  </a>
                </td>

                <td>143</td>

                <td>
                  <span className="macro-value">1</span>
                  <span className="macro-percentage">2</span>
                </td>

                <td>
                  <span className="macro-value">10</span>
                  <span className="macro-percentage">62</span>
                </td>

                <td>
                  <span className="macro-value">13</span>
                  <span className="macro-percentage">36</span>
                </td>

                <td>142</td>

                <td>0</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

              <tr className={styles.bottom}>
                <td className={`${styles.foodName}`} style={{ zIndex: 10 }}>
                  <a
                    className={styles.addFood}
                    href="/user/perrysmithmoss/diary/add?meal=0"
                  >
                    Add Food
                  </a>
                  <div className={styles.quickTools}>
                    <a href="#quick_tools_0" className="toggle_diary_options">
                      Quick Tools
                    </a>
                  </div>
                </td>

                <td>326</td>

                <td>
                  <span className="macro-value">1</span>
                  <span className="macro-percentage">1</span>
                </td>

                <td>
                  <span className="macro-value">12</span>
                  <span className="macro-percentage">33</span>
                </td>

                <td>
                  <span className="macro-value">53</span>
                  <span className="macro-percentage">66</span>
                </td>

                <td>257</td>

                <td>0</td>

                <td></td>
              </tr>

              <tr className="meal_header">
                <td className={`${styles.mealHeading}`}>Lunch</td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049060228"
                    data-locale=""
                    href="#"
                  >
                    Perdue - Cooked Chicken Breast, 130 gram
                  </a>
                </td>

                <td>183</td>

                <td>
                  <span className="macro-value">0</span>
                  <span className="macro-percentage">0</span>
                </td>

                <td>
                  <span className="macro-value">2</span>
                  <span className="macro-percentage">8</span>
                </td>

                <td>
                  <span className="macro-value">40</span>
                  <span className="macro-percentage">92</span>
                </td>

                <td>115</td>

                <td>0</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049060229"
                    data-locale=""
                    href="#"
                  >
                    Potato, 255 g
                  </a>
                </td>

                <td>148</td>

                <td>
                  <span className="macro-value">32</span>
                  <span className="macro-percentage">82</span>
                </td>

                <td>
                  <span className="macro-value">0</span>
                  <span className="macro-percentage">1</span>
                </td>

                <td>
                  <span className="macro-value">7</span>
                  <span className="macro-percentage">17</span>
                </td>

                <td>26</td>

                <td>0</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049060232"
                    data-locale=""
                    href="#"
                  >
                    Kroger - Extra Virgin Olive Oil, 12 milliliter
                  </a>
                </td>

                <td>97</td>

                <td>
                  <span className="macro-value">0</span>
                  <span className="macro-percentage">0</span>
                </td>

                <td>
                  <span className="macro-value">11</span>
                  <span className="macro-percentage">100</span>
                </td>

                <td>
                  <span className="macro-value">0</span>
                  <span className="macro-percentage">0</span>
                </td>

                <td>0</td>

                <td>0</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

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

                <td>428</td>

                <td>
                  <span className="macro-value">32</span>
                  <span className="macro-percentage">30</span>
                </td>

                <td>
                  <span className="macro-value">13</span>
                  <span className="macro-percentage">27</span>
                </td>

                <td>
                  <span className="macro-value">47</span>
                  <span className="macro-percentage">43</span>
                </td>

                <td>141</td>

                <td>0</td>

                <td></td>
              </tr>

              <tr className="meal_header">
                <td className={`${styles.mealHeading}`}>Dinner</td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049060591"
                    data-locale=""
                    href="#"
                  >
                    Tesco - R British Beef Lean Steak Mince, 205 g
                  </a>
                </td>

                <td>254</td>

                <td>0</td>

                <td>9</td>

                <td>43</td>

                <td>246</td>

                <td>0</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049060592"
                    data-locale=""
                    href="#"
                  >
                    Riviana - Basmatti Rice, Cooked, 190 g cooked
                  </a>
                </td>

                <td>203</td>

                <td>43</td>

                <td>1</td>

                <td>5</td>

                <td>14</td>

                <td>0</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

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

                <td>457</td>

                <td>
                  <span className="macro-value">43</span>
                  <span className="macro-percentage">38</span>
                </td>

                <td>
                  <span className="macro-value">10</span>
                  <span className="macro-percentage">20</span>
                </td>

                <td>
                  <span className="macro-value">48</span>
                  <span className="macro-percentage">42</span>
                </td>

                <td>260</td>

                <td>0</td>

                <td></td>
              </tr>

              <tr className="meal_header">
                <td className={`${styles.mealHeading}`}>Snacks</td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049039234"
                    data-locale=""
                    href="#"
                  >
                    Per4m&nbsp;Whey - Choc&nbsp;Brownie&nbsp;Battet, 50 g
                  </a>
                </td>

                <td>175</td>

                <td>
                  <span className="macro-value">6</span>
                  <span className="macro-percentage">13</span>
                </td>

                <td>
                  <span className="macro-value">2</span>
                  <span className="macro-percentage">8</span>
                </td>

                <td>
                  <span className="macro-value">35</span>
                  <span className="macro-percentage">79</span>
                </td>

                <td>0</td>

                <td>6</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049039241"
                    data-locale=""
                    href="#"
                  >
                    Raspberry, 100 gram(s)
                  </a>
                </td>

                <td>52</td>

                <td>
                  <span className="macro-value">12</span>
                  <span className="macro-percentage">82</span>
                </td>

                <td>
                  <span className="macro-value">1</span>
                  <span className="macro-percentage">10</span>
                </td>

                <td>
                  <span className="macro-value">1</span>
                  <span className="macro-percentage">8</span>
                </td>

                <td>1</td>

                <td>4</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049060980"
                    data-locale=""
                    href="#"
                  >
                    Lind Excellence - 90% Cacao, 25 g
                  </a>
                </td>

                <td>148</td>

                <td>
                  <span className="macro-value">4</span>
                  <span className="macro-percentage">9</span>
                </td>

                <td>
                  <span className="macro-value">14</span>
                  <span className="macro-percentage">84</span>
                </td>

                <td>
                  <span className="macro-value">3</span>
                  <span className="macro-percentage">7</span>
                </td>

                <td>0</td>

                <td>2</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049061101"
                    data-locale=""
                    href="#"
                  >
                    helcom - pinaple, 100 g
                  </a>
                </td>

                <td>64</td>

                <td>
                  <span className="macro-value">16</span>
                  <span className="macro-percentage">100</span>
                </td>

                <td>
                  <span className="macro-value">0</span>
                  <span className="macro-percentage">0</span>
                </td>

                <td>
                  <span className="macro-value">0</span>
                  <span className="macro-percentage">0</span>
                </td>

                <td>0</td>

                <td>0</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049061655"
                    data-locale=""
                    href="#"
                  >
                    Whitworths - Ground Rice, 125 g
                  </a>
                </td>

                <td>449</td>

                <td>
                  <span className="macro-value">102</span>
                  <span className="macro-percentage">91</span>
                </td>

                <td>
                  <span className="macro-value">0</span>
                  <span className="macro-percentage">1</span>
                </td>

                <td>
                  <span className="macro-value">9</span>
                  <span className="macro-percentage">8</span>
                </td>

                <td>0</td>

                <td>1</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049062724"
                    data-locale=""
                    href="#"
                  >
                    Blueberries, 175 g
                  </a>
                </td>

                <td>149</td>

                <td>
                  <span className="macro-value">37</span>
                  <span className="macro-percentage">90</span>
                </td>

                <td>
                  <span className="macro-value">1</span>
                  <span className="macro-percentage">5</span>
                </td>

                <td>
                  <span className="macro-value">2</span>
                  <span className="macro-percentage">5</span>
                </td>

                <td>2</td>

                <td>26</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

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

                <td>1,037</td>

                <td>
                  <span className="macro-value">177</span>
                </td>

                <td>
                  <span className="macro-value">18</span>
                </td>

                <td>
                  <span className="macro-value">50</span>
                </td>

                <td>3</td>

                <td>39</td>

                <td></td>
              </tr>

              <tr className="meal_header">
                <td className={`${styles.mealHeading}`}>Meal&nbsp;5</td>
              </tr>

              <tr>
                <td className={styles.foodName}>
                  <a
                    className="js-show-edit-food"
                    data-food-entry-id="10049061885"
                    data-locale=""
                    href="#"
                  >
                    Sainsbury's - Boneless Scottish Salmon Fillet - Correct, 180
                    g
                  </a>
                </td>

                <td>410</td>

                <td>1</td>

                <td>27</td>

                <td>47</td>

                <td>94</td>

                <td>1</td>

                <td className="delete">
                  <div className="flex items-center justify-center">
                    <AiFillMinusCircle size={24} color="red" />
                  </div>
                </td>
              </tr>

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

                <td>410</td>

                <td>1</td>

                <td>27</td>

                <td>42</td>

                <td>94</td>

                <td>1</td>

                <td></td>
              </tr>

              <tr className="meal_header">
                <td className={`${styles.mealHeading}`}>Meal&nbsp;6</td>
              </tr>

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

                <td>&nbsp;</td>

                <td>
                  <span className="macro-value">&nbsp;</span>
                  <span className="macro-percentage">&nbsp;</span>
                </td>

                <td>
                  <span className="macro-value">&nbsp;</span>
                  <span className="macro-percentage">&nbsp;</span>
                </td>

                <td>
                  <span className="macro-value">&nbsp;</span>
                  <span className="macro-percentage">&nbsp;</span>
                </td>

                <td>&nbsp;</td>

                <td>&nbsp;</td>

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

                <td>2,658</td>

                <td>254</td>

                <td>80</td>

                <td>240</td>

                <td>755</td>

                <td>40</td>

                <td className={styles.emptyCell}></td>
              </tr>

              <tr className={styles.totals}>
                <td className={styles.totalsFirstCell}>Your Daily Goal </td>

                <td>2,850</td>
                <td>321</td>
                <td>63</td>
                <td>249</td>
                <td>2,300</td>
                <td>74</td>
                <td className={styles.emptyCell}></td>
              </tr>

              <tr className={styles.totals}>
                <td className={styles.totalsFirstCell}>Remaining</td>

                <td className={styles.possitive}>192</td>
                <td className={styles.possitive}>
                  <span className="macro-value">67</span>
                </td>
                <td className={styles.negative}>-17</td>
                <td className={styles.possitive}>9</td>
                <td className={styles.possitive}>1,545</td>
                <td className={styles.possitive}>34</td>
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
