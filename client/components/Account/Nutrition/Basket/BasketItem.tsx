import React, { useState } from 'react';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa';

interface BasketItemProps {
  food: any;
  selectedFoods: any;
  setSelectedFoods: React.Dispatch<React.SetStateAction<any>>;
}

export const BasketItem: React.FC<BasketItemProps> = ({
  food,
  selectedFoods,
  setSelectedFoods,
}) => {
  const [quantity, setQuantity] = useState(food.serving_qty);
  const [measurement, setMeasurement] = useState(food.serving_unit);

  const handleChangeQty = (
    e: React.ChangeEvent<HTMLInputElement>,
    foodName: string
  ) => {
    const { value } = e.target;

    setQuantity(parseInt(value));

    if (value !== '') {
      const changedFoods = selectedFoods.map((food: any) => {
        const caloriesPerGram = food.nf_calories / food.serving_weight_grams;
        const fatPerGram = food.nf_total_fat / food.serving_weight_grams;
        const carbsPerGram =
          food.nf_total_carbohydrate / food.serving_weight_grams;
        const proteinPerGram = food.nf_protein / food.serving_weight_grams;
        const sodiumPerGram = food.nf_sodium / food.serving_weight_grams;
        const sugarPerGram = food.nf_sugars / food.serving_weight_grams;
        if (foodName === food.food_name) {
          if (food.userMeasurements) {
            if (
              measurement === 'g' ||
              measurement === 'grams' ||
              measurement === 'gram'
            ) {
              return {
                ...food,
                userMeasurements: {
                  ...food.userMeasurements,
                  quantity: parseInt(value),
                  calories: Math.round(caloriesPerGram * parseInt(value)),
                  carbs: Math.round(carbsPerGram * parseInt(value)),
                  protein: Math.round(proteinPerGram * parseInt(value)),
                  fat: Math.round(fatPerGram * parseInt(value)),
                  sodium: Math.round(sodiumPerGram * parseInt(value)),
                  sugar: Math.round(sugarPerGram * parseInt(value)),
                },
              };
            } else {
              return {
                ...food,
                userMeasurements: {
                  ...food.userMeasurements,
                  quantity: parseInt(value),
                  calories: Math.round(
                    caloriesPerGram *
                      food.userMeasurements.servingWeight *
                      parseInt(value)
                  ),
                  carbs: Math.round(
                    carbsPerGram *
                      food.userMeasurements.servingWeight *
                      parseInt(value)
                  ),
                  protein: Math.round(
                    proteinPerGram *
                      food.userMeasurements.servingWeight *
                      parseInt(value)
                  ),
                  fat: Math.round(
                    fatPerGram *
                      food.userMeasurements.servingWeight *
                      parseInt(value)
                  ),
                  sodium: Math.round(
                    sodiumPerGram *
                      food.userMeasurements.servingWeight *
                      parseInt(value)
                  ),
                  sugar: Math.round(
                    sugarPerGram *
                      food.userMeasurements.servingWeight *
                      parseInt(value)
                  ),
                },
              };
            }
          } else {
            return {
              ...food,
              userMeasurements: {
                ...food.userMeasurements,
                quantity: parseInt(value),
                calories: Math.round(
                  caloriesPerGram * quantity * food.userMeasurements.quantity
                ),
                carbs: Math.round(
                  carbsPerGram * quantity * food.userMeasurements.quantity
                ),
                protein: Math.round(
                  proteinPerGram * quantity * food.userMeasurements.quantity
                ),
                fat: Math.round(
                  fatPerGram * quantity * food.userMeasurements.quantity
                ),
                sodium: Math.round(
                  sodiumPerGram * quantity * food.userMeasurements.quantity
                ),
                sugar: Math.round(
                  sugarPerGram * quantity * food.userMeasurements.servingWeight
                ),
              },
            };
          }
        }
        return food;
      });

      setSelectedFoods(changedFoods);
    }
  };

  const handleChangeMeasurement = (
    e: React.ChangeEvent<HTMLSelectElement>,
    foodName: string
  ) => {
    const { value } = e.target;

    setMeasurement(value);

    const altMeasure = food.alt_measures.find(
      (measure: any) => measure.measure === value
    );

    if (value === 'g' || value === 'grams') {
      const changedFoods = selectedFoods.map((food: any) => {
        if (foodName === food.food_name) {
          const caloriesPerGram = food.nf_calories / food.serving_weight_grams;
          return {
            ...food,
            userMeasurements: {
              ...food.userMeasurements,
              calories: Math.round(caloriesPerGram * quantity),
              carbs: Math.round(
                (food.nf_total_fat / food.serving_weight_grams) *
                  food.userMeasurements.quantity
              ),
              protein: Math.round(
                (food.nf_protein / food.serving_weight_grams) *
                  food.userMeasurements.quantity
              ),
              fat: Math.round(
                (food.nf_total_fat / food.serving_weight_grams) *
                  food.userMeasurements.quantity
              ),
              sodium: Math.round(
                (food.nf_sodium / food.serving_weight_grams) *
                  food.userMeasurements.quantity
              ),
              sugar: Math.round(
                (food.nf_sugars / food.serving_weight_grams) *
                  food.userMeasurements.quantity
              ),
              measure: value,
              quantity: quantity,
              servingWeight: quantity,
            },
          };
        }
        return food;
      });
      setSelectedFoods(changedFoods);
    } else {
      const changedFoods = selectedFoods.map((food: any) => {
        if (foodName === food.food_name) {
          const caloriesPerGram = food.nf_calories / food.serving_weight_grams;
          const fatPerGram = food.nf_total_fat / food.serving_weight_grams;
          const carbsPerGram =
            food.nf_total_carbohydrate / food.serving_weight_grams;
          const proteinPerGram = food.nf_protein / food.serving_weight_grams;
          const sodiumPerGram = food.nf_sodium / food.serving_weight_grams;
          const sugarPerGram = food.nf_sugars / food.serving_weight_grams;
          return {
            ...food,
            userMeasurements: {
              ...food.userMeasurements,
              calories: Math.round(
                caloriesPerGram *
                  altMeasure.serving_weight *
                  food.userMeasurements.quantity
              ),
              carbs: Math.round(
                carbsPerGram *
                  food.userMeasurements.servingWeight *
                  food.userMeasurements.quantity
              ),
              protein: Math.round(
                proteinPerGram *
                  food.userMeasurements.servingWeight *
                  food.userMeasurements.quantity
              ),
              fat: Math.round(
                fatPerGram *
                  food.userMeasurements.servingWeight *
                  food.userMeasurements.quantity
              ),
              sodium: Math.round(
                sodiumPerGram *
                  food.userMeasurements.servingWeight *
                  food.userMeasurements.quantity
              ),
              sugar: Math.round(
                sugarPerGram *
                  food.userMeasurements.servingWeight *
                  food.userMeasurements.quantity
              ),
              measure: value,
              quantity: quantity,
              servingWeight: altMeasure.serving_weight,
            },
          };
        }
        return food;
      });
      setSelectedFoods(changedFoods);
    }
  };

  const handleRemoveFoodFromBasket = (foodName: string) => {
    const foods = selectedFoods;
    const filtered = foods.filter((food: any) => food.food_name !== foodName);

    setSelectedFoods(filtered);
  };

  return (
    <li
      key={food.food_name}
      className="p-3 border-t border-b flex flow-row items-center space-x-3"
    >
      <Image src={food.photo.thumb} height={35} width={35} />
      <div className="flex-grow w-full max-w-[280px]">
        {food.brand_name ? (
          <div className="flex-col flex">
            <div>
              <span className="text-sm text-gray-500">{food.brand_name}</span>
            </div>
            <div>
              <span>{food.food_name}</span>
            </div>
          </div>
        ) : (
          <div>
            <span>{food.food_name}</span>
          </div>
        )}
      </div>
      <div className="float-left w-[150px] pl-3">
        <input
          type="number"
          // step="0.01"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          name="servingQty"
          id="servingQty"
          onChange={(e) => handleChangeQty(e, food.food_name)}
          value={quantity}
          className="block p-2 w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded"
        />
      </div>
      <div className="w-[200px] pl-3">
        <select
          onChange={(e) => handleChangeMeasurement(e, food.food_name)}
          className="block p-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded"
          name="measurement"
          id="measurement"
        >
          {food.alt_measures ? (
            <>
              {food.alt_measures.map((measurement: any, index: number) => (
                <option key={index} value={measurement.measure}>
                  {measurement.measure}
                </option>
              ))}
            </>
          ) : (
            <option value={food.serving_unit}>{food.serving_unit}</option>
          )}
        </select>
      </div>
      <div className="flex flex-col items-center text-sm px-4 w-[100px]">
        {Object.hasOwn(food, 'userMeasurements') ? (
          <div>{food.userMeasurements.calories.toLocaleString()}</div>
        ) : (
          <div>{Math.round(food.nf_calories).toLocaleString()}</div>
        )}
        <div>Cal</div>
      </div>
      <div>
        <button
          onClick={() => handleRemoveFoodFromBasket(food.food_name)}
          type="button"
          className="relative cursor-pointer flex text-center items-center justify-center "
          data-modal-toggle="default-modal"
        >
          <FaPlus
            // onClick={handleShowAddFoodDrawer}
            style={{ transform: 'rotate(45deg)' }}
            size={24}
            className="text-[red] hover:text-red-700"
          />
        </button>
      </div>
    </li>
  );
};
