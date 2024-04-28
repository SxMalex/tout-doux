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
  {name: 'private'},
  {name: 'public'},
]

const lists = [
  {
    id: '2deeeca9-26aa-d10a-9842-6249eb4932ac',
    name: 'ma super liste',
    user_id: users[0].id,
  },
  {
    id: 'd56b9a61-1042-1835-ab95-50f83d7e94ec',
    name: 'ma deuxième super liste',
    user_id: users[0].id,
  },
  {
    id: '0f5f015a-df6a-e78e-b4e6-b1c858f6e9ae',
    name: 'ma super liste mais pour mon deuxième utilisateur',
    user_id: users[1].id,
  },
];

const todoStatus = [
  {name: 'todo'},
  {name: 'in progress'},
  {name: 'done'},
]

const todos = [
  { name: 'faire un truc', list_id: lists[0].id },
  { name: 'faire un deuxième truc', list_id: lists[0].id },
  { name: 'faire un truc sur ma deuxième liste', list_id: lists[1].id },
  { name: 'faire un deuxième truc sur ma deuxième liste', list_id: lists[1].id },
  { name: 'faire un truc pour mon deuxième utilisateur', list_id: lists[2].id },
];

module.exports = {
  users,
  listStatus,
  lists,
  todoStatus,
  todos,
};
