<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-lg-12">
                <div class="btn-create d-flex justify-content-end">
                    <b-button type="button"
                              style="background: #bd2130;color: #fff;border-radius: 4px;border: 1px solid #bd2130;"
                              @click="primaryModal = true"><i
                        class="icon-plus icons"></i> Create users
                    </b-button>
                </div>
                <div class="clear-fix mb-2"></div>
                <b-card header="Users Table">
                    <div class="option">
                        <div class="paginate-option d-flex justify-content-between">
                            <div class="option-page d-flex" style="width: 350px">
                                <div class="select-wrapper">
                                    <select v-if="this.searchUsers.name === '' && this.searchUsers.email === ''"
                                            class="select" v-model="paginateSelected"
                                            @click.prevent="getUsers(parseInt(paginateSelected))">
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    <select v-if="this.searchUsers.name !== '' || this.searchUsers.email !== ''"
                                            class="select" v-model="paginateSelected"
                                            @click.prevent="searchUsersAll(parseInt(paginateSelected))">
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                                <div class="select-wrapper1">
                                    <select class="select1" v-model="optionType"
                                            @click.prevent="handleOption(optionType)">
                                        <option value="0">All record</option>
                                        <option value="1">Trash</option>
                                    </select>
                                </div>
                                <div class="btn-delete" style="margin-left: 8px;padding: 8px; cursor: pointer">
                                    <a @click.prevent="deleteMultiUser(userIds)"
                                       style="color: #fff;background-color: #bd2130;border-color: #b21f2d;border-radius: 4px; padding: 10px"><i
                                        class="fa fa-trash-o fa-fw"></i> Delete all</a>
                                </div>
                            </div>
                            <div class="search d-flex justify-content-end" style="width: calc(100% - 350px)">
                                <div class="search-by-name" style="margin-left: 10px; margin-right: 15px">
                                    <input type="text" v-model="searchUsers.name"
                                           @keyup="searchUsersName(searchUsers.name)" placeholder="Search By Name ..."
                                           class="form-control"
                                           style="width: 400px;">
                                </div>
                                <div class="search-by-email">
                                    <input type="text" v-model="searchUsers.email"
                                           @keyup="searchUsersEmail(searchUsers.email)"
                                           placeholder="Search By Email ..." class="form-control"
                                           style="width: 400px;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th><input type="checkbox" @click="selectAll" v-model="allSelected"></th>
                            <th>Avatar</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th style="width: 70px">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="users.length > 0" v-for="(item, index) in users" :key="item.id" class="tr-shadow">
                            <td>
                                <input type="checkbox" v-model="userIds" @click="select" :value="item.id">
                            </td>
                            <td>
                                <img
                                    :src="item.profile ? (item.profile.avatar  ? '/uploads/' + item.profile.avatar : 'https://img.icons8.com/bubbles/2x/admin-settings-male.png') : 'https://img.icons8.com/bubbles/2x/admin-settings-male.png'"
                                    alt="aaa" width="60px">
                            </td>
                            <td>{{ item.name }}</td>
                            <td>
                                {{ item.email }}
                            </td>
                            <td>
                                <span v-if="item.status === 1" class="badge badge-success" style="cursor: pointer;"
                                      v-model="status" @click="changeStatus(0, item.id)">Actived</span>
                                <span v-if="item.status === 0" class="badge badge-danger" style="cursor: pointer"
                                      v-model="status" @click="changeStatus(1, item.id)">Locked</span>
                            </td>
                            <td>{{ item.created_at }}</td>
                            <td style="width: 70px;text-align: center">
                                <a style="cursor: pointer" class="item" data-toggle="tooltip"
                                   @click.prevent="deleteUser(item.id, index)" data-placement="top"
                                   title="Delete">
                                    <i class="fa fa-trash-o"></i>
                                </a>
                            </td>
                        </tr>
                        <tr v-if="users.length == 0">
                            <td colspan="8" style="text-align: center">Data Not Found</td>
                        </tr>
                        </tbody>
                    </table>
                    <div style="margin-top: 10px"></div>
                    <Pagination v-if="this.searchUsers.name === '' && this.searchUsers.email === ''"
                                :total-page="paginate.totalPage"
                                :path="paginate.path"
                                :currentPage="paginate.currentPage"
                                :optionPage="paginateSelected"
                                @updateCurrentPage="getUsers(paginateSelected,$event)"/>
                    <PaginationSearch v-if="this.searchUsers.name !== '' || this.searchUsers.email !== ''"
                                      :total-page="paginate.totalPage"
                                      :path="paginate.path"
                                      :currentPage="paginate.currentPage"
                                      :optionPage="paginateSelected"
                                      :listParams="`&&name=${searchUsers.name}&&email=${searchUsers.email}`"
                                      @updateCurrentPage="searchUsersAll(paginateSelected,$event, searchUsers.name, searchUsers.email)"/>
                </b-card>
            </div><!--/.col-->
        </div>
        <!-- modal user-->
        <b-modal title="Create users" class="modal-primary" v-model="primaryModal" @ok="primaryModal = false"
                 :hide-footer="true">
            <ValidationObserver ref="observer">
            <b-form slot-scope="{ validate }" @submit.prevent="validate().then(createUser)">
                <b-form-fieldset label="Username">
                    <ValidationProvider rules="required|min_name:4|max:50" v-slot="{ errors }" class="validate-provider"
                                        name="Username">
                        <b-form-input type="text" v-model="user.name" placeholder="Enter your username"></b-form-input>
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </b-form-fieldset>
                <b-form-fieldset label="Email">
                    <ValidationProvider rules="required|email|min:10|max:100" v-slot="{ errors }" class="validate-provider"
                                        name="Email">
                        <b-form-input type="text" v-model="user.email" placeholder="Enter your email"></b-form-input>
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </b-form-fieldset>
                <b-form-fieldset label="Password">
                    <ValidationProvider rules="required|min:6|max:50" v-slot="{ errors }" vid="password" class="validate-provider"
                                        name="Password">
                        <b-form-input type="password" v-model="user.password" placeholder="Enter your password"></b-form-input>
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </b-form-fieldset>
                <b-form-fieldset label="Confirm password">
                    <ValidationProvider rules="required|confirmed:password|min:6|max:50" v-slot="{ errors }" class="validate-provider"
                                        name="Password">
                        <b-form-input type="password" v-model="user.password_confirm" placeholder="Enter your confirm password"></b-form-input>
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </b-form-fieldset>
                <div class="form-group form-actions d-flex justify-content-end">
                    <b-button type="reset" size="sm" variant="danger" style="margin-right: 10px"><i
                        class="fa fa-refresh fa-fw"></i> Cancel
                    </b-button>
                    <b-button type="submit" size="sm" variant="success"><i class="fa fa-save fa-fw"></i> Save</b-button>
                </div>
            </b-form>
            </ValidationObserver>
        </b-modal>
    </div>
