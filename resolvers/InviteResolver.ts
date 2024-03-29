// resolvers/InviteResolver.ts
import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { Invite } from "../entities/Invite";

@Resolver()
export class InviteResolver {
  @Query(() => [Invite])
  async invites(
    @Arg("page", () => Int, { defaultValue: 1 }) page: number,
    @Arg("pageSize", () => Int, { defaultValue: 20 }) pageSize: number
  ): Promise<Invite[]> {
    const skip = (page - 1) * pageSize;
    return Invite.find({ skip, take: pageSize });
  }

  @Query(() => Invite, { nullable: true })
  async invite(@Arg("id", () => Int) id: number): Promise<Invite | undefined> {
    return Invite.findOne(id);
  }

  @Mutation(() => Invite)
async createInvite(
  @Arg("inviteId") inviteId: string,
  @Arg("email") email: string,
  @Arg("accountId") accountId: string,
  @Arg("dateSent") dateSent: Date,
  @Arg("used") used: boolean
): Promise<Invite> {
  const invite = await Invite.create({
    invite_id: inviteId, // Corrected property name
    email,
    account_id: accountId, // Corrected property name
    date_sent: dateSent, // Corrected property name
    used
  }).save();
  return invite;
}

@Mutation(() => Invite)
async updateInvite(
  @Arg("id") id: number,
  @Arg("inviteId") inviteId: string,
  @Arg("email") email: string,
  @Arg("accountId") accountId: string,
  @Arg("dateSent") dateSent: Date,
  @Arg("used") used: boolean
): Promise<Invite | undefined> {
  let invite = await Invite.findOne(id);
  if (!invite) {
    return undefined;
  }

  invite.invite_id = inviteId; // Corrected property name
  invite.email = email;
  invite.account_id= accountId; // Corrected property name
  invite.date_sent = dateSent; // Corrected property name
  invite.used = used;

  await invite.save();
  return invite;
}


  @Mutation(() => Boolean)
  async deleteInvite(@Arg("id") id: number): Promise<boolean> {
    const invite = await Invite.findOne(id);
    if (!invite) {
      return false;
    }

    await Invite.remove(invite);
    return true;
  }
}
