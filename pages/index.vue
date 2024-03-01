<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])
const name = ref('')

const input_content = ref('')
const input_category = ref(null)

const todos_asc = computed(() => todos.value.sort((a, b) => {
	return b.createdAt - a.createdAt
}))

watch(name, (newVal) => {
	localStorage.setItem('name', newVal)
})

watch(todos, (newVal) => {
	localStorage.setItem('todos', JSON.stringify(newVal))
}, {
	deep: true
})

const addTodo = () => {
	if (input_content.value.trim() === '' || input_category.value === null) {
		return
	}

	todos.value.push({
		content: input_content.value,
		category: input_category.value,
		done: false,
		editable: false,
		createdAt: new Date().getTime()
	})
	input_content.value = ''
	input_category.value = null
}

const removeTodo = (todo) => {
	todos.value = todos.value.filter((t) => t !== todo)
}

onMounted(() => {
	name.value = localStorage.getItem('name') || ''
	todos.value = JSON.parse(localStorage.getItem('todos')) || []
})
</script>

<template>
	<Navbar/>
	<main class="container">
		<section class="create-todo">
			<h1 class="title">CREATE A TODO</h1>

			<form id="new-todo-form" @submit.prevent="addTodo">
				<h3 for="content" class="form-label mb-3">What's on your todo list?</h3>
				<input type="text" class="form-control" name="content" id="content" placeholder="e.g. make a video" v-model="input_content" />

				<h3 for="category" class="form-label mt-4">Pick a category</h3>
				<div class="options">

					<label class="box">
						<input type="radio" class="form-check-input mb-2" name="category" id="category1" value="business" v-model="input_category" />
						<div class="form-check-label">Business</div>
					</label>

					<label class="box">
						<input type="radio" class="form-check-input mb-2" name="category" id="category2" value="personal" v-model="input_category" />
						<div class="form-check-label">Personal</div>
					</label>

				</div>

				<input class="btn btn-primary m-2" type="submit" value="Add todo" />
			</form>
		</section>

		<section class="todo-list">
			<h3>TODO LIST</h3>
			<div class="list" id="todo-list">

				<div v-for="todo in todos_asc" class="list-item" :class="`todo-item ${todo.done && 'done'}`">
					<label>
						<input class="form-check-input" type="checkbox" v-model="todo.done" />
					</label>

					<div class="todo-content mb-2 ms-3">
						<textarea class="form-control" type="text" v-model="todo.content" ></textarea>
					</div>

					<div class="actions">
						<button class="btn btn-danger ms-2" @click="removeTodo(todo)">Delete</button>
					</div>
				</div>

			</div>
		</section>

	</main>
</template>