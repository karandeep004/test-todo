import { defineStore, acceptHMRUpdate } from 'pinia'
import {
  getTodos,
  postTodo,
  deleteTodo,
  updateTodo,
} from '../api/request'

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

type TodoState = {
  todos: Todo[];
}

export const useTodoStore = defineStore('todo', {
  state: (): TodoState => ({
    todos: []
  }),
  getters: {
    getTodos: (state: TodoState) => state.todos,
  },
  actions: {
    async loadTodos() {
      this.todos = await getTodos()
    },
    async addTodo(title: string) {
      const todo = await postTodo(title)
      this.todos.push(todo)
    },
    async deleteTodo(id: string) {
      await deleteTodo(id)
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    async updateTodo(id: string, todo: Todo) {
      await updateTodo(id, todo.completed)
    }
  }
})