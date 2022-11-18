export default async function useStand(standId) {
    const { data: stand, refresh } = await useFetch(`/api/stands/${standId}`)
    if (stand?.value?.error) await navigateTo("/not-found")

    const isVoted = userId => stand?.value?.votes.some(voteUserId => voteUserId == userId)

    const loading = ref(false)
    const handleVote = async () => {
        if (loading.value) return
        try {
            loading.value = true
            await $fetch(`/api/stands/${standId}`, { method: "POST" })
            await refresh()
        } catch {
            alert("Algo salio mal :(")
        }
        loading.value = false
    }

    return { stand, loading, isVoted, handleVote, refresh }
}