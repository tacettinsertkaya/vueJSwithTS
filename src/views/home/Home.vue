<template>
  <div>
    Hello World
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop,
  PropSync,
  Provide,
  Model,
  Inject,
  Emit
} from 'vue-property-decorator'
@Component
export default class Home extends Vue {
  mounted() {}
}
</script>
<style>
.snake_game_container {
  text-align: center;
  font-family: helvetica;
}
canvas {
  border: 2px solid rgb(151, 149, 149);
}
</style>
