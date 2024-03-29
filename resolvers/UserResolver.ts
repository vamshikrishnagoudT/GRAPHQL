// resolvers/UserResolver.ts
import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { User } from "../entities/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id") id: string): Promise<User | undefined> {
    return await User.findOne(id);
  }

  @Mutation(() => User)
  async createUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("dateCreated") dateCreated: Date,
    @Arg("lastLogin") lastLogin: Date,
    @Arg("permission") permission: string,
    @Arg("pushToken") pushToken: string,
    @Arg("accountId") accountId: string
  ): Promise<User> {
    const user = await User.create({
      name,
      email,
      password,
      date_created: dateCreated,
      last_login: lastLogin,
      permission,
      push_token: pushToken,
      account_id: accountId
    }).save();
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("dateCreated") dateCreated: Date,
    @Arg("lastLogin") lastLogin: Date,
    @Arg("permission") permission: string,
    @Arg("pushToken") pushToken: string,
    @Arg("accountId") accountId: string
  ): Promise<User | undefined> {
    let user = await User.findOne(id);
    if (!user) {
      return undefined;
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.date_created = dateCreated;
    user.last_login = lastLogin;
    user.permission = permission;
    user.push_token = pushToken;
    user.account_id = accountId;

    await user.save();
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string): Promise<boolean> {
    const user = await User.findOne(id);
    if (!user) {
      return false;
    }

    await User.remove(user);
    return true;
  }
}
