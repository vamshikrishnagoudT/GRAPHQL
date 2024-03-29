// entities/Account.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Invite } from './Invite';
import { User } from './User';

@Entity()
@ObjectType()
export class Account extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar" })
  email: string;

  @Field()
  @Column({ type: "datetime" }) // Change to datetime
  date_created: Date;

  @Field()
  @Column({ type: "varchar" })
  stripe_customer_id: string;

  @Column({ type: "varchar", nullable: true }) // Assuming strip_subscription_id can be NULL
  strip_subscription_id: string | null;

  @Field()
  @Column({ type: "varchar" })
  plan: string;

  @Field()
  @Column({ type: "varchar" })
  referrer: string;

  @Field()
  @Column({ type: "tinyint" })
  active: boolean;

  @OneToMany(() => Invite, invite => invite.account_id)
  invites: Invite[];

  @OneToMany(() => User, user => user.account_id)
  users: User[];
}
