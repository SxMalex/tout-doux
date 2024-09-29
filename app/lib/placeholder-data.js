const users = [
  {
    id: '65d04044-9472-34aa-fefd-ef1005df2d70',
    name: 'User',
    password: 'Password',
  },
  {
    id: '09fe890d-ae40-80b8-2fbe-509e84bcc8a1',
    name: 'User2',
    password: 'Password2',
  },
];

const listStatus = [
  {id: 'ca762631-e276-4bee-967c-00fe3c455c25', name: 'private'},
  {id: 'f1ca9c59-e5a4-4f8e-8a69-d12dc79c4f43', name: 'public'},
]

const lists = [
  {
    id: '2deeeca9-26aa-d10a-9842-6249eb4932ac',
    name: 'ma super liste',
    user_id: users[0].id,
    list_status_id: listStatus[0].id,
  },
  {
    id: 'd56b9a61-1042-1835-ab95-50f83d7e94ec',
    name: 'ma deuxième super liste',
    user_id: users[0].id,
    list_status_id: listStatus[1].id,
  },
  {
    id: '0f5f015a-df6a-e78e-b4e6-b1c858f6e9ae',
    name: 'ma super liste mais pour mon deuxième utilisateur',
    user_id: users[1].id,
    list_status_id: listStatus[0].id,
  },
];

const todoStatus = [
  {id: 'b8d64618-d04a-4694-9874-fa957499d3e8', name: 'todo'},
  {id: '39f4e352-bcca-40e7-816e-040837738114', name: 'in progress'},
  {id: '63a9bbac-1906-448e-ac73-c87d9eabd1e5', name: 'done'},
  {id: 'e3325ea7-c675-4590-9230-7fd011599483', name: 'fail'},
]

const todos = [
  { 
    name: 'faire un truc',
    list_id: lists[0].id,
    todo_status_id: todoStatus[0].id
  },
  {
    name: 'faire un deuxième truc',
    list_id: lists[0].id,
    todo_status_id: todoStatus[1].id 
  },
  { 
    name: 'faire un truc sur ma deuxième liste',
    list_id: lists[1].id,
    todo_status_id: todoStatus[2].id 
  },
  { 
    name: 'faire un deuxième truc sur ma deuxième liste', 
    list_id: lists[1].id, 
    todo_status_id: todoStatus[0].id 
  },
  { 
    name: 'faire un truc pour mon deuxième utilisateur', 
    list_id: lists[2].id, 
    todo_status_id: todoStatus[1].id 
  },
];

module.exports = {
  users,
  listStatus,
  lists,
  todoStatus,
  todos,
};
