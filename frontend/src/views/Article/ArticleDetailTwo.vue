<template>
<div>
  <h1>게시판 3</h1>
    <div>
      <comment-list></comment-list>
      <div>
        <comment-form></comment-form>
      </div>
    </div>
  </div>
</template>

<script>
import CommentForm from '@/components/Comment/CommentForm.vue'
import CommentList from '@/components/Comment/CommentList.vue'
export default {
  components: {
    CommentForm,
    CommentList
  }
}
</script>

<style>

</style>