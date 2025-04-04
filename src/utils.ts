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
  const allModelResults = ref([]);
  const selectedCategory = ref<string>() // 用于存储外层分类 (如"text")
  
  // 直接返回顶层数组作为leaderboard，这样导航栏会显示不同的语言选项
  const leaderboard = computed(() => {
    // 直接返回顶层数组，这样会显示Java, TypeScript等语言选项
    console.log('Returning leaderboard:', allLeaderboards.value)
    return allLeaderboards.value || []
  })

  // 保持已有变量和计算属性
  const language = ref<string>()
  const dataset = ref<string>()
  const model = ref<string>()

  // 更新计算属性以支持新结构
  const languageData = computed(() => {
    // 确保 leaderboard.value 是一个数组
    if (!leaderboard.value || !Array.isArray(leaderboard.value)) {
      console.log('leaderboard.value is not an array:', leaderboard.value)
      return []
    }
    // 找到选中的语言对象
    const selectedLanguage = leaderboard.value.find(item => item.name === language.value)
    console.log('Selected language:', selectedLanguage)
    return selectedLanguage?.data || []
  })
  console.log('Leaderboard value:', leaderboard.value)
  console.log('Language data:', languageData.value)
  
  const datasetData = computed(() => {
    // 确保 languageData.value 是一个数组
    if (!languageData.value || !Array.isArray(languageData.value)) {
      console.log('languageData.value is not an array:', languageData.value)
      return {}
    }
    // 找到选中的数据集对象
    const selectedDataset = languageData.value.find(item => item.name === dataset.value)
    console.log('Selected dataset:', selectedDataset)
    return selectedDataset?.data || {}
  })
  
  const datasetResults = computed(() => {
    // 确保 languageData.value 是一个数组
    if (!languageData.value || !Array.isArray(languageData.value)) {
      console.log('languageData.value is not an array for results:', languageData.value)
      return []
    }
    // 找到选中的数据集对象的结果
    const selectedDataset = languageData.value.find(item => item.name === dataset.value)
    console.log('Selected dataset results:', selectedDataset?.results)
    return selectedDataset?.results || []
  })
  
  const total = computed(() => {
    // 确保 languageData.value 是一个数组
    if (!languageData.value || !Array.isArray(languageData.value)) {
      return 0
    }
    const datasetObj = languageData.value.find(item => item.name === dataset.value)?.data
    return datasetObj ? Object.keys(datasetObj).length : 0
  })
  
  const modelData = computed(() => {
    // 确保 datasetResults.value 是一个数组
    if (!datasetResults.value || !Array.isArray(datasetResults.value)) {
      return null
    }
    // 找到选中的模型对象
    const selectedModel = datasetResults.value.find(item => item.name === model.value)
    console.log('Selected model:', selectedModel)
    return selectedModel
  })

  // 监听外层类别变化，自动更新内部数据
  watch(allLeaderboards, (items) => {
    // 现在我们直接使用allLeaderboards作为leaderboard
    // 不需要设置selectedCategory
    if (items && items.length > 0) {
      language.value = items[0].name // 默认选择第一个语言
      console.log('Setting default language to:', language.value)
    }
  })

  watch(leaderboard, (items) => {
    if (items && items.length > 0 && !language.value) {
      language.value = items[0].name // 默认选择第一个语言
      console.log('Setting language from leaderboard to:', language.value)
    }
  })

  watch(languageData, (items) => {
    if (items && items.length > 0) {
      dataset.value = items[0].name // 默认选择第一个数据集
      console.log('Setting dataset to:', dataset.value)
    }
  })

  watch(datasetResults, (items) => {
    if (items && items.length > 0) {
      model.value = items[0].name // 默认选择第一个模型
      console.log('Setting model to:', model.value)
    }
  })

  // 数据加载
  onMounted(async () => {
    const response = await fetch('https://raw.githubusercontent.com/multi-swe-bench/experiments/refs/heads/dist/leaderboard.json')
    allLeaderboards.value = await response.json()
     aggregateModelResults(allLeaderboards,allModelResults);
      allModelResults.value.sort((a, b) => b.resolved - a.resolved);
      const newLanguage = {
      name: 'All',
      data: [
        {
          results: allModelResults // 将模型统计结果插入
        }
      ]
    };
      if(allLeaderboards.value){
        allLeaderboards.value.unshift(newLanguage);
        console.log(allLeaderboards)
      }
    console.log(allLeaderboards.value)
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

function aggregateModelResults(allLeaderboards,allModelResults) {
  let num = 0
  let totalNum = 0
  let easyNum = 0
  let mediumNum = 0
  let highNum = 0
  console.log("this is continue")
  const modelMap = {};  // 存储模型的累计结果
  const modelNames = new Set();  // 存储所有模型名称
  const languageCount = allLeaderboards.value.length;  // 语言数量
  const allLeaderboardsValue = allLeaderboards.value
  // 遍历所有语言的结果
  allLeaderboardsValue.forEach(leaderboard => {
    leaderboard.data.forEach(languageData => {
      console.log(languageData.name)
      totalNum += languageData.data.all_ids.length
      easyNum += languageData.data.easy_ids.length
      mediumNum += languageData.data.medium_ids.length
      highNum += languageData.data.hard_ids.length
      languageData.results.forEach(result => {
        const { name, resolved, resolvedEasy, resolvedMedium, resolvedHard,site,orgIcon, date} = result;
        // let {name} = result
        // if (!name.startsWith('M')) {
        //   name = 'm' + name.toLowerCase()
        // }else{
        //   name = name.toLowerCase()
        // }

        // 初始化模型数据，如果是第一次看到这个模型
        if (!modelMap[name]) {
          modelMap[name] = {
            resolved: 0,
            resolvedEasy: 0,
            resolvedMedium: 0,
            resolvedHard: 0,
            resolvedEasyRate: 0,
            resolvedMediumRate: 0,
            resolvedHardRate: 0,
            count: 0, // 统计每个模型出现过的语言数
            site: site,
            orgIcon: orgIcon,
            date: date
          };
        }

        // 累加当前语言的模型分数
        modelMap[name].resolved += resolved;
        modelMap[name].resolvedEasy += resolvedEasy;
        modelMap[name].resolvedMedium += resolvedMedium;
        modelMap[name].resolvedHard += resolvedHard;
        modelMap[name].count += 1;
        modelMap[name].date = modelMap[name].date > date ? modelMap[name].date : date
        modelNames.add(name);
        num = num +1
      });
    });
  });
  allModelResults.value = Object.keys(modelMap)
    .filter(name => modelMap[name].count === languageCount) // 只保留在每个语言中都存在的模型
    .map(name => ({
      name,
      resolved: modelMap[name].resolved,
      resolvedEasy: modelMap[name].resolvedEasy,
      resolvedMedium: modelMap[name].resolvedMedium,
      resolvedHard: modelMap[name].resolvedHard,
      resolvedRate: modelMap[name].resolved / totalNum,
      resolvedEasyRate: modelMap[name].resolvedEasy / easyNum,
      resolvedMediumRate: modelMap[name].resolvedMedium / mediumNum,
      resolvedHardRate: modelMap[name].resolvedHard / highNum,
      site: modelMap[name].site,
      orgIcon: modelMap[name].orgIcon,
      date: modelMap[name].date,
    }));
}
