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

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

const CreateList = FormSchema.omit({ userId: true });
export async function createList(prevState: State, formData: FormData) {

  const session = await auth()

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
      VALUES (${name}, ${session?.user?.id})
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

const UpdateList = FormSchema.omit({ id: true });
export async function updateList(id: string, prevState: State, formData: FormData) {

  const validatedFields = CreateList.safeParse({
    name: formData.get('listName'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Uptate Invoice.',
    };
  }

  const { name } = validatedFields.data;
  
  try {
    await sql`
        UPDATE tout_doux_lists
        SET name = ${name}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/home');
  redirect('/home');
}