<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { toPng } from 'html-to-image';

const container = ref(null)

const props = defineProps({
    name: String,
    id: String
})

const emit = defineEmits(["refresh"])

const qrcode = ref(null)
onMounted(() => {
    const { href } = new URL("/" + props.id, document.URL)
    qrcode.value = useQRCode(href, { margin: 1, errorCorrectionLevel: "H" })
})

const handleClick = () => {
    if(!container.value) return 
    toPng(container.value, { cacheBust: true, backgroundColor: "#fff" })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = `${props.name}.png`
            link.href = dataUrl
            link.click()
        })
        .catch((err) => {
            console.log(err)
        })
}

const deleteStand = async () => {
    try { 
        await $fetch("/api/stands/" + props.id, { method: "DELETE" })
        emit("refresh")
    } catch (err) {
        console.log(err.message)
    }
}

</script>

<template>
    <div class="w-fit scale-75">
        <div ref="container" class="flex flex-col w-fit justify-center text-center bg-transparent">
            <h1 class="text-4xl font-semibold text-stone-900 drop-shadow-sm bg-white">{{ props.name }}</h1>
            <img v-if="qrcode" :src="qrcode.value" alt="Codigo QR del stand" width="350" />
            <div v-else class="w-10 h-10 text-transparent animate-spin border-r-2 border-r-white rounded-full">O</div>
        </div>
        <button class="btn btn-primary rounded-md w-full mt-3" @click="handleClick">Descargar</button>
        <button class="btn btn-warning rounded-md w-full mt-1" @click="deleteStand">Eliminar</button>
    </div>
</template>