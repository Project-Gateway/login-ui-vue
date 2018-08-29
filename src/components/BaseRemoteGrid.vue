<template>
  <div>
    <dx-grid
            v-if="!loading"
            :rows="rows"
            :columns="columns"
    >
      <dx-table/>
      <dx-paging-state
              v-bind:currentPage="currentPage"
              v-on:update:currentPage="changeCurrentPage"
              v-bind:pageSize="pageSize"
              v-on:update:pageSize="changePageSize"
      ></dx-paging-state>
      <dx-custom-paging
              v-bind:totalCount="totalCount"
      ></dx-custom-paging>
      <dx-paging-panel
              v-bind:pageSizes="pageSizes"
      ></dx-paging-panel>
      <dx-table-header-row></dx-table-header-row>
    </dx-grid>
    <h3 v-else>Loading...</h3>
  </div>
</template>

<script>
  import {
    DxPagingState,
    DxSortingState,
    DxCustomPaging,
  } from '@devexpress/dx-vue-grid';
  import {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxPagingPanel,
  } from '@devexpress/dx-vue-grid-bootstrap4';
  import axios from 'axios';
  import loginApiConfig from '../config/login-api';

  export default {
    components: {
      DxSortingState,
      DxPagingState,
      DxCustomPaging,
      DxGrid,
      DxTable,
      DxTableHeaderRow,
      DxPagingPanel,
    },
    name: 'base-grid',
    data() {
      return {
        columns: this.columnsConfig,
        rows: [],
        totalCount: 0,
        pageSize: this.pageSizeConfig,
        pageSizes: this.pageSizesConfig,
        currentPage: 0,
        loading: true
      };
    },
    props: {
      apiMethod: {
        type: String,
        'default': 'GET'
      },
      apiUrl: {
        type: String,
        'default': loginApiConfig.URL
      },
      apiRoute: {
        type: String,
        required: true
      },
      requestBody: {},
      columnsConfig: {
        type: Array,
        required: true
      },
      rowsCallback: {
        'default': () => rows => rows
      },
      pageSizeConfig: {
        type: Number,
        'default': 10
      },
      pageSizesConfig: {
        type: Array,
        'default': () => [5, 10, 15, 20]
      }
    },
    methods: {
      loadData() {
        axios({
          url: `${this.apiUrl}${this.apiRoute}`,
          data: this.requestBody,
          params: {
            pages: this.pageSize,
            page: this.currentPage + 1
          },
          method: this.apiMethod
        }).then(({data: payload}) => {
          this.rows = payload.data.map(this.rowsCallback);
          this.totalCount = payload.total;
          this.loading = false;
        });
      },
      changeCurrentPage(currentPage) {
        this.loading = true;
        this.currentPage = currentPage;
        this.loadData();
      },
      changePageSize(pageSize) {
        this.loading = true;
        this.pageSize = pageSize;
        this.loadData();
      },
    },
    mounted() {
      this.loadData();
    },
  };
</script>

<style>

</style>
