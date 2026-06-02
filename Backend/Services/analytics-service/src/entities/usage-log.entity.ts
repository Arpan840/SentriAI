import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('usage_logs')
@Index('idx_usage_logs_api_key_client_user_id', ['apiKey', 'clientUserId'])
export class UsageLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @Column({ nullable: true })
  apiKey!: string;

  @Column({
    nullable: true,
  })
  clientUserId!: string;

  @Column({
    nullable: true,
  })
  clientUserIp!: string;

  @Column()
  endpoint!: string;

  @Column()
  method!: string;

  @Column()
  allowed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
