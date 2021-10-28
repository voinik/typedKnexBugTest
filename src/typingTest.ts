import Knex from "knex";
import { TypedKnex } from "@wwwouter/typed-knex";
import { Subscription } from "./classes/Subscription";
import { subscription1 } from "./seeds/03-subscriptions";

const knex = Knex({
    client: "pg",
    connection: `postgres://${process.env.PG_USER}:${process.env.PG_PASS}@localhost:5432/${process.env.PG_DBNAME}`,
});

async function example() {
    const typedKnex = new TypedKnex(knex);

    // Notice the ({..}) | null in the typing if you hover over the variable
    const fullyWrittenSubscription = await typedKnex.query(Subscription)
        .select('createdAt', 'id', 'paymentProviderCustomerReferenceId', 'updatedAt')
        .where('id', subscription1.id)
        .getSingleOrNull();

    // Notice the typing is only RemoveObjectsFrom<Subscription>, and no | null if you hover over the variable
    const shortHandSubscription = await typedKnex.query(Subscription)
        .where('id', subscription1.id)
        .getSingleOrNull();

    // For the linter
    return { fullyWrittenSubscription, shortHandSubscription };
}

example().then(() => {
    process.exit();
});

