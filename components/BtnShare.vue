<script setup>
const props = defineProps({
    name: String
})

const handleShare = async () => {
    navigator.share({
        title: `Vota por ${props.name}`,
        text: "Vota por tu stand favorito",
        url: document.URL
    }).then(err => alert(err.message))
}
</script>

<template>
    <button class="btn" @click="handleShare">Compatir</button>
</template>
