<script setup lang="ts">
const { stands } = defineProps<{ stands: { id:string, name: string }[] }>()
</script>

<template>
    <datalist id="stands-names">
        <option v-for="stand in stands" :value="stand.name" :key="stand.id" />
    </datalist>
</template>