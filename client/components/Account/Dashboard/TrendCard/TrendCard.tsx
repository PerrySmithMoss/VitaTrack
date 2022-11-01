import React, { useEffect, useState } from 'react';
import { MdTrendingUp } from 'react-icons/md';
import {
  useGetCurrentUsersGoalsQuery,
  useGetCurrentUsersRemainingCaloriesByDateQuery,
  useUpsertUserGoalsMutation,
} from '../../../../graphql/generated/graphql';
import { Modal } from '../../../Modals/Modal';

interface TrendCardProps {
  title: string;
  value: number;
}

export const TrendCard: React.FC<TrendCardProps> = ({ title, value }) => {
  const [isEditTrendOpen, setIsEditTrendModalOpen] = useState(false);
  const [input, setInput] = useState(value);

  const { refetch: refetchUsersGoals } = useGetCurrentUsersGoalsQuery();
  const { refetch: refetchUsersRemainingCalories } =
    useGetCurrentUsersRemainingCaloriesByDateQuery();
  const { mutate } = useUpsertUserGoalsMutation({
    onSuccess: () => refetchUsersGoals(),
  });

  const handleCompleteEditingMacros = () => {
    if (title === 'Steps') {
      mutate({
        goalsInput: {
          dailySteps: input,
        },
      });
    } else if (title === 'Bodyweight') {
      mutate({
        goalsInput: {
          currentWeight: input,
        },
      });
    }

    setIsEditTrendModalOpen(false);
    refetchUsersGoals();
    refetchUsersRemainingCalories();
  };

  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <>
      <div
        className={`shadow h-[125px] w-full max-w-[325px] rounded-lg bg-[#fafafa] mt-5 flex flex-grow flex-1`}
      >
        <div className="pt-3 w-full px-4 flex flex-col h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-[#7e7e89] space-x-3">
              <div>
                <h4 className="text-[#7e7e89] font-semibold">{title}</h4>
              </div>
              <div className='hidden xxs:inline-block'>
                <MdTrendingUp />
              </div>
            </div>
            <div className="pl-5">
              <span
                onClick={() => setIsEditTrendModalOpen(!isEditTrendOpen)}
                className="text-brand-green hover:text-brand-green-hover cursor-pointer"
              >
                Edit
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-6">
            <p className="font-bold text-3xl">{value}</p>
          </div>
        </div>
      </div>
      {isEditTrendOpen && (
        <Modal
          open={isEditTrendOpen}
          onClose={() => setIsEditTrendModalOpen(false)}
          selector="editTrendModal"
          title={`Edit ${title}`}
        >
          <div className="relative flex  flex-col overflow-x-hidden w-full flex-grow flex-shrink min-h-0 overflow-auto">
            <div className="overflow-y-auto h-auto max-h-[600px] w-full">
              <section className="w-full flex flex-col">
                <div>
                  <div className="flex items-center bg-gray-100 border-b border-t">
                    <div className="block  text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      <span>{title}:</span>
                    </div>
                    <div className="flex justify-end bg-gray-100 text-gray-800 bg-transparent py-3 px-4 w-full outline-none">
                      {title === 'Bodyweight' ? (
                        <input
                          type="number"
                          step="0.1"
                          name="bodyweight"
                          value={input}
                          onChange={(e) => setInput(parseFloat(e.target.value))}
                          className="bg-gray-50 text-gray-800 text-center border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block w-3/4 p-2.5"
                        />
                      ) : title === 'Steps' ? (
                        <input
                        type="number"
                          name="steps"
                          value={input}
                          // onKeyPress={(event) => {
                          //   if (!/[0-9]/.test(event.key)) {
                          //     event.preventDefault();
                          //   }
                          // }}
                          onChange={(e) => setInput(parseInt(e.target.value))}
                          className="bg-gray-50 text-gray-800 text-center border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block w-3/4 p-2.5"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>
              <footer className="flex justify-end px-8 pb-6 pt-8">
                <button
                  // disabled={proteinInput + carbohydrateInput + fatInput !== 100}
                  onClick={handleCompleteEditingMacros}
                  className={`rounded px-5 py-1.5 bg-brand-green hover:bg-brand-green-hover  text-white focus:shadow-outline focus:outline-none 
           
                  `}
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditTrendModalOpen(false)}
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
    </>
  );
};
