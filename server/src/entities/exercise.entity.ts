import { Field, ID, Int, ObjectType } from "type-graphql";
import { CardioSet } from "./cardioSet.entity";
import { StrengthSet } from "./strengthSet.entity";
import { Workout } from "./workout.entity";

@ObjectType()
export class Exercise {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  name: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  exerciseType: "Strength" | "Cardio";

  @Field(() => Boolean, { defaultValue: false})
  unilateral: Boolean;

  @Field(() => Workout)
  workout: Workout;

  @Field(() => Int)  
  workoutId: number;

  @Field(() => [StrengthSet])
  strengthSets?: StrengthSet[];

  @Field(() => [CardioSet])
  cardioSets?: CardioSet[];
}
