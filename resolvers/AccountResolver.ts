import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { Account } from "../entities/Account";

@Resolver()
export class AccountResolver {
  // Queries

  @Query(() => [Account])
  async accounts(
    @Arg("page", () => Int, { defaultValue: 1 }) page: number,
    @Arg("pageSize", () => Int, { defaultValue: 20 }) pageSize: number
  ): Promise<Account[]> {
    return Account.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  @Query(() => Account, { nullable: true })
  async account(@Arg("id", () => Int) id: number): Promise<Account | undefined> {
    return Account.findOne(id);
  }

  // Mutations

  @Mutation(() => Account)
  async createAccount(
    @Arg('email') email: string,
    @Arg('date_created') date_created: string, // Change type to string
    @Arg('stripe_customer_id') stripe_customer_id: string,
    @Arg('strip_subscription_id') strip_subscription_id: string, // Changed name
    @Arg('plan') plan: string,
    @Arg('referrer') referrer: string,
    @Arg('active') active: boolean
  ): Promise<Account> {
    const account = Account.create({ 
      email, 
      date_created: new Date(date_created), // Parse string as Date object
      stripe_customer_id, 
      strip_subscription_id, // Updated property name
      plan, 
      referrer, 
      active 
    });
    await account.save();
    return account;
  }

  @Mutation(() => Account)
  async updateAccount(
    @Arg('id') id: number,
    @Arg('email', { nullable: true }) email?: string,
    @Arg('date_created', { nullable: true }) date_created?: string, // Change type to string
    @Arg('stripe_customer_id', { nullable: true }) stripe_customer_id?: string,
    @Arg('strip_subscription_id', { nullable: true }) strip_subscription_id?: string, // Changed name
    @Arg('plan', { nullable: true }) plan?: string,
    @Arg('referrer', { nullable: true }) referrer?: string,
    @Arg('active', { nullable: true }) active?: boolean
  ): Promise<Account | undefined> {
    const account = await Account.findOne(id);
    if (!account) throw new Error('Account not found');
    if (email) account.email = email;
    if (date_created) account.date_created = new Date(date_created); // Parse string as Date object
    if (stripe_customer_id) account.stripe_customer_id = stripe_customer_id;
    if (strip_subscription_id) account.strip_subscription_id = strip_subscription_id; // Updated property name
    if (plan) account.plan = plan;
    if (referrer) account.referrer = referrer;
    if (active !== undefined) account.active = active;
    await account.save();
    return account;
  }

  @Mutation(() => Boolean)
  async deleteAccount(@Arg('id') id: number): Promise<boolean> {
    const account = await Account.findOne(id);
    if (!account) throw new Error('Account not found');
    await account.remove();
    return true;
  }
}
