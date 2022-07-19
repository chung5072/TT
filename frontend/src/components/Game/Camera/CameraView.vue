<template>
<div>
  <h1>여기에 Gm과 player의 카메라가 나온다</h1>
  <gm-camera></gm-camera>
  <player-camera></player-camera>
</div>

</template>

<script>
import GmCamera from '@/components/Game/Camera/GmView.vue'
import PlayerCamera from '@/components/Game/Camera/PlayerView.vue'

export default {
  components: {
    GmCamera,
    PlayerCamera
  }
}
</script>

<style>

</style>