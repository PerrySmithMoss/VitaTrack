import { Field, Float, ID, Int, ObjectType } from "type-graphql";
import { Exercise } from "./exercise.entity";

@ObjectType()
export class CardioSet {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int, {defaultValue: 1 })
  setNumber: number;

  @Field(() => String, { nullable: true })
  minutes: string;

  @Field(() => String, { nullable: true })
  seconds: string;

  @Field(() => String, { nullable: true })
  distance: string;

  @Field(() => String, { nullable: true })
  caloriesBurned: string;

  @Field(() => String, {  nullable: true })
  notes: string;

  @Field(() => Exercise)
  exercise: Exercise;

  @Field(() => ID)
  exerciseId: number;
}
