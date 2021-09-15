import Knex from 'knex';

export async function up(knex: Knex) {
    await knex.schema.createTable('organizations', table => {
        table.uuid('id').primary();
        table.boolean('accessUntilExtended').notNullable();
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('paymentProviderCustomerReferences', table => {
        table.uuid('id').primary();
        table.uuid('organizationId').notNullable()
            .references('id').inTable('organizations');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('subscriptions', table => {
        table.uuid('id').primary();
        table.uuid('paymentProviderCustomerReferenceId').notNullable()
            .references('id').inTable('paymentProviderCustomerReferences');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    // No!
}