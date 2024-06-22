<template>
    <div>
      <Card
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        :description="item.description"
        :image="item.image"
        :valuepm2_5="item.valuepm2_5"
      />
    </div>
  </template>
  
  <script>
  //import Card from '~/components/Card2.vue'
  
  export default {
    components: {
      Card
    },
    data() {
      return {
        items: [
          { title: 'Card 1', description: 'This is the first card', image: 'https://via.placeholder.com/150', valuepm2_5: 30 },
          { title: 'Card 2', description: 'This is the second card', image: 'https://via.placeholder.com/150', valuepm2_5: 40 },
          { title: 'Card 3', description: 'This is the third card', image: 'https://via.placeholder.com/150', valuepm2_5: 35 }
        ]
      }
    }
  }
  </script>