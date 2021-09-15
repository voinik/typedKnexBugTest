import { Column, Entity } from '@wwwouter/typed-knex';

@Entity('organizations')
export class Organization {
    @Column({ primary: true })
    public id: string;
    @Column()
    public accessUntilExtended: boolean;
    @Column()
    public createdAt: string | Date;
    @Column()
    public updatedAt: string | Date;
}