</template>

<script>
    import {deleteUserApi, getUsersApi, updateUserStatusApi, searchUserApi, createUsersApi} from "../../api/user.api";
    import Pagination from "../../containers/Pagination";
    import Swal from 'sweetalert2/dist/sweetalert2.js'
    import 'sweetalert2/src/sweetalert2.scss'
    import PaginationSearch from "../../containers/PaginationSearch";
    import _ from 'lodash'
    import {ValidationObserver, ValidationProvider} from 'vee-validate';

    export default {
        name: 'Users',
        components: {
            PaginationSearch,
            Pagination,
            ValidationObserver,
            ValidationProvider,
        },
        data() {
            return {
                users: [],
                user: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirm: ''
                },
                paginate: {
                    totalPage: 0,
                    path: '',
                    currentPage: 0,
                    totalRecord: 0,
                    perPage: 0
                },
                paginateSelected: '10',
                optionType: 0,
                selected: [],
                allSelected: false,
                userIds: [],
                status: 1,
                searchUsers: {
                    name: '',
                    email: ''
                },
                primaryModal: false,
                errors: {}
            }
        },
        watch: {
            ['paginate.totalRecord']() {
                if (this.paginate.currentPage === this.paginate.totalPage && (this.paginate.totalRecord % this.paginate.perPage === 0)) {
                    this.paginate.currentPage -= 1
                }
            }
        },
        methods: {
            async createUser() {
                const isValid = await this.$refs.observer.validate();
                if (isValid) {
                    await createUsersApi(this.user).then(response => {
                        this.getUsers();
                        this.primaryModal = false;
                    }).then(() => {
                        this.$bvToast.toast('Create user success', {
                            title: `CREATE SUCCESS`,
                            variant: 'success',
                            toaster: 'b-toaster-top-center',
                            solid: true
                        })
                    }).catch(error => {
                        this.errors = error.errors;
                        this.$bvToast.toast(`${this.errors.email}`, {
                            title: `EMAIL VALID`,
                            variant: 'error',
                            toaster: 'b-toaster-top-center',
                            solid: true
                        })
                    })
                } else {
                    return [];
                }
            },
            searchUsersName(params) {
                this.searchUsers.name = params;
                this.searchUsersAll();
            },
            searchUsersEmail(params) {
                this.searchUsers.email = params;
                this.searchUsersAll();
            },
            searchUsersAll(optionPage = 10, currentPage = 1) {
                return new Promise((resolve, reject) => {
                    searchUserApi(optionPage, currentPage, this.searchUsers.name.toLowerCase(), this.searchUsers.email.toLowerCase()).then(response => {
                        this.users = response.data.data;
                        this.paginate.totalPage = response.data.last_page
                        this.paginate.path = response.data.path
                        this.paginate.currentPage = response.data.current_page
                        this.paginate.totalRecord = response.data.total
                        this.paginate.perPage = response.data.per_page
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            handleOption(optionType) {
                switch (parseInt(optionType)) {
                    case 1:
                        this.$router.push({path: '/admin/users-trashed'})
                        break;
                }
            },
            selectAll: function () {
                this.userIds = [];
                if (!this.allSelected) {
                    for (let item in this.users) {
                        this.userIds.push(this.users[item].id.toString());
                    }
                }
            },
            select: function () {
                this.allSelected = false;
            },
            changeStatus(value, id) {
                return new Promise((resolve, reject) => {
                    updateUserStatusApi(id, {
                        status: value
                    }).then(response => {
                        this.status = response.data.status
                        resolve(response)
                    }).then(() => {
                        if (this.searchUsers.email === '' && this.searchUsers.name === '') {
                            this.getUsers(this.paginateSelected, this.paginate.currentPage)
                            this.$bvToast.toast('Update status success', {
                                title: `UPDATE STATUS`,
                                variant: 'success',
                                toaster: 'b-toaster-top-center',
                                solid: true
                            })
                        } else {
                            this.searchUsersAll(this.paginateSelected, this.paginate.currentPage, this.searchUsers.name, this.searchUsers.email)
                            this.$bvToast.toast('Update status success', {
                                title: `UPDATE STATUS`,
                                variant: 'success',
                                toaster: 'b-toaster-top-center',
                                solid: true
                            })
                        }
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            getUsers(optionPage = 10, currentPage = 1) {
                this.allSelected = false;
                return new Promise((resolve, reject) => {
                    getUsersApi(optionPage, currentPage).then(response => {
                        this.users = response.data.data
                        this.paginate.totalPage = response.user.last_page
                        this.paginate.path = response.user.path
                        this.paginate.currentPage = response.user.current_page
                        this.paginate.totalRecord = response.user.total
                        this.paginate.perPage = response.user.per_page
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            deleteUser(id, index) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        return new Promise((resolve, reject) => {
                            deleteUserApi(id).then(response => {
                                this.users.splice(index, 1);
                                this.paginate.totalRecord -= 1
                                resolve(response)
                            }).then(() => {
                                if (this.searchUsers.email === '' && this.searchUsers.name === '') {
                                    this.getUsers(this.paginateSelected, this.paginate.currentPage)
                                } else {
                                    this.searchUsersAll(this.paginateSelected, this.paginate.currentPage, this.searchUsers.name, this.searchUsers.email)
                                }
                            }).catch(error => {
                                reject(error)
                            })
                        })
                    }
                })
            },
            deleteMultiUser(userIds) {
                if (userIds.length <= 0) {
                    this.$bvToast.toast('Must choose minimum 1 record', {
                        title: `RECORD NOT FOUND`,
                        variant: 'danger',
                        toaster: 'b-toaster-top-center',
                        solid: true
                    })
                } else {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            return new Promise((resolve, reject) => {
                                deleteUserApi(userIds).then(response => {
                                    this.paginate.totalRecord -= userIds.length
                                    this.allSelected = false
                                    resolve(response)
                                }).then(() => {
                                    if (this.searchUsers.email === '' && this.searchUsers.name === '') {
                                        this.getUsers(this.paginateSelected, this.paginate.currentPage)
                                    } else {
                                        this.searchUsersAll(this.paginateSelected, this.paginate.currentPage, this.searchUsers.name, this.searchUsers.email)
                                    }
                                }).catch(error => {
                                    reject(error)
                                })
                            })
                        }
                    })
                }
            }
        },
        created() {
            this.searchUsersName = _.debounce(this.searchUsersName, 500);
            this.searchUsersEmail = _.debounce(this.searchUsersEmail, 500);
            this.getUsers();
        }
    }
</script>
<style lang="scss" scoped>
    .select-wrapper {
        position: relative;
        width: 70px;
        margin-bottom: 10px;
        border: 2px solid black;
        border-radius: 4px;
        // Dropdown icon
        &::after {
            color: black;
            content: '▾';
            margin-right: 10px;
            pointer-events: none;
            position: absolute;
            right: 10px;
            top: 5px;
            font-size: 14px;
        }
    }

    .select {
        -moz-appearance: none;
        -webkit-appearance: none;
        background: white;
        border: none;
        border-radius: 0;
        cursor: pointer;
        padding: 5px;
        width: 100%;
        font-size: 14px;

        &:focus {
            color: black;
        }

        // Hack for IE 11+
        &::-ms-expand {
            display: none;
        }
    }

    .select-wrapper1 {
        margin-left: 15px;
        position: relative;
        width: 120px;
        margin-bottom: 10px;
        border: 2px solid black;
        border-radius: 4px;
        // Dropdown icon
        &::after {
            color: black;
            content: '▾';
            margin-right: 10px;
            pointer-events: none;
            position: absolute;
            right: 10px;
            top: 5px;
            font-size: 14px;
        }
    }

    .select1 {
        -moz-appearance: none;
        -webkit-appearance: none;
        background: white;
        border: none;
        border-radius: 0;
        cursor: pointer;
        padding: 5px;
        width: 100%;
        font-size: 14px;

        &:focus {
            color: black;
        }

        // Hack for IE 11+
        &::-ms-expand {
            display: none;
        }
    }

    .table-data2.table thead th {
        color: #ffffff !important;
    }

    .validate-provider {
        color: #e2172c;
        font-size: 13px;
    }
</style>
