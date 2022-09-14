import { Field, Float, ID, Int, ObjectType } from "type-graphql";
import { Exercise } from "./exercise.entity";

@ObjectType()
export class StrengthSet {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String, {defaultValue: 1 })
  setNumber: string;

  @Field(() => String, { nullable: true })
  weight: string;

  @Field(() => String, { nullable: true })
  reps: string;

  @Field(() => String, { nullable: true })
  notes: string;

  @Field(() => Exercise)
  exercise: Exercise;

  @Field(() => ID)
  exerciseId: number;
}
