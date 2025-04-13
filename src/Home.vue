<template>
  <Header></Header>
  <section class="main-container">
    <div class="content-wrapper" style="margin-top: 1em; display: flex; justify-content: center; align-items: center;">
        <button
            @click="switchLeaderboard('Full')"
          class="outline teaser swebv"
          style="flex-direction: row; display: flex; justify-content: center; align-items: center; width: 15em;">
          <img
            src="../img/logo-v3.svg"
            style="height: 1.3em; margin-right: 0.4em; margin-bottom: 0.1em;" />
            Multi-SWE-bench&nbsp;
        </button>
        <button
            @click="switchLeaderboard('Lite')"
          class="outline teaser swebl"
          style="flex-direction: row; display: flex; justify-content: center; align-items: center; width: 15em;">
          <img
            src="../img/logo-v3.svg"
            style="height: 1.3em; margin-right: 0.4em; margin-bottom: 0.1em; background-color: var(--dark_accent_color);" />
            Multi-SWE-bench mini&nbsp;
        </button>
    </div>
    <div class="content-wrapper">
      <div class="content-box" v-if="leaderboard">
        <h2 class="text-title">{{LeaderboardName}}</h2>
        <ul class="tab" v-if="currentMode !== 'Lite'">
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
          <span v-if="currentMode === 'Full'">
          - <span style="color:var(--dark_accent_color);"><b>% Resolved</b></span> denotes the proportion of successfully solved instances per language (Python: <b>500</b>, Java: <b>128</b>, TypeScript: <b>224</b>, JavaScript: <b>356</b>, Go: <b>428</b>, Rust: <b>239</b>, C: <b>128</b>, C++: <b>129</b>).
        <b>Overall</b> includes all instances for each language, while <b>Easy</b>, <b>Medium</b>, and <b>Hard</b> correspond to subsets categorized by difficulty level.
          <br>
        </span>
    <span v-else>
      - <span style="color:var(--dark_accent_color);"><b>% Resolved</b></span> denotes the proportion of successfully solved instances per language (Python: <b>50</b>, Java: <b>50</b>, TypeScript: <b>50</b>, JavaScript: <b>50</b>, Go: <b>50</b>, Rust: <b>50</b>, C: <b>50</b>, C++: <b>50</b>).
      <b>Overall</b> includes all instances for each language, while <b>Easy</b>, <b>Medium</b>, and <b>Hard</b> correspond to subsets categorized by difficulty level.
      <br>
    </span>
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
const { allLeaderboards, selectedCategory, leaderboard, languageData, datasetResults, language, dataset, total, load} = useAllLeaderboard()
let GITHUB_URL = 'https://github.com/multi-swe-bench/experiments/tree/main/evaluation'
let LeaderboardName = 'Leaderboard'
// 模式：默认是 full
const currentMode = ref<'Full' | 'Lite'>('Full')

// 数据源映射
const urls = {
  Full: 'https://github.com/multi-swe-bench/experiments/tree/main/evaluation',
  Lite: 'https://github.com/multi-swe-bench/experiments/tree/main/evaluation/lite',
}
const leadnames = {
  Full: 'Leaderboard',
  Lite: 'Leaderboard-mini',
}
async function switchLeaderboard(mode: 'Full' | 'Lite') {
  if (mode === currentMode.value) return
  currentMode.value = mode
  load(mode)
  GITHUB_URL = urls[mode]
  LeaderboardName = leadnames[mode]
}
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

button {
  cursor: pointer;
  outline: none;

  &.outline {
    font-size: 16pt;
    height: 2em;
    width: 7em;
    position: relative;
    background: transparent;
    border: 0px;
    border-radius: 0.5em;
    padding: 0em 0em;
    margin: 0.2em 0.5em;
    transition: background-color 0.1s linear, color 0.1s linear;
    color: var(--accent_color);
    background-color: white;

    &.multimodal {
      color: var(--slate_gray);
    }

    &.teaser {
      border: 1px solid transparent; /* Specify border style */
      border-radius: 0.5em;
      transition: box-shadow 1s ease, border-color 1s ease;
      box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.3);
    }
  }

  &.outline:hover {
    color: wheat;
    border-color: wheat;
  }

  &.outline.teaser.swebm {
    background-color: var(--slate_gray);
    color: white;
  }

  &.outline.teaser.swebm:hover {
    color: var(--slate_gray);
    background: radial-gradient(circle at 10% 30%, rgba(255, 99, 71, 1), transparent 40%),
    radial-gradient(circle at 30% 70%, rgba(0, 255, 127, 1), transparent 40%),
    radial-gradient(circle at 50% 30%, rgba(70, 130, 180, 1), transparent 40%),
    radial-gradient(circle at 70% 70%, rgba(255, 165, 0, 1), transparent 40%),
    radial-gradient(circle at 80% 30%, rgba(138, 43, 226, 1), transparent 40%);
    transform: scale(1.05);
  }

  &.outline.teaser.swebv {
    background-color: #d1a22b;
    color: white;
  }

  &.outline.teaser.swebv:hover {
    background: linear-gradient(to right, rgb(209, 162, 43), rgb(209, 162, 43), rgb(209, 162, 43));
    transform: scale(1.05);
  }

  &.outline.teaser.swebl {
    background-color: var(--dark_accent_color);
    color: white;
  }

  &.outline.teaser.swebl:hover {
    transform: scale(1.05);
  }
}
</style>
