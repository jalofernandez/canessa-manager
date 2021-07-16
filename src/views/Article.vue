<template>
  <section class="container">
    <article class="blog-post">
      <Title :txt="currentPost.title" />
      <h2>{{ currentPost.userId }}</h2>
      <p>{{ currentPost.body }}</p>
    </article>
  </section>
</template>

<script>
import Title from '@/components/Title.vue'

export default {
  name: 'Article',
  components: {
    Title
  },
  data() {
    return {
      currentPost: {}
    }
  },
  methods: {
    async getSinglePost() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
        const post = await res.json()
        this.currentPost = post
      } catch(e) {
        alert(e.message)
      }
    }
  },
  created() {
    this.getSinglePost()
  }
}
</script>

<style>

</style>
