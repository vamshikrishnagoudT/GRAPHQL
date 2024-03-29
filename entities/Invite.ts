// entities/Invite.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Account } from "./Account";

@Entity()
@ObjectType()
export class Invite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar" })
  invite_id: string;

  @Field()
  @Column({ type: "varchar" })
  email: string;

  @Field(() => ID)
  @Column()
  account_id: string; // Changed to type number

  @Field(() => Account) // Now this field will resolve to an Account type
  @ManyToOne(() => Account, account => account.invites)
  account: Account;

  @Field()
  @Column({ type: "datetime" })
  date_sent: Date;

  @Field()
  @Column({ type: "tinyint" })
  used: boolean;
}
