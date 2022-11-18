<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

let qrcode = ref(null)
onMounted(() => {
    qrcode.value = useQRCode(document.URL, { margin: 1, errorCorrectionLevel: "H" })
})
</script>

<template>
    <div class="rounded-lg overflow-hidden bg-base-300 w-[220px] h-[220px] grid place-content-center">
        <img v-if="qrcode" :src="qrcode.value" alt="Codigo QR del stand" width="220" />
        <div v-else class="w-10 h-10 text-transparent animate-spin border-r-2 border-r-white rounded-full">O
        </div>
    </div>
</template>