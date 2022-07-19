<template>
<div>
  <h1>정보 교환하는데</h1>
  <article-list></article-list>
  <router-link to="/createarticle">글쓰기</router-link>
</div>
  
</template>

<script>
import ArticleList from '@/components/Article/ArticleList.vue'

export default {
  components: {
    ArticleList
  }
}
</script>

<style>

</style>