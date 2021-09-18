const Knex = require('knex');

async function start() {
    const knex = Knex({
        client: "pg",
        connection: `postgres://ob:dev@localhost:5432/bugtests`,
    });

    const result = await knex('subscriptions').innerJoin('paymentProviderCustomerReferences as paymentProviderCustomerReference', 'subscriptions.paymentProviderCustomerReferenceId', 'paymentProviderCustomerReference.id').innerJoin('organizations as paymentProviderCustomerReference_organization', 'paymentProviderCustomerReference.organizationId', 'paymentProviderCustomerReference_organization.id').select('paymentProviderCustomerReference_organization.accessUntilExtended as paymentProviderCustomerReference.organization.accessUntilExtended').where({ 'subscriptions.id': 'f48a6316-5eff-451e-b64a-a89b71fe059d' });
    console.log('result: ', result);
    // Results in :
    // {
    //     'paymentProviderCustomerReference.organization.accessUntilExtend': false
    // }
}

start();