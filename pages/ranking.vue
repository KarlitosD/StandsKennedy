<script setup>
const { data: stands } = await useFetch("/api/stands/ranking")
console.log(stands.value)
const standsSorted = computed(() => [...stands.value].sort((a, b) => b.votes - a.votes))

</script>

<template>
    <main class="container p-4">
        <h1 class="text-2xl font-bold mx-auto my-3">Ranking</h1>
        <table class="table table-zebra w-full mt-3">
            <thead>
                <tr>
                    <td>N°</td>
                    <td>Stand</td>
                    <td>Votos</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stand, index in standsSorted" :key="stand.standId">
                    <td>{{ index + 1 }}</td>
                    <td>{{ stand.NAME }}</td>
                    <td>{{ stand.votes }}</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>