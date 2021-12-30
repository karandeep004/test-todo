import axios from 'axios';
import nProgress from 'nprogress';

const request = axios.create({
  baseURL: '/api/v1/tasks',
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => error
);


type Todo = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}


export const getTodos = async (): Promise<Todo[]> => {
  nProgress.start();
  const res = await request.get('/');
  nProgress.done();
  return res.data;
}

export const postTodo = async (title: string): Promise<Todo> => {
  nProgress.start();
  const res = await request.post('/', { title });
  nProgress.done();
  return res.data;
}

export const deleteTodo = async (id: string): Promise<void> => {
  nProgress.start();
  await request.delete(`/${id}`);
  nProgress.done();
}

export const updateTodo = async (id: string, completed: boolean): Promise<Todo> => {
  nProgress.start();
  const res = await request.put(`/${id}`, { completed });
  nProgress.done();
  return res.data;
}
