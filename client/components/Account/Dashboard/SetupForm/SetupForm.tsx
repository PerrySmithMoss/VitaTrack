import React, { useState } from 'react';
import {
  useFinishUserSetupMutation,
  useGetCurrentUserQuery,
} from '../../../../graphql/generated/graphql';
import styles from './SetupForm.module.css';

interface SetupFormProps {}

export const SetupForm: React.FC<SetupFormProps> = () => {
  const [formStep, setFormStep] = useState(1);
  const [formAnswers, setFormAnswers] = useState({
    weightGoal: '',
    gender: '',
    currentWeight: '',
    goalWeight: '',
  });
  const { refetch: refetchUser } = useGetCurrentUserQuery();

  const { mutate } = useFinishUserSetupMutation({onSuccess: () => {
    refetchUser()
  }});

  const handleCompleteEditingGoals = () => {
    mutate({
      gender: formAnswers.gender,
      weightGoal: formAnswers.weightGoal,
      currentWeight: parseFloat(formAnswers.currentWeight),
      goalWeight: parseFloat(formAnswers.goalWeight),
    });
  };

  return (
    <div className="flex justify-center h-screen z-10">
      <main className={styles.formContainer}>
        <div className={styles.formOuter}>
          <span></span>
          {formStep === 3 ? (
            <div className="min-h-[650px] flex flex-col flex-wrap">
              <div className="flex justify-center w-full flex-col px-16 mt-10">
                <div className="mt-2">
                  <h1 className="font-bold text-2xl text-gray-800">
                    What is your gender?
                  </h1>
                  <p className="text-sm mt-1 text-gray-500">
                    Which one should I choose?
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center">
                      <input
                        id="gender-option-1"
                        type="radio"
                        name="gender"
                        onChange={() =>
                          setFormAnswers({ ...formAnswers, gender: 'Male' })
                        }
                        checked={formAnswers.gender === 'Male'}
                        className="h-4 w-4 border-gray-300 focus:ring-2  focus:ring-brand-green"
                        aria-labelledby="male gender"
                        aria-describedby="male gender"
                      />
                      <label
                        htmlFor="country-option-1"
                        className="text-gray-800 ml-2 block"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="gender-option-2"
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formAnswers.gender === 'Female'}
                        onChange={() =>
                          setFormAnswers({ ...formAnswers, gender: 'Female' })
                        }
                        className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-brand-green"
                        aria-labelledby="female gender"
                        aria-describedby="female gender"
                      />
                      <label
                        htmlFor="country-option-1"
                        className="text-gray-800 ml-2 block"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <h1 className="font-bold text-2xl text-gray-800">
                    What is your current weight?
                  </h1>
                  <p className="text-sm mt-1 text-gray-500">
                    It&apos;s ok to estimate. You can update this later.
                  </p>
                  <input
                    type="number"
                    name="currentWeight"
                    placeholder="Starting weight (lbs)"
                    value={formAnswers.currentWeight}
                    onChange={(e) =>
                      setFormAnswers({
                        ...formAnswers,
                        currentWeight: e.target.value,
                      })
                    }
                    className="block w-1/2 px-4 py-3 mt-3 placeholder-gray-600 bg-white border border-gray-200 rounded-md focus:border-brand-green focus:ring-brand-green focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mt-10">
                  <h1 className="font-bold text-2xl text-gray-800">
                    What is your goal weight?
                  </h1>
                  <p className="text-sm mt-1 text-gray-500">
                    Don&apos;t worry. This doesn&apos;t affect your daily calorie goal and
                    you can always change it later.
                  </p>
                  <input
                    type="number"
                    name="goalWeight"
                    placeholder="Goal weight (lbs)"
                    value={formAnswers.goalWeight}
                    onChange={(e) =>
                      setFormAnswers({
                        ...formAnswers,
                        goalWeight: e.target.value,
                      })
                    }
                    className="block w-1/2 px-4 py-3 mt-4 placeholder-gray-600 bg-white border border-gray-200 rounded-md focus:border-brand-green focus:ring-brand-green focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mt-14">
                  <div className="flex flex-row space-x-3 items-center w-full justify-between">
                    <div className="w-full">
                      <button
                        onClick={() => setFormStep(2)}
                        className="border-2 hover:bg-brand-green hover:bg-opacity-10 text-brand-green border-brand-green uppercase font-bold transition-colors duration-200 transform w-full py-3 rounded"
                      >
                        Back
                      </button>
                    </div>
                    <div className="w-full">
                      <button
                        onClick={handleCompleteEditingGoals}
                        className="border-2 hover:border-brand-green-hover border-brand-green text-white bg-brand-green hover:bg-brand-green-hover uppercase font-bold transition-colors duration-200 transform w-full py-3 rounded"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : formStep === 2 ? (
            <div className="min-h-[500px] flex flex-col flex-wrap">
              <div className="flex justify-center w-full flex-col px-16 mt-12">
                <div>
                  <h1 className="text-center text-gray-800 font-bold text-2xl">
                    What is your weight goal?
                  </h1>
                </div>
                <div className="mt-12">
                  <div className="mb-20 flex flex-col gap-2.5">
                    <div>
                      <button
                        onClick={() =>
                          setFormAnswers({
                            ...formAnswers,
                            weightGoal: 'Lose weight',
                          })
                        }
                        className={`border-2 ${
                          formAnswers.weightGoal === 'Lose weight'
                            ? 'border-brand-green font-bold'
                            : ' border-gray-300 hover:border-gray-400'
                        } text-lg w-full py-3 rounded`}
                      >
                        Lose weight
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          setFormAnswers({
                            ...formAnswers,
                            weightGoal: 'Maintain weight',
                          })
                        }
                        className={`border-2 ${
                          formAnswers.weightGoal === 'Maintain weight'
                            ? 'border-brand-green font-bold'
                            : 'border-gray-300 hover:border-gray-400'
                        } text-lg w-full py-3 rounded`}
                      >
                        Maintain weight
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          setFormAnswers({
                            ...formAnswers,
                            weightGoal: 'Gain weight',
                          })
                        }
                        className={`border-2 ${
                          formAnswers.weightGoal === 'Gain weight'
                            ? 'border-brand-green font-bold'
                            : ' border-gray-300 hover:border-gray-400'
                        } text-lg w-full py-3 rounded`}
                      >
                        Gain weight
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row space-x-3 items-center w-full justify-between">
                    <div className="w-full">
                      <button
                        onClick={() => setFormStep(1)}
                        className="border-2 hover:bg-brand-green hover:bg-opacity-10 text-brand-green border-brand-green uppercase font-bold transition-colors duration-200 transform w-full py-3 rounded"
                      >
                        Back
                      </button>
                    </div>
                    <div className="w-full">
                      <button
                        onClick={() => setFormStep(3)}
                        className="border-2 hover:border-brand-green-hover border-brand-green text-white bg-brand-green hover:bg-brand-green-hover uppercase font-bold transition-colors duration-200 transform w-full py-3 rounded"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-[520px] flex flex-col flex-wrap justify-center">
              <div className="flex items-center justify-center w-full flex-col flex-wrap px-16">
                <div>
                  <h1 className="text-[26px] font-bold text-center leading-[1.8rem] text-gray-800">
                    Welcome! Just a few questions so we can customize VitaTrack
                    for you.
                  </h1>
                </div>
                <div className="flex w-full mt-10">
                  <button
                    onClick={() => setFormStep(2)}
                    className="text-white bg-brand-green uppercase font-bold transition-colors duration-200 transform hover:bg-brand-green-hover w-full py-3 rounded"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* <div className={styles.formOuterContainer}>
            <form>
                <div className={styles.formInner}>
                    
                </div>
            </form>
          </div> */}
        </div>
      </main>
    </div>
  );
};
