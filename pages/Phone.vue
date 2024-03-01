<template>
    <Navbar />
    <form @submit.prevent="onSubmit">
        <div class="card my-5 p-2" style="width: 18rem; height: fit-content">
            <h3 class="mb-3">Login</h3>
            <div class="mb-3 row">
                <label for="phone" class="col-sm-6 col-form-label">Phone Number<span class="text-danger">*</span></label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="phone" required placeholder="Enter phone no"
                        v-model="Credential.phone" />
                </div>
            </div>
            <button type="submit" class="btn btn-primary mb-3" id="sign-in-button">Submit</button>
            <button type="submit" class="btn btn-primary" @click="sendCode">Send Verification Code</button>
        </div>
    </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthstore } from '../stores/index';


const authStore = useAuthstore();
const Credential = reactive({
    phone: ''
});

const onSubmit = () => {
    if (!Credential.phone) {
        alert("Please enter Phone number");
        return;
    } else {
        authStore.phoneUser(Credential);
        console.log(Credential.phone)
    }
}

const sendCode = () => {
    if (!Credential.phone) {
        alert("Please enter OTP");
        return;
    } else {
        authStore.onSignInSubmit(Credential);
        console.log(Credential.phone)
    }
}

</script>