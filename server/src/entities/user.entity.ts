import { Field, ObjectType } from "type-graphql";
import { Profile } from "./profile.entity";
import { Session } from "./session.entity";

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  email: string;

  password: string;

  @Field(() => String)
  username: string;

  @Field(() => Session, { nullable: true })
  session: Session;

  @Field(() => Profile, { nullable: true })
  profile: Profile;
}
