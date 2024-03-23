'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, signOut, auth } from '@/auth';
import { AuthError } from 'next-auth';

const listFormSchema = z.object({
  name: z.string(),
  // userId: z.string(),
});

const todoFormSchema = z.object({
  name: z.string(),
  // listId: z.string(),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logout(){
  await signOut();
}

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};


export async function deleteList(id: string) {
  
  const session = await auth()

  try {
    await sql`DELETE FROM tout_doux_lists WHERE id = ${id} AND user_id = ${session?.user?.id}`;
    revalidatePath('/home');
    return { message: 'Deleted List.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete List.' };
  }
  revalidatePath('/home');
}

export async function upsertList(
  id: string | undefined,
  prevState: State,
  formData: FormData
) {

  const session = await auth()

  const validatedFields = listFormSchema.safeParse({
    name: formData.get('listName'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to save List.',
    };
  }

  const { name } = validatedFields.data;

  if (id) {
    try {
      await sql`
        UPDATE tout_doux_lists
        SET name = ${name}
        WHERE id = ${id} 
          AND user_id = ${session?.user?.id}
        `;
    } catch (error) {
      console.log(error)
      return { message: 'Database Error: Failed to Update List.' };
    }
  }
  else {
    try {
      await sql`
        INSERT INTO tout_doux_lists (name, user_id)
        VALUES (${name}, ${session?.user?.id})
      `;
    } catch (error) {
      console.log(error)
      return { message: 'Database Error: Failed to Insert List.' };
    }
  }
 
  revalidatePath('/home');
  redirect('/home');
}

export async function deleteTodo(id: string, listId: string) {
  try {
    await sql`DELETE FROM tout_doux_todos WHERE id = ${id} AND list_id = ${listId}`;
    revalidatePath(`/lists/${listId}/edit`);
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Todo.' };
  }
  revalidatePath(`/lists/${listId}/edit`);
}

export async function upsertTodo(
  id: string | undefined,
  listId: string,
  prevState: State,
  formData: FormData
) {
  const session = await auth()

  const validatedFields = todoFormSchema.safeParse({
    name: formData.get('todoName'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to save todo.',
    };
  }

  const { name } = validatedFields.data;

  if (id) {
    try {
      await sql`
            UPDATE tout_doux_todos AS todos
            SET name = ${name}
            FROM tout_doux_lists AS lists
            WHERE todos.list_id = lists.id
              AND todos.id = ${id}
              AND lists.user_id = ${session?.user?.id}
          `;
    } catch (error) {
      console.log(error)
      return { message: 'Database Error: Failed to Update Todo.' };
    }
  }
  else {
    try {
      await sql`
          INSERT INTO tout_doux_todos (name, list_id)
          VALUES (${name}, ${listId})
        `;
    } catch (error) {
      console.log(error)
      return { message: 'Database Error: Failed to Insert Todo.' };
    }
  }
  revalidatePath(`/lists/${listId}/edit`);
  redirect(`/lists/${listId}/edit`);
}