export type User = {
  id: string;
  name: string;
  password: string;
};

export type List = {
  id: string;
  name: number;
  user_id: string;
};

export type Todo = {
  id: string;
  name: string;
  list_id: string;
};

export type ListsTable = {
  id: string;
  name: string;
};

export type ListForm = {
  id: string;
  name: number;
  status: string;
};

export type TodosTable = {
  id: string;
  name: string;
  status: string;
};
