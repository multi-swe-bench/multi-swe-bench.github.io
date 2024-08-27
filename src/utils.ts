import { computed, ref, onMounted, watch } from 'vue'

interface ListItem<T> {
  name: string
  data: T[]
}

export interface Result {
  oss: boolean
  verified: boolean
  name: string
  resolved: number
  date: string
  logs: string
  trajs: string
  site: string
  path: string
  hasReadme: boolean
  hasLogs: boolean
  hasTrajs: boolean
}

interface Item {
  repository: string
  time: string
}

interface Dataset {
  name: string
  results: Result[]
  data: Record<string, Item>
}

interface Language {
  name: string
  data?: Dataset[]
}

export function useLeaderboard() {
  const leaderboard = ref<Language[]>()

  const language = ref<string>()
  const dataset = ref<string>()
  const model = ref<string>()

  const languageData = computed(() => leaderboard.value?.find(item => item.name === language.value)?.data)
  const datasetData = computed(() => languageData.value?.find(item => item.name === dataset.value)?.data)
  const datasetResults = computed(() => languageData.value?.find(item => item.name === dataset.value)?.results)
  const total = computed(() => Object.keys(languageData.value?.find(item => item.name === dataset.value)?.data || {}).length)
  const modelData = computed(() => datasetResults.value?.find(item => item.name === model.value))

  watch(leaderboard, (items) => {
    language.value = items?.[0]?.name
  })

  watch(languageData, (items) => {
    dataset.value = items?.[0]?.name
  })

  watch(datasetResults, (items) => {
    model.value = items?.[0]?.name
  })

  onMounted(async () => {
    const response = await fetch('https://multi-swe-bench.github.io/experiments/leaderboard.json')
    leaderboard.value = await response.json()
  })

  return { leaderboard, language, dataset, model, languageData, datasetData, datasetResults, modelData, total }
}
