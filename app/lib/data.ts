import { sql } from '@vercel/postgres';
import {
  Todo,
  User,
  List,
  ListsTable,
  ListForm,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { auth } from '@/auth';

const ITEMS_PER_PAGE = 6;

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
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchListById(id: string) {
  noStore();
  const session = await auth()
  try {
    const lists = await sql<ListForm>`
      SELECT
        lists.id,
        lists.name
      FROM tout_doux_lists AS lists
      WHERE lists.id = ${id}
        AND lists.user_id = ${`${session?.user?.id}`}::uuid
    `;
    return lists.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists.');
  }
}


export async function getUser(name: string): Promise<User | undefined> {
  console.log("getUser")
  try {
    const user = await sql<User>`SELECT * FROM tout_doux_users WHERE name=${name}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
