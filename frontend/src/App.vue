<template>
  <div class="bg-purple-500 h-screen flex justify-center items-center">
    <div class="w-1/2 bg-white rounded-lg p-5 shadow-xl">
      <h3 class="text-2xl font-bold text-center uppercase border-b-2 border-gray-300 pb-4 mb-4">todo app</h3>
      <section class="bg-blue-200 rounded-lg px-6 py-6">
        <h4 class="uppercase text-lg font-semibold text-center">add todo</h4>
        <form @submit.prevent="addTodo()">
          <input
            v-model="newTodo"
            name="newTodo"
            autocomplete="off"
            class="w-full p-4 rounded my-5"
            placeholder="Please enter your todo"
          >
          <button class="w-full p-4 uppercase text-lg bg-green-500 hover:bg-green-600">Add ToDo</button>
        </form>
      </section>
      <article class="my-5 rounded-lg">
        <div
          class="flex mb-4 items-center px-6 py-3 rounded-lg"
          :class="[todo.completed ? 'bg-green-300': 'bg-yellow-300']"
          v-for="(todo) in todos"
          key="todo.id"
        >
          <p class="w-full text-grey-darkest">{{todo.title}}</p>
          <button
            class="flex-no-shrink p-2 ml-4 mr-2 rounded bg-green-700 hover:bg-green-600 text-white font-bold uppercase" v-if="!todo.completed"
            @click="completeTodo(todo)"
          >Done</button>
          <button
            class="flex-no-shrink p-2 ml-2 rounded bg-red-700 hover:bg-red-600 text-white font-bold uppercase"
            @click="deleteTodo(todo)"
          >Remove</button>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'todo-app',
    data() {
      return {
        newTodo: ''
      }
    },
    created() {
      this.$store.dispatch('loadTodos');
    },
    computed: {
      todos() {
        return this.$store.getters.todos;
      }
    },
    methods: {
      completeTodo(todo) {
        this.$store.dispatch('updateTodo', todo);
      },
      deleteTodo(todo) {
        this.$store.dispatch('deleteTodo', todo);
      },
      addTodo() {
        this.$store.dispatch('addTodo', this.newTodo);
        this.newTodo = '';
      }
    }
  }
</script>