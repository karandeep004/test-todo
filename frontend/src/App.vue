<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useTodoStore } from './stores/useTodoStore'

  const todo = useTodoStore()
  const { getTodos } = storeToRefs(todo)
  todo.loadTodos()

  const newTodo = ref('')
  const addTodo = () => {
    todo.addTodo(newTodo.value)
    newTodo.value = ''
  }

  const deleteTodo = (id: string) => {
    todo.deleteTodo(id)
  }

  const completeTodo = (id: string) => {
    const target = getTodos.value.find(todo => todo.id === id);
    if (target) {
      target.completed = !target.completed
      todo.updateTodo(id, target)
    }

  }
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-purple-500 py-7 overflow-hidden">
    <div class="w-1/2 p-5 bg-white rounded-lg shadow-xl">
      <h3 class="pb-4 mb-4 text-2xl font-bold text-center uppercase border-b-2 border-gray-300">todo app</h3>
      <section class="px-6 py-6 bg-blue-200 rounded-lg">
        <h4 class="text-lg font-semibold text-center uppercase">add todo</h4>
        <form @submit.prevent="addTodo()">
          <input
            v-model="newTodo"
            name="newTodo"
            autocomplete="off"
            class="w-full p-4 rounded my-5"
            placeholder="Please enter your todo"
          >
          <button class="w-full p-4 text-lg uppercase bg-green-500 hover:bg-green-600">Add ToDo</button>
        </form>
      </section>
      <article class="my-5 rounded-lg">
        <div
          class="flex items-center px-6 py-3 mb-4 rounded-lg"
          :class="[todo.completed ? 'bg-green-300': 'bg-yellow-300']"
          v-for="todo in getTodos"
          key="todo.id"
        >
          <p class="w-full text-grey-darkest">{{todo.title}}</p>
          <button
            class="flex-no-shrink p-2 ml-4 mr-2 rounded bg-green-700 hover:bg-green-600 text-white font-bold uppercase" v-if="!todo.completed"
            @click="completeTodo(todo.id)"
          >Done</button>
          <button
            class="flex-no-shrink p-2 ml-2 rounded bg-red-700 hover:bg-red-600 text-white font-bold uppercase"
            @click="deleteTodo(todo.id)"
          >Remove</button>
        </div>
      </article>
    </div>
  </div>
</template>
