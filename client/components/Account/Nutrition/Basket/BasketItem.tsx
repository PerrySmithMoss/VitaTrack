import { FaPlus } from 'react-icons/fa';
import {
  portionNutrients,
  type BasketFood,
} from '../../../../utils/foodLookup';

interface BasketItemProps {
  item: BasketFood;
  onChange: (_item: BasketFood) => void;
  onRemove: () => void;
}

export function BasketItem({ item, onChange, onRemove }: BasketItemProps) {
  const { food, portion, quantity } = item;
  const calories = portionNutrients(item).calories;

  return (
    <li className="p-3 border-t border-b flex flow-row items-center space-x-3">
      <div className="grow w-full max-w-[280px]">{food.name}</div>
      <div className="w-[150px] pl-3">
        <input
          type="number"
          min="0.01"
          max="10000"
          step="any"
          aria-label={`Quantity for ${food.name}`}
          onChange={(event) => onChange({ ...item, quantity: event.target.value })}
          value={quantity}
          className="block p-2 w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm"
        />
      </div>
      <div className="w-[200px] pl-3">
        <select
          aria-label={`Serving for ${food.name}`}
          value={portion.name}
          onChange={(event) => {
            const nextPortion = food.portions.find((option) => option.name === event.target.value);
            if (nextPortion) {
              onChange({
                ...item,
                portion: nextPortion,
                quantity: nextPortion.name === 'g' ? '100' : '1',
              });
            }
          }}
          className="block p-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm"
        >
          {food.portions.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-center text-sm px-4 w-[100px]">
        <div>{calories.toLocaleString()}</div>
        <div>Cal</div>
      </div>
      <button
        onClick={onRemove}
        aria-label={`Remove ${food.name}`}
        type="button"
        className="relative cursor-pointer flex items-center justify-center"
      >
        <FaPlus
          style={{ transform: 'rotate(45deg)' }}
          size={24}
          className="text-[red] hover:text-red-700"
        />
      </button>
    </li>
  );
}
