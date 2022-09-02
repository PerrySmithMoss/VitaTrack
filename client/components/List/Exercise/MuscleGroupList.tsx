import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useGlobalContext } from '../../../context/global.context';

interface MuscleGroupListProps {}

export const MuscleGroupList: React.FC<MuscleGroupListProps> = ({}) => {
  const { setSelectedMuscleGroup } = useGlobalContext();

  const handleSelectMuscleGroup = (muscleGroup: string) => {
    setSelectedMuscleGroup(muscleGroup);
  };
  return (
    <ul className="mt-4">
      <hr />
      {muscleGroups.map((muscleGroup) => (
        <li
          key={muscleGroup.id}
          onClick={() => handleSelectMuscleGroup(muscleGroup.muscle)}
          className="p-4 cursor-pointer hover:bg-gray-100 border-b flex items-center justify-between text-gray-800"
        >
          <div>{muscleGroup.muscle}</div>
          <div>
            <FiChevronRight size={20} />
          </div>
        </li>
      ))}
    </ul>
  );
};

const muscleGroups = [
  {
    id: 1,
    muscle: 'Abs',
  },
  {
    id: 2,
    muscle: 'Back',
  },
  {
    id: 3,
    muscle: 'Biceps',
  },
  {
    id: 4,
    muscle: 'Cardio',
  },
  {
    id: 5,
    muscle: 'Chest',
  },
  {
    id: 6,
    muscle: 'Legs',
  },
  {
    id: 7,
    muscle: 'Shoulders',
  },
  {
    id: 8,
    muscle: 'Triceps',
  },
];
