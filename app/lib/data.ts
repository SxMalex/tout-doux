import { sql } from '@vercel/postgres';
import {
  Todo,
  User,
  List,
  ListsTable,
  ListForm,
  TodosTable,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { auth } from '@/auth';

const ITEMS_PER_PAGE = 6;
const prefix = process.env.POSTGRES_PREFIX

export async function fetchFilteredLists(
  query: string,
  currentPage: number,
) {
  noStore();
  const session = await auth()

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const lists = await sql<ListsTable>`
      SELECT
        lists.id,
        lists.name
      FROM tout_doux_lists AS lists
      JOIN tout_doux_users AS users ON lists.user_id = users.id
      WHERE lists.name ILIKE ${`%${query}%`}
        AND lists.user_id = ${`${session?.user?.id}`}::uuid
      ORDER BY lists.create_time, lists.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return lists.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists.');
  }
}

export async function fetchListsPages(query: string) {
  noStore();
  const session = await auth()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tout_doux_lists AS lists
    JOIN tout_doux_users AS users ON lists.user_id = users.id
    WHERE lists.name ILIKE ${`%${query}%`}
      AND lists.user_id = ${`${session?.user?.id}`}::uuid
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of lists.');
  }
}

export async function fetchListById(id: string) {
  noStore();
  const session = await auth()
  try {
    const lists = await sql<ListForm>`
      SELECT
        lists.id,
        lists.name,
        status.name AS status
      FROM tout_doux_lists AS lists
      JOIN tout_doux_list_status AS status ON lists.list_status_id = status.id
      WHERE lists.id = ${id}
        AND lists.user_id = ${`${session?.user?.id}`}::uuid
    `;
    return lists.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists.');
  }
}


export async function fetchFilteredTodos(
  query: string,
  currentPage: number,
  list_id: string
) {
  noStore();
  const session = await auth()

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const todos = await sql<TodosTable>`
      SELECT
        todos.id,
        todos.name
      FROM tout_doux_todos AS todos
      JOIN tout_doux_lists AS lists ON todos.list_id = lists.id
      WHERE todos.name ILIKE ${`%${query}%`}
        AND lists.id = ${`${list_id}`}::uuid
        AND lists.user_id = ${`${session?.user?.id}`}::uuid
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return todos.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch todos.');
  }
}


export async function fetchTodosPages(query: string, list_id: string) {
  noStore();
  const session = await auth()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tout_doux_todos AS todos
    JOIN tout_doux_lists AS lists ON todos.list_id = lists.id
    WHERE todos.name ILIKE ${`%${query}%`}
        AND lists.id = ${`${list_id}`}::uuid
        AND lists.user_id = ${`${session?.user?.id}`}::uuid
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of todos.');
  }
}

export async function fetchTodoById(id: string) {
  noStore();
  const session = await auth()
  try {
    const lists = await sql<TodosTable>`
      SELECT
        todos.id,
        todos.name
      FROM tout_doux_todos AS todos
      JOIN tout_doux_lists AS lists ON todos.list_id = lists.id
      WHERE todos.id = ${id}
        AND lists.user_id = ${`${session?.user?.id}`}::uuid
    `;
    return lists.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch todos.');
  }
}

export async function getUser(name: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM tout_doux_users WHERE name=${name}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getUserByPublicList() {
  noStore();
  try {
    const users = await sql`
      SELECT 
        DISTINCT(users.name), users.id
      FROM tout_doux_users AS users
      JOIN tout_doux_lists AS lists ON users.id = lists.user_id
      JOIN tout_doux_list_status AS list_status ON lists.list_status_id = list_status.id
      WHERE list_status.name = 'public'
    `;
    return users.rows
  } catch (error) {
    console.error('Failed to get user by public list')
    throw new Error('Failed to get user by public list')
  }
}

export async function getPublicListByUserId(user_id: string) {
  noStore();
  try {
    const lists = await sql`
      SELECT 
        lists.name, lists.id
      FROM tout_doux_lists AS lists
      JOIN tout_doux_users AS users ON users.id = lists.user_id
      JOIN tout_doux_list_status AS list_status ON lists.list_status_id = list_status.id
      WHERE list_status.name = 'public' AND users.id = ${`${user_id}`}::uuid
    `;
    return lists.rows
  } catch (error) {
    console.error('Failed to get public lists by user id')
    throw new Error('Failed to get public lists by user id')
  }
}

export async function getPublicTodoByListId(list_id: string) {
  noStore();
  try {
    const todos = await sql`
      SELECT 
        todos.name, todos.id
      FROM tout_doux_todos AS todos
      JOIN tout_doux_lists AS lists ON todos.list_id = lists.id
      JOIN tout_doux_list_status AS list_status ON lists.list_status_id = list_status.id
      WHERE list_status.name = 'public' AND lists.id = ${`${list_id}`}::uuid
    `;
    return todos.rows
  } catch (error) {
    console.error('Failed to get public todos by list id')
    throw new Error('Failed to get public todos by list id')
  }
}
