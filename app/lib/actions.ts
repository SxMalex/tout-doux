'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { auth } from '@/auth';

const FormSchema = z.object({
  name: z.string(),
  userId: z.string(),
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

const CreateList = FormSchema.omit({ userId: true });
export async function createList(prevState: State, formData: FormData) {

  const session = await auth()
  console.log("createList")
  console.log(session)
  const user = await sql`SELECT * FROM tout_doux_users WHERE name = ${session?.user.name}`;
  const userId = user.rows[0].id

  if (!userId) {
    return {
      message: 'lol',
    };
  }

  const validatedFields = CreateList.safeParse({
    name: formData.get('listName')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create List.',
    };
  }

  const { name } = validatedFields.data;

  try {
    await sql`
      INSERT INTO tout_doux_lists (name, user_id)
      VALUES (${name}, ${userId})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create List.',
    };
  }
  revalidatePath('/home');
  redirect('/home');
}

export async function deleteList(id: string) {
  try {
    await sql`DELETE FROM tout_doux_lists WHERE id = ${id}`;
    revalidatePath('/home');
    return { message: 'Deleted List.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete List.' };
  }
  revalidatePath('/home');
}