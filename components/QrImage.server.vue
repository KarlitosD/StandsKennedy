<script setup lang="ts">
const route = useRoute()
const { stand } = route.params

const qrUrl = `/api/qrcode?code=${stand}&margin=1`
</script>

<template>
    <div class="rounded-lg overflow-hidden bg-base-300 w-[220px] h-[220px] grid place-content-center">
        <img :src="qrUrl" alt="Codigo QR del stand" width="220" />
    </div>
</template>