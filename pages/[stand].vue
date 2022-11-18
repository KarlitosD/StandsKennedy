<script setup>
const route = useRoute()
const idCookie = useCookie("id")

const { stand, loading, isVoted, handleVote } = await useStand(route.params.stand)

useHead({ title: () => `${stand.value.name} | Stand` })

</script>

<template>
    <main class="h-5/6 flex flex-col justify-center items-center gap-4 w-fit mx-auto">
        <h3 class="text-xl font-semibold">{{ stand.name }}</h3>
        <QrImage />
        <button v-if="!isVoted(idCookie)" class="btn w-full" :class="[loading ? 'btn-primary-content loading' : 'btn-primary']" 
            @click="handleVote">Votar</button>
        <button v-else class="btn btn-primary border border-primary w-full"  disabled>Ya votaste</button>
        <BtnShare @name="stand.name" />
    </main>
</template>
