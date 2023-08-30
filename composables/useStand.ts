export type StandWithVotes = { id: string, name: string, votes: string[] }

function sum(num: number | null){
    if(num == null) return 0
    return num
}

export default async function useStand(standId: string) {
    const { data, refresh, error } = await useFetch<StandWithVotes>(`/api/stands/${standId}`,)
    const stand = data as unknown as Ref<StandWithVotes>

    const isVoted = (userId: string | null | undefined) => {
        if(!userId) return false
        return stand?.value?.votes.some(voteUserId => voteUserId == userId)
    }


    const loading = shallowRef(false)
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

    return { stand, loading, isVoted, handleVote, refresh, error }
}