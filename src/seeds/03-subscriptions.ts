import Knex from 'knex';
import { paymentProviderCustomerReference1 } from './02-paymentProviderCustomerReferences';

const now = new Date();

export const subscription1 = {
    id: 'f48a6316-5eff-451e-b64a-a89b71fe059d',
    paymentProviderCustomerReferenceId: paymentProviderCustomerReference1.id,
    createdAt: now,
    updatedAt: now,
};

export async function seed(knex: Knex) {
    await knex('subscriptions').insert(subscription1);
}
