# WunderBlog - A WunderGraph demo project

This is a demo project built using WunderGraph, NextJS, Prisma and PostgreSQL. It is a very bare bones blog page where you can create posts and view any of the three latest posts.

Essentially, this is the result of adding a posting functionality to the result of the NextJS tutorial, by using WunderGraph to manage a PostgreSQL database.

## Running the project

### Using docker and docker-compose

Create a file named `database.env` with the following three variables. The values can be different in your case
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=example
```

Create a file named `.env` with a single variable named `DATABASE_URL`, which should be a database connection string using port 54322. The values on this string need to match the ones you used on the three variables above. Using the same three as in the above example, it would be:

`DATABASE_URL="postgresql://postgres:postgres@localhost:54322/example?schema=public"`

Install the dependencies and run the complete example in one command:

```shell
npm install && npm start
```

### Using your own custom database

Create a file named `.env` with a single variable named `DATABASE_URL`. *This must be a PostgreSQL database, since WunderGraph has been configured to expect one.*

Install the dependencies and run the complete example in one command:

```shell
npm install && npm start:custom
```

After a while, a new browser tab will open on your default browser,
and you can start exploring the application.
If no tab is open, navigate to [http://localhost:3000](http://localhost:3000).

## Troubleshooting

Should you run into issues you should try to manually follow the required steps to get the project up and running. In order:

- get a PostgreSQL up and running and make sure the `DATABASE_URL` variable in the `.env` file points to it
- apply Prisma migrations to create the table by running `npx prisma migrate dev`
- run WunderGraph: `npm run wundergraph`
- run the client: `npm run dev`
- (optional) seed the database: `npm run seed`

## Known Issues

- Initial data seems not to load sometimes, and some of those with errors. Reloading seems to fix
- Using docker-compose to run the database leads to it taking a very long time (30-45 seconds) to be available. The workaround was to include a 45 second wait before attempting to migrate, otherwise the migration would fail
