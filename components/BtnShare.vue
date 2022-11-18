<script setup>
const handleShare = async () => {
    navigator.share({
        title: `Vota por ${stand.value.name}`,
        text: "Vota por tu stand favorito",
        url: document.URL
    }).then(err => alert(err.message))
}
</script>

<template>
    <button class="btn" @click="handleShare">Compatir</button>
</template>