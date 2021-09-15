import { Column, Entity } from '@wwwouter/typed-knex';
import { PaymentProviderCustomerReference } from './PaymentProviderCustomerReference';

@Entity('subscriptions')
export class Subscription {
    @Column({ primary: true })
    public id: string;
    @Column({ name: 'paymentProviderCustomerReferenceId' })
    public paymentProviderCustomerReference: PaymentProviderCustomerReference;
    @Column()
    public paymentProviderCustomerReferenceId: string;
    @Column()
    public createdAt: string | Date;
    @Column()
    public updatedAt: string | Date;
}
