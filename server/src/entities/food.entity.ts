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
  quantity: number;

  @Field(() => Int, { nullable: true })
  calories: number;

  @Field(() => Float, { nullable: true })
  protein: number;

  @Field(() => Float, { nullable: true })
  fat: number;

  @Field(() => Float, { nullable: true })
  carbohydrate: number;

  @Field(() => Float, { nullable: true })
  sugar: number;

  @Field(() => User)
  user: User;

  @Field(() => String)
  userId: string;

  @Field(() => ID)
  nutritionId: number;

  @Field(() => [Nutrition])
  nutrition: Nutrition[];
}
