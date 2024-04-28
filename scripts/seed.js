const { db } = require('@vercel/postgres');
const {
  users,
  listStatus
  lists,
  todoStatus
  todos,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS "tout_doux_users" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "name" VARCHAR(255) NOT NULL,
        "password" TEXT NOT NULL,
        "create_time" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "update_time" TIMESTAMPTZ NULL DEFAULT NULL,
        PRIMARY KEY ("id"),
        UNIQUE INDEX "tout_doux_users_name_key" ("name")
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO tout_doux_users (id, name, password)
        VALUES (${user.id}, ${user.name}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedListStatus(client){
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS "tout_doux_list_status" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL,
        PRIMARY KEY ("id")
      );
    `;

    console.log(`Created "list_status" table`);

    const insertedListStatus = await Promise.all(
      listStatus.map(
        (status) => client.sql`
          INSERT INTO tout_doux_list_status (name)
          VALUES (${status.name})
          ON CONFLICT (name) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedListStatus.length} lists status`);

    return {
      createTable,
      listStatus: insertedListStatus,
    };

  } catch (error) {
    console.error('Error seeding lits status:', error);
    throw error;
  }
}

async function seedLists(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "lists" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS "tout_doux_lists" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "name" VARCHAR(255) NOT NULL,
        "user_id" UUID NOT NULL,
        "list_status_id" UUID NOT NULL,
        "create_time" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "update_time" TIMESTAMPTZ NULL DEFAULT NULL,
        PRIMARY KEY ("id"),
        CONSTRAINT "list_status_id" FOREIGN KEY ("list_status_id") REFERENCES "tout_doux_list_status" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
        CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "tout_doux_users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
      );
    `;

    console.log(`Created "lists" table`);

    // Insert data into the "lists" table
    const insertedLists = await Promise.all(
      lists.map(
        (list) => client.sql`
        INSERT INTO tout_doux_lists (id, name, user_id)
        VALUES (${list.id}, ${list.name}, ${list.user_id})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedLists.length} lists`);

    return {
      createTable,
      lists: insertedLists,
    };
  } catch (error) {
    console.error('Error seeding lits:', error);
    throw error;
  }
}

async function seedTodoStatus(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS "tout_doux_todo_status" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "name" VARCHAR(255) NOT NULL,
        PRIMARY KEY ("id")
      );
    `;

    console.log(`Created "todos" table`);

    const insertedTodoStatus = await Promise.all(
      todoStatus.map(
        (status) => client.sql`
        INSERT INTO tout_doux_todo_status (name)
        VALUES (${status.name})
        ON CONFLICT (name) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedTodoStatus.length} todoStatus`);

    return {
      createTable,
      todoStatus: insertedTodoStatus,
    };

  } catch (error) {
    console.error('Error seeding todos:', error);
    throw error;
  }
}

async function seedTodos(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "todo" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS "tout_doux_todos" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "name" VARCHAR(255) NOT NULL,
        "list_id" UUID NOT NULL,
        "todo_status_id" UUID NOT NULL,
        "create_time" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "update_time" TIMESTAMPTZ NULL DEFAULT NULL,
        PRIMARY KEY ("id"),
        CONSTRAINT "list_id" FOREIGN KEY ("list_id") REFERENCES "tout_doux_lists" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
        CONSTRAINT "todo_status_id" FOREIGN KEY ("todo_status_id") REFERENCES "tout_doux_todo_status" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
      );
    `;

    console.log(`Created "todos" table`);

    // Insert data into the "todos" table
    const insertedTodos = await Promise.all(
      todos.map(
        (todo) => client.sql`
        INSERT INTO tout_doux_todos (name, list_id)
        VALUES (${todo.name}, ${todo.list_id})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedTodos.length} todos`);

    return {
      createTable,
      todos: insertedTodos,
    };
  } catch (error) {
    console.error('Error seeding todos:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedLists(client);
  await seedTodos(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
