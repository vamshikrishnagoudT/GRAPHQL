// entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Account } from "./Account";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ type: "varchar" })
  name: string;

  @Field()
  @Column({ type: "varchar" })
  email: string;

  @Field()
  @Column({ type: "varchar" })
  password: string;

  @Field()
  @Column({ type: "datetime" }) // Change type to "datetime"
  date_created: Date;

  @Field()
  @Column({ type: "datetime", nullable: true }) // Change type to "datetime"
  last_login: Date | null;

  @Field()
  @Column({ type: "varchar" })
  permission: string;

  @Field()
  @Column({ type: "varchar" })
  push_token: string;

  @Field()
  @Column({ type: "varchar" })
  account_id: string;
}
