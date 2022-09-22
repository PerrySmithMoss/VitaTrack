import { Field, Float, ID, Int, ObjectType } from "type-graphql";
import { User } from "./user.entity";

@ObjectType()
export class Goals {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Float, { nullable: true })
  startingWeight: number;

  @Field(() => Float, { nullable: true })
  currentWeight: number;

  @Field(() => Float, { nullable: true })
  goalWeight: number;

  @Field(() => Int, { nullable: true })
  calories: number;

  @Field(() => Int, { nullable: true })
  protein: number;

  @Field(() => Int, { nullable: true })
  fat: number;

  @Field(() => Int, { nullable: true })
  carbohydrate: number;

  @Field(() => ID)
  userId: number;

  @Field(() => User)
  user: User;
}
