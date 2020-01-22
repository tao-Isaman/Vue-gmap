<template>
  <GmapMap>
  <gmap-custom-marker :marker="marker">
    <img src="http://lorempixel.com/800/600/nature/" />
    <my-component></my-component>
  </gmap-custom-marker>
</GmapMap>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker';

export default {
   components: {
      'gmap-custom-marker': GmapCustomMarker
  },
  name: "map",
  data() {
    return {
      marker: {
        lat: 50.60229509638775,
        lng: 3.0247059387528408
      }
     
    };
  },
  methods: {
    
    
    /* eslint-disable no-console */
  },
  mounted() {
   
  }
};
</script>
<style scoped>
.font {
  font-family: 'Prompt', sans-serif;
  font-size: 30px ;
  color: black;
}
.font2 {
  font-family: 'Prompt', sans-serif;
  font-size: 20px ;
  color: black;
}
.font3 {
  font-family: 'Prompt', sans-serif;
  font-size: 40px ;
  color: black;
}

.vue-map-container {
  height: 700px;
  max-width: 2000px;
  width: 100%;
}
  .back2 {
  background-image: url(../assets/bg1.png);
  background-size: cover;
  height: 900px;
}
</style>
