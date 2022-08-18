import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./user.entity";

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  bio: string;

  @Field(() => String, { nullable: true })
  avatar: string;

  @Field(() => String, { nullable: true })
  avatarId: string;

  @Field(() => String)
  userId: string;

  @Field(() => [User])
  user: User;
}
