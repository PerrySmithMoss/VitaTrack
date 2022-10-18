import { Field, Float, ID, Int, ObjectType } from "type-graphql";
import { Nutrition } from "./nutrition.entity";
import { User } from "./user.entity";

@ObjectType()
export class Food {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  name: string;

  @Field(() => String)
  mealName: string;

  @Field(() => Float)
  numOfServings: number;

  @Field(() => String)
  servingSize: string;

  @Field(() => Int)
  calories: number;

  @Field(() => Float)
  protein: number;

  @Field(() => Float)
  fat: number;

  @Field(() => Float)
  carbohydrate: number;

  @Field(() => Float)
  sugar: number;

  @Field(() => Float)
  sodium: number;

  @Field(() => User)
  user: User;

  @Field(() => String)
  userId: string;

  @Field(() => ID)
  nutritionId: number;

  @Field(() => [Nutrition])
  nutrition: Nutrition[];
}
