import { Column, Entity } from '@wwwouter/typed-knex';
import { Organization } from './Organization';

@Entity('paymentProviderCustomerReferences')
export class PaymentProviderCustomerReference {
    @Column({ primary: true })
    public id: string;
    @Column()
    public organizationId: string;
    @Column({ name: 'organizationId' })
    public organization: Organization;
    @Column()
    public createdAt: string | Date;
    @Column()
    public updatedAt: string | Date;
}
