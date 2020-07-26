<template>
    <div>
        <div class="row home-top-search align-items-end pb-2">
            <div class="col-12 col-xl-7">
                <div class="form-group form-search mb-1">
                    <input type="text" v-model="search" @input="currentPage=1;searchData()" placeholder="Buscar" class="form-control">
                </div>
            </div>
            <div class="col-12 col-xl-5 text-right">
                <div class="form-group mb-0" :class="isPC ? 'minwidth-12 d-inline-block' : ''">
                    <div class="row align-items-center">
                        <label for="sorted-by" class="pl-0 m-0 col-7 pr-1 text-right">Ordenar por</label>
                        <div class="col-5 select-top-search">
                            <select id="sorted-by" v-model="sortBy" @input="currentPage=1;searchData()" class="form-control bold d-inline-flex pointer">
                                <option :value="columns.findIndex(c => c.data===column.data)" v-for="column in sortableColumns" :key="'option-'+column.data">{{column.title}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-table table-search">
            <div class="loading d-flex justify-content-center align-items-center" v-if="loading || (!loading && !loaded)">
                <div class="text-center color-dark-gray"><i class="fa fa-spinner fa-spin"></i> Cargando...</div>
            </div>
            <div class="table-responsive mb-0">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col" v-for="column in showColumnsData" :key="'th-'+column.data" :class="column.data!=='actions' ? '' : ('text-center width-'+(actions.length*3+2))">
                                <div>
                                    {{column.title}}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="content-data-table">
                        <tr v-if="!loading && results.length==0 && loaded">
                            <td :colspan="colspan">
                                <div class="text-center color-gray no-data">
                                  <div><i class="fa fa-exclamation-circle"></i><br>No hay resultados encontrados</div>
                                </div>
                            </td>
                        </tr>
                        <tr :id="'tr-'+result.id" v-for="(result,index) in results" :key="getPrimaryKeyValue(result,index)">
                            <td v-for="column in showColumnsData" :key="'td-'+column.data">
                                <div v-if="column.data!=='actions'" :class="{'no-search':!column.searchable}">
                                   <slot :name="column.data" v-bind:content="getColumnData(result,column.data)" v-bind:data="result">
                                       {{getColumnData(result,column.data)}}
                                    </slot>
                                </div>
                                <datatable-actions @delete="deleteResult" @edit="editResult" @show="showResult" :result="result" :id="getPrimaryKeyValue(result,index)" v-if="column.data==='actions'" class="text-center" :class="'width-'+(actions.length*3+2)"/>
                            </td>
                        </tr>
                    </tbody>
                </table>          
            </div>
            <div class="text-center pt-2" v-show="rows>perPage">
                <b-pagination
                    v-model="currentPage"
                    align="right"
                    :total-rows="rows"
                    :per-page="perPage"
                    first-number
                    last-number
                >
                    <template v-slot:prev-text><i class="fa fa-chevron-left"></i> Anterior</template>
                    <template v-slot:next-text>Siguiente <i class="fa fa-chevron-right"></i></template>
                </b-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import API from './../../config/api'
    import DatatableActions from './DatatableActions'
    import debounce from 'debounce';
    import axios from 'axios';
    import qs from 'qs';
    import {generateColumns,generateSort,getDataOfColumn} from './datatables';

    export default {
        props:{
            actions:{
                type: Array,
                default: function()
                {
                    return ['show','delete','edit']
                }
            },
            primaryKey: {
                type: String,
                default: function()
                {
                    return 'id'
                }
            },
            columns: Array,
            type: String,
            url: String,
            urlToDelete: String,
            urlToDisable: String,
            urlToUpdate: String,
        },
        components:{
            DatatableActions,
        },
        data() {
            return {
                loaded:false,
                search: '',
                sortBy: '',
                params:null,
                loading: false,
                currentPage: 1,
                perPage: 12,
                results: [],
                rows: 0,
                draw:0,
                showDataAs: 'table',
            }
        },
        computed:{
            resultModal()
            {
                let result = this.results.find(r => r[this.primaryKey]===(this.idToDisable || this.idToDelete));
                if(result)
                {
                    return result
                }
                return null;
            },
            colspan(){
                return this.showColumnsData.length;
            },
            columnsData()
            {
                return generateColumns(this.columns);
            },
            showColumnsData()
            {
                return this.columnsData.filter(c => !c.hidden)
            },
            sortableColumns()
            {
                return this.showColumnsData.filter(c => c.orderable)
            },
            isPC()
            {
                return this.$mq=='lg' || this.$mq=='xl'
            },
        },
        methods:{
            deleteResult(event)
            {
                this.$emit('delete',event)
            },
            editResult(event)
            {
                this.$emit('edit',event);
            },
            showResult(event)
            {
                this.$emit('show',event);
            },
            getPrimaryKeyValue(result,index)
            {
                return this.primaryKey in result ? result[this.primaryKey] : index;
            },
            filteredColumnsRow(result)
            {
                return this.showColumnsData.filter(c => {
                    return (this.getColumnData(result,c.data) || c.data=='actions')
                });
            },
            getColumnData(result,column)
            {
                return getDataOfColumn(result,column)
            },
            searchData: debounce(function(params={}) {
                let serializerParams = {
                    draw: this.draw++,
                    columns: this.columnsData,
                    order: generateSort(this.sortBy),
                    start: (this.currentPage-1)*this.perPage,
                    length: this.perPage,
                    search: {
                        value:this.search,
                        regex:false,
                    },
                    params: this.params,
                };
                this.loading = true;
                API.get('/'+this.url, {
                    params: serializerParams,
                    paramsSerializer: params => {
                        return qs.stringify(params)
                    }
                })
                .then(response => {
                    if('data' in response.data)
                    {
                        this.rows = response.data.recordsFiltered;
                        this.results = response.data.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(response => {
                    this.loading = false;
                    this.loaded = true;
                })
            }, 500),
        },
        mounted() {
            if (!this.sortBy) {
                this.sortBy = 0;
            }
            this.searchData()
        },
        watch: {
            searchParams() {
                if (this.search.length > 0) {
                    this.searchData();
                }
            },
            currentPage(newVal)
            {
                this.searchData();
            }
        }
    }
</script>
<style lang="scss">
    @import './datatable.scss';
</style>