import Knex from "knex";
import { TypedKnex } from "@wwwouter/typed-knex";
import { Subscription } from "./classes/Subscription";
import { subscription1 } from "./seeds/03-subscriptions";
import { Organization } from "./classes/Organization";
import { organization1 } from "./seeds/01-organizations";

const knex = Knex({
    client: "pg",
    connection: `postgres://${process.env.PG_USER}:${process.env.PG_PASS}@localhost:5432/${process.env.PG_DBNAME}`,
});

async function example() {
    const typedKnex = new TypedKnex(knex);

    const subscriptionDbQuery = await typedKnex.query(Subscription)
        .innerJoinColumn('paymentProviderCustomerReference')
        .innerJoinColumn('paymentProviderCustomerReference.organization')
        .select('id', 'paymentProviderCustomerReference.organizationId', 'paymentProviderCustomerReference.organization.accessUntilExtended')
        .where('id', subscription1.id);

    console.log('The query is: ', subscriptionDbQuery.toQuery());
    const subscriptionDb = await subscriptionDbQuery.getSingle();

    console.log(subscriptionDb);
    // Notice how the object contains the following: organization: { accessUntilExtend: false }
    // I think typedknex has omitted the last "ed" of the property name!

    const organizationDb = await typedKnex.query(Organization)
        .select('accessUntilExtended')
        .where('id', organization1.id)
        .getSingle();

    console.log('organizationDb: ', organizationDb);
    // Notice how here the property name here is correct
}

example().then(() => {
    process.exit();
});

