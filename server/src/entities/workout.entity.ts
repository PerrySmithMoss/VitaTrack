import { Field, Float, ID, Int, ObjectType } from "type-graphql";
import { Exercise } from "./exercise.entity";
import { User } from "./user.entity";

@ObjectType()
export class Workout {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  name: string;

  @Field(() => String)
  startTime: String;

  @Field(() => String)
  endTime: String;

  @Field(() => Float, { nullable: true })
  bodyweight?: number;

  @Field(() => String, { nullable: true })
  notes?: String;

  @Field(() => User)
  user: User;

  @Field(() => String)
  userId: string;

  @Field(() => [Exercise])
  exercises: Exercise[];
}
