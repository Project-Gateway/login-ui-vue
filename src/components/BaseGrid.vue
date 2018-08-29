<template>
  <div>
    <dx-grid
            v-if="!loading"
            v-bind:rows="rows"
            v-bind:columns="columns"
    >

      <dx-sorting-state
              v-bind:sorting.sync="sorting"
      ></dx-sorting-state>
      <dx-paging-state
              v-bind:currentPage.sync="currentPage"
              v-bind:pageSize.sync="pageSize"
      ></dx-paging-state>
      <dx-search-state
              v-bind:value.sync="searchValue"
      ></dx-search-state>
      <dx-filtering-state
              v-bind:filters.sync="filters"
      ></dx-filtering-state>

      <dx-integrated-sorting />
      <dx-integrated-paging/>
      <dx-integrated-filtering />

      <dx-table/>
      <dx-table-header-row showSortingControls></dx-table-header-row>
      <dx-table-filter-row />
      <dx-paging-panel
              v-bind:pageSizes.sync="pageSizes"
      ></dx-paging-panel>
      <dx-toolbar />
      <dx-search-panel />
    </dx-grid>
    <h3 v-else>Loading...</h3>
  </div>
</template>

<script>
  import {
    DxPagingState,
    DxSortingState,
    DxFilteringState,
    DxIntegratedSorting,
    DxIntegratedPaging,
    DxIntegratedFiltering,
    DxSearchState,
  } from '@devexpress/dx-vue-grid';
  import {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableFilterRow,
    DxPagingPanel,
    DxSearchPanel,
    DxToolbar
  } from '@devexpress/dx-vue-grid-bootstrap4';
  import axios from 'axios';
  import loginApiConfig from '../config/login-api';

  export default {
    components: {
      DxSortingState,
      DxPagingState,
      DxFilteringState,
      DxIntegratedPaging,
      DxIntegratedSorting,
      DxIntegratedFiltering,
      DxGrid,
      DxTable,
      DxTableHeaderRow,
      DxTableFilterRow,
      DxPagingPanel,
      DxSearchState,
      DxSearchPanel,
      DxToolbar
    },
    name: 'base-grid',
    data() {
      return {
        columns: this.columnsConfig,
        rows: [],
        sorting: [],
        filters: [],
        searchValue: '',
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
          method: this.apiMethod
        }).then(({data: payload}) => {
          this.rows = payload.map(this.rowsCallback);
          this.totalCount = payload.length;
          this.loading = false;
        });
      },
    },
    mounted() {
      this.loadData();
    },
  };
</script>

<style>

</style>
