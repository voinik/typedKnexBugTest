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
