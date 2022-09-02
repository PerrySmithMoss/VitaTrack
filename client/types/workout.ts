export interface IWorkout {
  id: number;
  name: string;
  type: string;
  startTime: string;
  endTime: string;
  bodyWeight: number;
  notes: string;
  exercises: IExercise[];
}

export interface IExercise {
  id: number;
  name: string;
  category: string;
  exerciseType: string;
  unilateral: boolean;
  sets: IStrengthSet[] | ICardioSet[];
}

interface IStrengthSet {
  id: number;
  setNumber: number;
  weight: number;
  reps: number;
  notes: string;
}

interface ICardioSet {
  id: number;
  setNumber: number;
  minutes: number;
  seconds: number;
  distance: number;
  kcal: number;
  notes: string;
}
