<template>
    <nav aria-label="Page navigation ">
        <ul class="pagination justify-content-end">
            <li :class="['page-item',currentPage ===1 && 'disabled']">
                <a class="page-link"
                   :href="currentPage !==1 ?`${path}?option=${optionPage}&&page=${currentPage -1}`:''"
                   @click.prevent="updateCurrentPage(currentPage -1)"
                   tabindex="-1" aria-disabled="true">
                    Previous
                </a>
            </li>
            <li v-for="page in totalPage" v-if="Math.abs(page - currentPage) < 10 || page === totalPage || page === 0"
                :class="['page-item',currentPage === page&&'active']">
                <a class="page-link" :class="[{last: (page === totalPage  && Math.abs(page - currentPage) > 10)}, {first:(page === 0 && Math.abs(page - currentPage) > 10)}]"
                   :href="`${path}?option=${optionPage}&&page=${page}`"
                   @click.prevent="updateCurrentPage(page)">
                    {{ page }}
                </a>
            </li>
            <li :class="['page-item',currentPage === totalPage && 'disabled']">
                <a class="page-link"
                   :href="currentPage !==totalPage ?`${path}?option=${optionPage}&&page=${currentPage +1}`:''"
                   @click.prevent="updateCurrentPage(currentPage +1)"
                   tabindex="-1" aria-disabled="true">
                    Next
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            path: {
                required: true,
                type: String
            },
            totalPage: {
                required: true,
                type: Number
            },
            currentPage: {
                required: true,
                type: Number
            },
            optionPage: {
                required: true,
                type: String
            }
        },
        methods: {
            updateCurrentPage(page) {
                this.$emit('updateCurrentPage', page)
            }
        }
    }
</script>

<style scoped>
    a {
        color: #999;
    }
    .current {
        color: red;
    }
    ul {
        padding: 0;
        list-style-type: none;
    }
    li {
        display: inline;
        margin: 5px 5px;
    }

    a.first::after {
        content:'...'
    }

    a.last::before {
        content:'...'
    }
</style>
