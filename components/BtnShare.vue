<script setup lang="ts">
const props = defineProps<{
    name: string
}>()

const handleShare = async () => {
    navigator.share({
        title: `Vota por ${props.name}`,
        text: "Vota por tu stand favorito",
        url: document.URL
    }).catch((err) => alert(err.message))
}
</script>

<template>
    <button class="btn" @click="handleShare">Compatir</button>
</template>
