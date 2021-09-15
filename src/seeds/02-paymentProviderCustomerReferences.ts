import Knex from 'knex';
import { organization1 } from './01-organizations';

const now = new Date();

export const paymentProviderCustomerReference1 = {
    id: '9d921b92-c733-434c-aad1-ca0f5f590ca8',
    organizationId: organization1.id,
    createdAt: now,
    updatedAt: now,
};

export async function seed(knex: Knex) {
    await knex('paymentProviderCustomerReferences').insert(paymentProviderCustomerReference1);
}
