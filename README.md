# There are 2 bugs described here, each has its own bug report

## Bug 1: Long query names result in trimming

To get it to work you'll need a postgres database and a .env file containing: `PG_USER`, `PG_PASS` and `PG_DBNAME`.

Then:
1. run `npm install`
2. run `npm run create-database`
3. run `npm start`

Check the outputs. 


As explained in the comments in `test.ts`, a portion of the first `console.log` output that I get is:
`organization: { accessUntilExtend: false }`

The second `console.log` that I get is:
`organizationDb:  { accessUntilExtended: false }`

Notice how the property name of `accessUntilExtended` is misspelled in the first log. I'm not sure what is happening here...

I did the same query using just regular Knex:
`node test.js`
Wich results in the same:
{ 'paymentProviderCustomerReference.organization.accessUntilExtend': false }


Edit: I've found the culprit. It's not TypedKnex, it's postgres:

> NOTICE:  identifier "paymentProviderCustomerReference.organization.accessUntilExtended" will be truncated to "paymentProviderCustomerReference.organization.accessUntilExtend"

The same thing happens in Knex.

Do you think you want to fix this problem within TypedKnex, or will you leave it up to the devs to be aware of this postgres behavior?

## Bug 2: .singleOrNull results in unexpected typing

Look at the `typingTest.ts` file. If you hover over `fullyWrittenSubscription`, you'll see the `({}) | null` type show up, as expected.  
However, if you hover over `shortHandSubscription` you'll only see `RemoveObjectsFrom<Subscription>`. No `| null`. 
Both variables result from a `.getSingleOrNull()` call.
