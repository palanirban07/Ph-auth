<script setup>
import { reactive, ref } from 'vue';
import { useAuthstore } from '../stores/index';

const authStore = useAuthstore();
const credentials = reactive({
    email: '',
    password: ''
});

const onSubmit = () => {
    if (!credentials.email || !credentials.password) {
        alert("Please enter email and password");
        return;
    } else {
        authStore.loginUser(credentials);
    }
    credentials.email = ref('');
    credentials.password = ref('');
}
</script>

<template>
    <Navbar/>
    <form @submit.prevent="onSubmit">
        <div class="card my-5 p-2" style="width: 18rem; height: fit-content">
            <h3 class="mb-3">Login</h3>
            <div class="mb-3 row">
                <label for="inputEmail" class="col-sm-4 col-form-label">Username</label>
                <div class="col-sm-10">
                    <input type="email" name="username" class="form-control" id="inputEmail" v-model="credentials.email"/>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" name="password" class="form-control" id="inputPassword" v-model="credentials.password" />
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <p class="mt-2">New user? <a href="/Register">Register</a></p>
            <p class="mt-2">Want to login via OTP? <a href="/Phone">Phone</a></p>
        </div>
    </form>
</template>