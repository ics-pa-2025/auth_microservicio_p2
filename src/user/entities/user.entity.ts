// typescript
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    // Preparado para roles/claims futuramente (puede migrar a tabla relacional)
    @Column('simple-array', {nullable: true})
    roles?: string[];

    @Column({type: 'varchar', length: 255, nullable: true, default: null})
    refreshTokenHash?: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}