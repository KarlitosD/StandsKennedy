<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

const route = useRoute()
const idCookie = useCookie("id")
const { data: stand, error, refresh } = await useFetch(`/api/stands/${route.params.stand}`)

console.log(stand?.value)

if(stand?.value?.error)  
    await navigateTo("/not-found")

// console.log(!!error)

const isVoted = computed(() => stand?.value?.find(stand => stand.voted == idCookie?.value))
let qrcode = ref(null)
const loading = ref(false)

onMounted(() => {
    qrcode.value = useQRCode(document.URL, {
        margin: 1,
        errorCorrectionLevel: "H"
    })
})

const handleShare = async () => {
    try {
        await navigator.share({
            title: `Vota por ${stand.value.name}`,
            text: "Vota por tu stand favorito",
            url: document.URL
        })
    } catch (error) {
        alert(error)
    }
}

const handleVote = async () => {
    if(loading.value) return
    try {
        loading.value = true
        await $fetch(`/api/stands/${route.params.stand}`, { method: "POST" })
        await refresh()
    } catch { 
        alert("Algo salio mal :(")
    }
    loading.value = false
}

</script>

<template>
    <main class="h-5/6 flex flex-col justify-center items-center gap-4 w-fit mx-auto">
            <h3 class="text-xl font-semibold">{{ stand.NAME }}</h3>
            <div class="rounded-lg overflow-hidden bg-base-300 w-[220px] h-[220px] grid place-content-center">
                <img v-if="qrcode" :src="qrcode.value" alt="Codigo QR del stand" width="220" />
                <div v-else class="w-10 h-10 text-transparent animate-spin border-r-2 border-r-white rounded-full">O
                </div>
            </div>
            <button class="btn w-full" :class="[loading ? 'btn-primary-content loading' : 'btn-primary']" v-if="!isVoted" @click="handleVote">Votar</button>
            <button class="btn btn-primary border border-primary w-full" v-else :disabled="isVoted">Ya votaste</button>
            <!-- <button class="btn" @click="handleShare">Compatir</button> -->
        </main>
</template>