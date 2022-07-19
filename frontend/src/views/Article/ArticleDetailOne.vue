<template>
  <div>
    <h1>게시글 1</h1>
    <div>
      <comment-list></comment-list>
      <div>
        <comment-form></comment-form>
      </div>
    </div>
  </div>
  <div>
    <router-link to="game">게임하러 가기</router-link>
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