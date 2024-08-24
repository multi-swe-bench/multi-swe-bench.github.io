import { ref, onMounted } from 'vue'

interface ListItem<T> {
  name: string
  data: T[]
}

interface Result {
  oss: boolean
  verified: boolean
  name: string
  resolved: number
  date: string
  logs: string
  trajs: string
  site: string
}

export function useLeaderboard() {
  const leaderboard = ref<ListItem<ListItem<Result>>[]>()

  onMounted(async () => {
    const response = await fetch('https://multi-swe-bench.github.io/experiments/leaderboard.json')
    leaderboard.value = await response.json()
  })

  return leaderboard
}
