<script setup lang="ts">
import { toPng } from 'html-to-image';

const container = shallowRef<HTMLElement | null>(null)

const props = defineProps({
    name: String,
    id: String
})

const emit = defineEmits(["refresh"])

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
        if(err instanceof Error){
            console.log(err.message)
        }
    }
}

</script>

<template>
    <div class="w-fit scale-75">
        <div ref="container" class="flex flex-col w-fit justify-center text-center bg-transparent">
            <h1 class="text-4xl font-semibold text-stone-900 drop-shadow-sm bg-white">{{ props.name }}</h1>
            <img class="mx-auto" :src="`/api/qrcode?code=${props.id}&margin=1`" alt="Codigo QR del stand" width="350" />
        </div>
        <button class="btn btn-primary rounded-md w-full mt-3" @click="handleClick">Descargar</button>
        <button class="btn btn-warning rounded-md w-full mt-1" @click="deleteStand">Eliminar</button>
    </div>
</template>
