<template>
  <div class="datatable-actions">
      <a @click="$emit('delete',id)" class="btn"><fa-icon icon="trash"/></a>
      <a @click="$emit('edit',id)" class="btn ml-1"><fa-icon icon="edit"/></a>
      <a @click="$emit('show',id)" class="btn ml-1"><fa-icon icon="list-alt"/></a>
  </div>
</template>
<script>
export default {
  props:{
    url: {
      type: String,
      default: function()
      {
        return window.location.origin+window.location.pathname
      }
    },
    id: [String,Number],
    result: Object
  },
}
</script>