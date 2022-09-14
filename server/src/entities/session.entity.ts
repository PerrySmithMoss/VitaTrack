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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [User])
  user: User;
}
