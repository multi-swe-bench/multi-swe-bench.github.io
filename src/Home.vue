<template>
  <Header></Header>
  <section class="main-container">
    <div class="content-wrapper">
      <div class="content-box" v-if="leaderboard">
        <h2 class="text-title">Leaderboard</h2>
        <ul class="tab">
          <li
            v-for="{ name, data } in leaderboard"
            :key="name"
            :class="{ active: name === language }"
            @click="language = name">
            <button><template v-if="name !== 'Ranking'">{{ name }}</template>
  <template v-else>
    <span class="tooltip" title="All Languages">🏆</span>
  </template></button>
          </li>
        </ul>
        <div class="tabcontent tabcontentall block" v-if="sortedResults">
          <table class="scrollable">
            <thead>
              <tr>
                <th><div class="sticky-header-content">Model</div></th>
                <th>
                  <div>% Resolved</div>
                  <div class="resolution-subcategories">
                    <span class="sticky-header-content"
                          @click="sortColumn('overall')">
                      Overall
                      <span :class="getSortIconClass('overall')">▼</span>
                    </span>
                    <span
                      class="sticky-header-content"
                      @click="sortColumn('easy')">
                      Easy
                      <span :class="getSortIconClass('easy')">▼</span>
                    </span>
                    <span
                      class="sticky-header-content"
                      @click="sortColumn('medium')">
                      Medium
                      <span :class="getSortIconClass('medium')">▼</span>
                    </span>
                    <span
                      class="sticky-header-content"
                      @click="sortColumn('hard')">
                      Hard
                      <span :class="getSortIconClass('hard')">▼</span>
                    </span>
                  </div>
                </th>
                <th><div class="sticky-header-content">Org</div></th>
<!--                <th><div class="sticky-header-content">Date</div></th>-->
                <th><div class="sticky-header-content" @click="sortColumn('data')">Date<span :class="getSortIconClass('data')" style="margin-left: 2px;font-size: 14px;">▼</span></div></th>
                <th><div class="sticky-header-content">Logs</div></th>
                <th><div class="sticky-header-content">Trajs</div></th>
                <th><div class="sticky-header-content">Site</div></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) of sortedResults">
                <td>
                  <template v-if="index === 0">🥇 </template>
                  <template v-else-if="index === 1">🥈 </template>
                  <template v-else-if="index === 2">🥉 </template>
                  <template v-if="item.oss">🤠 </template>
                  <template v-if="item.verified">✅ </template>
                  {{ item.name }}
                </td>
                <td class="font-bold">
                  <div class="resolution-values">
                    <span>{{ (item.resolvedRate * 100).toFixed(2) }}</span>
                    <span style="font-weight: normal">{{ (item.resolvedEasyRate * 100).toFixed(2) || 0.00 }}</span>
                    <span style="font-weight: normal">{{ (item.resolvedMediumRate * 100).toFixed(2) || 0.00 }}</span>
                    <span style="font-weight: normal">{{ (item.resolvedHardRate * 100).toFixed(2) || 0.00 }}</span>
                  </div>
                </td>
                <td class="text-center">
                  <template v-if="item.orgIcon">
                    <img :src="item.orgIcon" style="height: 1.25em;">
                  </template>
                  <template v-else> - </template>
                </td>
                <td>
                  <template v-if="item.date">
                  <span class="label-date">{{ item.date }}</span>
                  </template>
                  <template v-else> - </template>
                </td>
                <td class="text-center">
                  <template v-if="item.hasLogs">
                    <a target="_blank" rel="noopener noreferrer" :href="`${GITHUB_URL}/${item.path}/logs`">🔗</a>
                  </template>
                  <template v-else> - </template>
                </td>
                <td class="text-center">
                  <template v-if="item.hasTrajs">
                    <a target="_blank" rel="noopener noreferrer" :href="`${GITHUB_URL}/${item.path}/trajs`">🔗</a>
                  </template>
                  <template v-else> - </template>
                </td>
                <td class="text-center">
                  <template v-if="item.site">
                    <a target="_blank" rel="noopener noreferrer" :href="item.site">🔗</a>
                  </template>
                  <template v-else> - </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-content">
          - <span style="color:var(--dark_accent_color);"><b>% Resolved</b></span> denotes the proportion of successfully solved instances per language (Python: <b>500</b>, Java: <b>128</b>, TypeScript: <b>224</b>, JavaScript: <b>356</b>, Go: <b>428</b>, Rust: <b>239</b>, C: <b>128</b>, C++: <b>129</b>).
          <b>Overall</b> includes all instances for each language, while <b>Easy</b>, <b>Medium</b>, and <b>Hard</b> correspond to subsets categorized by difficulty level.
          <br>
          - <span style="color:var(--dark_accent_color);"><b>✅ Checked</b></span> indicates that we, the Multi-SWE-bench team, received access to the system and
          were able to reproduce the patch generations.
          <br>
          - <span style="color:var(--dark_accent_color);"><b>🤠 Open</b></span> refers to submissions that have open-source code. This does <i>not</i> necessarily mean the underlying model is open-source.

          <br>
          <br>

          If you'd like to submit to the leaderboard, please check <router-link to="/submit">this page</router-link>.
          All submissions are Pass@1, do not use
          <code style="color:black;background-color:#ddd;border-radius: 0.25em">hints_text</code>,
          and are in the unassisted setting.
        </p>
      </div>
    </div>
    <!-- <Resources></Resources> -->
    <About></About>
  </section>
