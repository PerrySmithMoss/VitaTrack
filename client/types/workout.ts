export interface IWorkout {
  name: string;
  // type: string;
  startTime: string;
  endTime: string;
  bodyweight: number | null;
  notes: string | null;
  exercises: IExercise[];
}

export interface IExercise {
  name: string;
  category: string;
  exerciseType: string;
  unilateral: boolean;
  strengthSets: IStrengthSet[];
  cardioSets: ICardioSet[];
}

interface IStrengthSet {
  setNumber: number;
  weight: number | null;
  reps: number | null;
  notes: string | null;
  // exerciseId: number;
  // exercise: IExercise;
}

interface ICardioSet {
  minutes: number | null;
  seconds: number | null;
  distance: number | null;
  caloriesBurned: number | null;
  notes: number | null;
  // exerciseId: number;
  // exercise: IExercise;
}
