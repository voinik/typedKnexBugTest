import path from 'path';
import Knex from 'knex';
import { Client } from 'pg';


async function run() {
    const client = new Client({
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: 'postgres',
    });

    await client.connect();
    try {
        await client.query(`CREATE DATABASE ${process.env.PG_DBNAME} OWNER ${process.env.PG_USER};`);
        console.log('created database ' + process.env.PG_DBNAME);
        await client.end();

        const database = Knex({
            client: "pg",
            connection: `postgres://${process.env.PG_USER}:${process.env.PG_PASS}@localhost:5432/${process.env.PG_DBNAME}`,
            migrations: {
                tableName: 'knex_migrations',
                directory: path.join(__dirname, 'migrations'),
            },
            seeds: {
                directory: path.join(__dirname, 'seeds'),
            },
        });

        await database.migrate.latest();
        console.log('Database has been migrated');

        await database.seed.run();
        console.log('Database has been seeded');

        process.exit();
    } catch (e: any) {
        // code '42P04' means database already exists
        if (e.code === '42P04') {
            console.error(`database already exists... ${e}`);
        } else {
            console.error(e);
        }
        process.exit();
    }
}

run();
