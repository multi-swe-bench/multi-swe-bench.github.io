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

export function useVisualLeaderboard() {
  const visual_leaderboard = ref<Language[]>()

  const visual_language = ref<string>()
  const visual_dataset = ref<string>()
  const visual_model = ref<string>()

  const visual_languageData = computed(() => visual_leaderboard.value?.find(item => item.name === visual_language.value)?.data)
  const visual_datasetData = computed(() => visual_languageData.value?.find(item => item.name === visual_dataset.value)?.data)
  const visual_datasetResults = computed(() => visual_languageData.value?.find(item => item.name === visual_dataset.value)?.results)
  const visual_total = computed(() => Object.keys(visual_languageData.value?.find(item => item.name === visual_dataset.value)?.data || {}).length)
  const visual_modelData = computed(() => visual_datasetResults.value?.find(item => item.name === visual_model.value))

  watch(visual_leaderboard, (items) => {
    visual_language.value = items?.[0]?.name
  })

  watch(visual_languageData, (items) => {
    visual_dataset.value = items?.[0]?.name
  })

  watch(visual_datasetResults, (items) => {
    visual_model.value = items?.[0]?.name
  })

  onMounted(async () => {
    const response = await fetch('https://multi-swe-bench.github.io/experiments/Visual_leaderboard.json')
    visual_leaderboard.value = await response.json()
  })

  return { visual_leaderboard, visual_language, visual_dataset, visual_model, visual_languageData, visual_datasetData, visual_datasetResults, visual_modelData, visual_total }
}

export function useAllLeaderboard() {
  // 新增变量
  const allLeaderboards = ref<any[]>()
  const selectedCategory = ref<string>() // 用于存储外层分类 (如"text")
  const leaderboard = computed(() => 
    allLeaderboards.value?.find(item => item.name === selectedCategory.value)?.data
  )

  // 保持已有变量和计算属性
  const language = ref<string>()
  const dataset = ref<string>()
  const model = ref<string>()

  // 更新计算属性以支持新结构
  const languageData = computed(() => leaderboard.value?.find(item => item.name === language.value)?.data)
  const datasetData = computed(() => languageData.value?.find(item => item.name === dataset.value)?.data)
  const datasetResults = computed(() => languageData.value?.find(item => item.name === dataset.value)?.results)
  const total = computed(() => Object.keys(languageData.value?.find(item => item.name === dataset.value)?.data || {}).length)
  const modelData = computed(() => datasetResults.value?.find(item => item.name === model.value))

  // 监听外层类别变化，自动更新内部数据
  watch(allLeaderboards, (items) => {
    selectedCategory.value = items?.[0]?.name // 默认选择第一个分类
  })

  watch(leaderboard, (items) => {
    language.value = items?.[0]?.name // 默认选择第一个语言
  })

  watch(languageData, (items) => {
    dataset.value = items?.[0]?.name // 默认选择第一个数据集
  })

  watch(datasetResults, (items) => {
    model.value = items?.[0]?.name // 默认选择第一个模型
  })

  // 数据加载
  onMounted(async () => {
    const response = await fetch('https://multi-swe-bench.github.io/experiments/all_leaderboard.json')
    allLeaderboards.value = await response.json()
  })

  // 返回所有需要的变量和方法
  return { 
    allLeaderboards,
    selectedCategory, // 用于切换不同分类
    leaderboard, 
    language, 
    dataset, 
    model, 
    languageData, 
    datasetData, 
    datasetResults, 
    modelData, 
    total 
  }
}
