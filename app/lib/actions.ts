'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { signIn, signOut, auth } from '@/auth';
import { AuthError } from 'next-auth';
const bcrypt = require('bcrypt');

const signupSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Password confirmation must match" }),
});

export async function registerUser(formData: { username: string, password: string, confirmPassword: string }) {
  // Parse and validate the form data
  const parsedData = signupSchema.safeParse({
    username: formData.username,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  });

  if (!parsedData.success) {
    // If validation fails, return the error messages
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Validation Failed',
    };
  }

  const { username, password, confirmPassword } = parsedData.data;

  // Ensure password and confirmPassword match
  if (password !== confirmPassword) {
    return {
      message: 'Passwords do not match',
    };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert the new user into the database
    await sql`
      INSERT INTO tout_doux_users (name, password)
      VALUES (${username}, ${hashedPassword})
    `;

    // Attempt to sign in the user after successful registration
    const signInResponse = await signIn('credentials', {
      redirect: false,  // We handle the redirect manually
      email: username,
      password: password,
    });

    if (signInResponse && signInResponse.error) {
      // Handle sign-in errors (if any)
      return { message: `Registration successful, but login failed: ${signInResponse.error}` };
    }
    
  } catch (error) {
    console.error('Database error:', error);
    return { message: 'Database Error: Failed to register user' };
  }
}


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


export async function updateListStatus({id, status}: {id: string; status: string;}) {
  try {
    await sql`
      UPDATE tout_doux_lists
      SET list_status_id = list_status.id
      FROM tout_doux_list_status AS list_status
      WHERE list_status.name =  ${status}
        AND tout_doux_lists.id = ${id}::uuid 
      `;
  } catch (error) {
    console.log(error)
    return { message: 'Database Error: Failed to Update Status List.' };
  }
  revalidatePath(`/lists/${id}/edit`);
}

export async function updateListName({id, name,}: {id: string; name: string;}) {
  try {
    await sql`
      UPDATE tout_doux_lists
      SET name = ${name}
      WHERE tout_doux_lists.id = ${id}::uuid 
      `;
  } catch (error) {
    console.log(error)
    return { message: 'Database Error: Failed to Update Name List.' };
  }
  revalidatePath(`/lists/${id}/edit`);
}

export async function insertList(listName: string){
  const session = await auth()
  await sql`
    INSERT INTO tout_doux_lists (name, user_id, list_status_id)
    VALUES (
      ${listName},
      ${session?.user?.id},
      (SELECT id FROM tout_doux_list_status WHERE name = 'private')
    )
  `;
  revalidatePath('/home');
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

export async function doneTodo(id: string, listId: string) {
  try {
    await sql`
      UPDATE tout_doux_todos
      SET todo_status_id = (SELECT id FROM tout_doux_todo_status WHERE name = 'done')
      WHERE id = ${id} AND list_id = ${listId}
    `;
    revalidatePath(`/lists/${listId}/edit`);
  } catch (error) {
    return { message: 'Database Error: Failed to Done Todo.' };
  }
  revalidatePath(`/lists/${listId}/edit`);
}

export async function todoTodo(id: string, listId: string) {
  try {
    await sql`
      UPDATE tout_doux_todos
      SET todo_status_id = (SELECT id FROM tout_doux_todo_status WHERE name = 'todo')
      WHERE id = ${id} AND list_id = ${listId}
    `;
    revalidatePath(`/lists/${listId}/edit`);
  } catch (error) {
    return { message: 'Database Error: Failed to todo Todo.' };
  }
  revalidatePath(`/lists/${listId}/edit`);
}

export async function inProgressTodo(id: string, listId: string) {
  try {
    await sql`
      UPDATE tout_doux_todos
      SET todo_status_id = (SELECT id FROM tout_doux_todo_status WHERE name = 'in progress')
      WHERE id = ${id} AND list_id = ${listId}
    `;
    revalidatePath(`/lists/${listId}/edit`);
  } catch (error) {
    return { message: 'Database Error: Failed to in progressTodo Todo.' };
  }
  revalidatePath(`/lists/${listId}/edit`);
}

export async function failTodo(id: string, listId: string) {
  try {
    await sql`
      UPDATE tout_doux_todos
      SET todo_status_id = (SELECT id FROM tout_doux_todo_status WHERE name = 'fail')
      WHERE id = ${id} AND list_id = ${listId}
    `;
    revalidatePath(`/lists/${listId}/edit`);
  } catch (error) {
    return { message: 'Database Error: Failed to fail Todo Todo.' };
  }
  revalidatePath(`/lists/${listId}/edit`);
}

export async function insertTodo(listId: string, todoName: string){
  const session = await auth()
  await sql`
      INSERT INTO tout_doux_todos (name, list_id, todo_status_id)
      VALUES (
        ${todoName},
        ${listId},
        (SELECT id FROM tout_doux_todo_status WHERE name = 'todo')
      )
  `;
  revalidatePath(`/lists/${listId}/edit`);
}


export async function updatetodoName({id, name,}: {id: string; name: string;}) {
  try {
    await sql`
      UPDATE tout_doux_todos
      SET name = ${name}
      WHERE tout_doux_todos.id = ${id}::uuid 
      `;
  } catch (error) {
    console.log(error)
    return { message: 'Database Error: Failed to Update Name Todo.' };
  }
  revalidatePath(`/lists/${id}/edit`);
}