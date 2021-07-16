<template>
  <div :class="$route.params.id" class="container">
    <Title txt="Blog"/>
    <h4>El blog tiene {{ arrBlog.length }} artículos</h4>
    <section class="grid-wrapper">
      <article v-for="post in arrBlog" :id="post.id" @click="getPost(post.id)" class="grid-card">
        <router-link :to="`/blog/${post.id}`">
          <h2>{{ post.title }}</h2>
          <p><small>{{ post.userId }}</small></p>
          <p>{{ post.body }}</p>
        </router-link>
      </article>
    </section>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'

export default {
  name: "Blog",
  components: {
    Title
  },
  data() {
    return {
      arrBlog: [],
    }
  },
  methods: {
    async consumeApi() {
      // this.postResolve = false // without "created()"
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const posts = await res.json()
        // console.log(data)
        this.arrBlog = posts
      } catch(e) {
        alert(e.message)
      }
    },
    getPost(postId) {
      const loadPost = this.arrBlog.filter(post => post.id === postId)
      console.log(loadPost)
      // do something (loads a modal dialog for example)
    }
  },
  // "created()" method is executed before HTML be rendered but after "scripts" loads:
  created() {
    this.consumeApi()
  },
}
</script>

<style>
a {
  text-decoration: none;
  color: #2c3e50;
}
a:hover,
a:focus {
  color: #1a2a3a;
}
a:hover h2,
a:focus h2 {
  text-decoration: underline;
}

h2 {
  font-size: 1.33em;
}
h4 {
  font-weight: 600;
}

.grid-wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 10px;
}
@media screen and (max-width: 600px){
  .grid-wrapper {
    grid-template-columns: 100%;
  }
}
.grid-card {
  box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px;
  border-radius: 5px;
  padding: 20px;
}
</style>
