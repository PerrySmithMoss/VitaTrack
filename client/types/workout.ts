export interface IWorkout {
  name: string;
  type: string;
  startTime: string;
  endTime: string;
  bodyWeight: number;
  notes: string;
  exercises: IExercise[];
}

export interface IExercise {
  name: string;
  category: string;
  exerciseType: string;
  unilateral: boolean;
  sets: IStrengthSet[] | ICardioSet[];
}

interface IStrengthSet {
  setNumber: number;
  weight: number;
  reps: number;
  notes: string;
}

interface ICardioSet {
  setNumber: number;
  minutes: number;
  seconds: number;
  distance: number;
  kcal: number;
  notes: string;
}
