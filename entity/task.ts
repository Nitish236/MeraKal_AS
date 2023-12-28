import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text") // Using text type for potentially long URLs
  endpoint!: string;

  @Column({ type: "text" })
  data!: string;

  @Column({ default: 0 }) // Default value set to 0
  delay!: number;

  @Column({ type: "varchar", length: 10 }) // Enough space for methods like 'GET', 'POST', etc.
  method!: string;

  @Column({
    type: "enum",
    enum: ["queued", "failed", "complete"], // Enum type for specific status values
    default: "queued",
  })
  status!: string;
}
