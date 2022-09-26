import { Field, ID, Int, ObjectType } from "type-graphql";
import { Food } from "./food.entity";
import { User } from "./user.entity";

@ObjectType()
export class Nutrition {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  date: Date;

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

  @Field(() => [Food])
  foods: Food[];
}
