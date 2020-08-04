<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-lg-12">
                <div class="btn-create d-flex justify-content-end">
                    <b-button type="button"
                              style="background: #bd2130;color: #fff;border-radius: 4px;border: 1px solid #bd2130;"><i class="icon-plus icons"></i> Create users
                    </b-button>
                </div>
                <div class="clear-fix mb-2"></div>
                <b-card header="Users Table">
                    <div class="option">
                        <div class="paginate-option d-flex justify-content-between">
                            <div class="option-page d-flex" style="width: 350px">
                                <div class="select-wrapper">
                                    <select class="select">
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                                <div class="select-wrapper1">
                                    <select class="select1">
                                        <option value="0">All record</option>
                                        <option value="1">Trash</option>
                                    </select>
                                </div>
                                <div class="btn-delete" style="margin-left: 8px;padding: 8px; cursor: pointer">
                                    <a style="color: #fff;background-color: #bd2130;border-color: #b21f2d;border-radius: 4px; padding: 10px"><i
                                        class="fa fa-trash-o fa-fw"></i> Delete all</a>
                                </div>
                            </div>
                            <div class="search d-flex justify-content-end" style="width: calc(100% - 350px)">
                                <div class="search-by-name" style="margin-left: 10px; margin-right: 15px">
                                    <input type="text" placeholder="Search By Name ..."
                                           class="form-control"
                                           style="width: 400px;">
                                </div>
                                <div class="search-by-email">
                                    <input type="text" placeholder="Search By Email ..." class="form-control"
                                           style="width: 400px;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>Avatar</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th style="width: 70px">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="tr-shadow">
                            <td>
                                <input type="checkbox">
                            </td>
                            <td>
                                <img src=""
                                    alt="" width="60px">
                            </td>
                            <td></td>
                            <td>
                                
                            </td>
                            <td>
                                
                            </td>
                            <td></td>
                            <td style="width: 70px;text-align: center">
                                <a style="cursor: pointer" class="item" data-toggle="tooltip" data-placement="top"
                                   title="Delete">
                                    <i class="fa fa-trash-o"></i>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="8" style="text-align: center">Data Not Found</td>
                        </tr>
                        </tbody>
                    </table>
                    <div style="margin-top: 10px"></div>
                </b-card>
            </div><!--/.col-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Users',
        data() {
            return {

            }
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
