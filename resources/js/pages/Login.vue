<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card-group mb-0">
                        <div class="card p-4">
                            <div class="card-body">
                                <loading :active.sync="isLoading"
                                         :is-full-page="fullPage"></loading>
                                <h1>Login</h1>
                                <p class="text-muted">Sign In to your account</p>
                                <ValidationObserver ref="observer">
                                    <form slot-scope="{ validate }" @submit.prevent="validate().then(login)">
                                        <div class="input-group mb-4">
                                            <span class="input-group-addon"><i class="icon-user"></i></span>
                                            <ValidationProvider rules="required|email|min:10|max:100" v-slot="{ errors }" class="validate-provider"
                                                                name="Email">
                                                <input type="text" class="form-control" v-model="user.email" placeholder="Email">
                                                <span class="error">{{ errors[0] }}</span>
                                            </ValidationProvider>
                                        </div>
                                        <div class="input-group mb-4">
                                            <span class="input-group-addon"><i class="icon-lock"></i></span>
                                            <ValidationProvider rules="required|min:6|max:50" v-slot="{ errors }" class="validate-provider"
                                                                name="Password">
                                                <input type="password" class="form-control" v-model="user.password" placeholder="Password">
                                                <span class="error">{{ errors[0] }}</span>
                                            </ValidationProvider>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <button type="button" class="btn btn-link px-0">Forgot password?
                                                </button>
                                            </div>
                                            <div class="col-6 text-right">
                                                <button type="submit" class="btn btn-primary px-4">Login</button>
                                            </div>
                                        </div>
                                    </form>
                                </ValidationObserver>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ValidationObserver, ValidationProvider} from 'vee-validate';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        name: 'Login',
        components: {
            ValidationObserver,
            ValidationProvider,
            Loading
        },
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                },
                isLoading: false,
                fullPage: true
            }
        },
        methods: {
            async login() {
                const isValid = await this.$refs.observer.validate();
                if (isValid) {
                    this.isLoading = true;
                    await this.$store.dispatch('login', this.user, {vm: this})
                        .then(() => {
                            this.isLoading = false;
                            this.$router.push({name: 'Home'});
                        }).then(() => {
                            this.$bvToast.toast('Welcome to vote dashboard', {
                                title: `LOGIN SUCCESS`,
                                variant: 'success',
                                toaster: 'b-toaster-top-center',
                                solid: true
                            })
                        }).catch(error => {
                            this.isLoading = false;
                            this.$bvToast.toast('Email or password are invalid', {
                                title: `LOGIN FAIL`,
                                variant: 'danger',
                                toaster: 'b-toaster-top-center',
                                solid: true
                            })
                        })
                } else {
                    return [];
                }
            }
        },
    }
</script>

<style scoped>
    .error {
        color: #e80e0e;
        font-size: 12px;
        position: absolute;
        left: 0;
        top: 37px;
    }
    .input-group {
        position: relative;
    }
    .validate-provider {
        width: calc(100% - 40px);
    }
    .validate-provider input {
        width: 100%;
    }
    .form-control:focus {
        outline: none;
        border: none !important;
        box-shadow: none !important;
        border: 1px solid #c2cfd6 !important;
    }
</style>
