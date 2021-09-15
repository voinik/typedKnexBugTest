import Knex from 'knex';

const now = new Date();

export const organization1 = {
    id: '4f2279d2-c2bf-47e6-beab-3cc8172dd29c',
    accessUntilExtended: false,
    createdAt: now,
    updatedAt: now,
};

export async function seed(knex: Knex) {
    await knex('organizations').insert(organization1);
}