</template>

<script lang="ts" setup>

import { useLeaderboard,useVisualLeaderboard,useAllLeaderboard } from './utils'
import About from './About.vue'
import Header from './Header.vue'
import Resources from './Resources.vue'

// const { leaderboard, languageData, datasetResults, language, dataset, total } = useLeaderboard()
// const { visual_leaderboard, visual_languageData, visual_datasetResults, visual_language, visual_dataset, visual_total } = useVisualLeaderboard()
const { allLeaderboards, selectedCategory, leaderboard, languageData, datasetResults, language, dataset, total} = useAllLeaderboard()
const GITHUB_URL = 'https://github.com/multi-swe-bench/experiments/tree/main/evaluation'
console.log({ allLeaderboards, selectedCategory, leaderboard, languageData, datasetResults, language, dataset, total});
import { ref,computed, watch } from 'vue';

const sortOrder = ref({
  overall: 'desc',
  easy: 'desc',
  medium: 'desc',
  hard: 'desc',
  date: 'desc',
});

const getSortIconClass = (category: string) => {
  return {
    'sort-icon': true,  // 基础类，始终应用
    'asc': sortOrder.value[category] === 'asc',  // 升序时添加 asc
    'desc': sortOrder.value[category] === 'desc', // 降序时添加 desc
    'selected': selectedSortCategory.value === category
  };
};

const selectedSortCategory = ref('overall');

const sortedResults = computed(() => {
  if (!Array.isArray(datasetResults.value) || datasetResults.value.length === 0) {
    return [];
  }
  const keyMap = {
    overall: 'resolvedRate',
    easy: 'resolvedEasyRate',
    medium: 'resolvedMediumRate',
    hard: 'resolvedHardRate',
    date: 'date',
  };

  const sortKey = keyMap[selectedSortCategory.value];
  const order = sortOrder.value[selectedSortCategory.value];
  return [...datasetResults.value].sort((a, b) => {
    if (sortKey === 'date') {
      return order === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return order === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
  });
});

function sortColumn(category: string) {
    if (selectedSortCategory.value === category) {
    sortOrder.value[category] = sortOrder.value[category] === 'desc' ? 'asc' : 'desc';
  } else {
    selectedSortCategory.value = category;
  }
}


// 初始化一个空的结果集合
const allModelResults = ref([]);

// 遍历 allLeaderboards 计算每个模型的综合结果
function aggregateModelResults(allLeaderboards) {
  if (!Array.isArray(datasetResults.value) || datasetResults.value.length === 0) {
    return [];
  }
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
        const { resolved, resolvedEasy, resolvedMedium, resolvedHard,site,orgIcon, date} = result;
        let {name} = result
        if (!name.startsWith('M')) {
          name = 'm' + name.toLowerCase()
        }else{
          name = name.toLowerCase()
        }

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
 watch(allLeaderboards, () => {
   aggregateModelResults(allLeaderboards);
   allModelResults.value.sort((a, b) => b.resolved - a.resolved);
   const newLanguage = {
   name: 'Ranking',
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
 }, { immediate: true }); // { immediate: true } 会在一开始就执行一次计算
console.log(allModelResults)
</script>

<style lang="scss">
.resolution-subcategories {
  display: flex;
  justify-content: space-between;
  font-size: 0.85em;
  margin-top: 0.3em;
  color: #666;
  font-weight: normal;
}

.resolution-subcategories span {
  font-weight: bold;
  flex: 1;
  text-align: center;
  padding: 0 0.2em;
}

.resolution-values {
  display: flex;
  justify-content: space-between;
}

.resolution-values span {
  flex: 1;
  text-align: center;
  padding: 0 0.2em;
}

.tab-item {
  font-weight: bold;
  cursor: pointer;
  height: 16px;
  padding: 8px 12px;
  border-bottom: 2px solid var(--accent_color);
  transition: all 0.3s ease;

  &.active {
    background-color: var(--accent_color);
    color: white;
    cursor: default;
  }
}

ul.tab {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 2px solid var(--accent_color);
  border-bottom: 0;
  background-color: #f1f1f1;
}

ul.tab li {float: left;}
ul.tab li button {
  border: none;
  color: black;
  display: inline-block;
  font-size: 17px;
  padding: 0.5em 1em;
  text-align: center;
  text-decoration: none;
  transition: 0.3s;
}
ul.tab li:hover button {
  background-color: #ddd;
}
ul.tab li:focus button, ul.tab li.active button {
  background-color: #ccc;
}

ul.tab li.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.sort-icon {
  color: gray; /* 默认灰色 */
  margin-left: -2px;
  transition: transform 0.3s ease;  /* 过渡动画 */
  display: inline-block;
}

.sort-icon.asc {
  transform: rotate(180deg); /* 向上箭头 */
}

.sort-icon.desc {
  transform: rotate(0deg);  /* 向下箭头 */
}

.sort-icon.selected {
  color: #14c659; /* 选中的列变成绿色 */
  font-weight: bold;
}


</style>
