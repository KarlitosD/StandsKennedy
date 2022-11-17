<script setup>
import { StreamBarcodeReader } from "vue-barcode-reader";

const loading = ref(true)
const onLoaded = () => loading.value = false
const onDecode = text => {
    try {
        const { pathname } = new URL(text)
        navigateTo(pathname)
    } catch {
        alert("Codigo de barra no es una url valida")
    }
}

const closeModal = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            console.log(stram)
            stream.getTracks().forEach(track => track.stop())
        })
}

</script>

<template>
    <div class="modal" id="escanear">
        <div class="modal-box">
            <div class="rounded-lg overflow-hidden bg-base-300 w-full h-[350px] grid place-content-center">
                <div v-if="loading"
                    class="w-10 h-10 text-transparent animate-spin border-r-2 border-r-white rounded-full">O</div>
                <StreamBarcodeReader v-show="!loading" @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
            </div>
            <div class="modal-action">
                <a href="#" class="btn" @click="closeModal">Cerrar</a>
            </div>
        </div>
    </div>
</template>