import { Field, ObjectType } from "type-graphql";
import { User } from "./user.entity";

@ObjectType()
export class Session {
  @Field(() => String)
  userId: string;

  @Field(() => Boolean)
  valid: Boolean;

  @Field(() => String)
  userAgent: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => Date)
  updatedAt: string;

  @Field(() => [User])
  user: User;
}
