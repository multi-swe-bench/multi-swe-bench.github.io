<template>
  <Header></Header>
  <section class="main-container">
    <div class="content-wrapper" style="display: flex; justify-content: center; align-items: center;">
      <div style="background-color: black; padding: 1.5em 1em; color: white; border-radius: 1em; text-align: center; width: 82%;">
        📣 [08/2024] We've released the JAVA version of <a rel="noopener noreferrer" target="_blank" style="color:var(--dark_accent_color)" href="https://www.swebench.com">SWE-bench</a>!
        Check it out on <a target="_blank" rel="noopener noreferrer" style="color:var(--dark_accent_color)" href="https://huggingface.co/datasets/Daoguang/multi-swe-bench">Hugging Face</a>.
        For more details, see our <a target="_blank" rel="noopener noreferrer" style="color:var(--dark_accent_color)" href="https://arxiv.org/abs/2408.14354">paper</a>.
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content-box" v-if="leaderboard">
        <h2 class="text-title">Leaderboard</h2>
        
        <!-- 改进的导航部分 -->
        <div class="leaderboard-navigation">
          <div class="selector-group">
            <label for="categorySelect">Category:</label>
            <select 
              id="categorySelect" 
              v-model="selectedCategory" 
              class="leaderboard-select">
              <option 
                v-for="{ name, data } in allLeaderboards" 
                :key="name" 
                :value="name" 
                :disabled="!data?.length">
                {{ name }}
              </option>
            </select>
          </div>
          
          <div class="selector-group">
            <label for="languageSelect">Language:</label>
            <select 
              id="languageSelect" 
              v-model="language" 
              class="leaderboard-select">
              <option 
                v-for="{ name, data } in leaderboard" 
                :key="name" 
                :value="name" 
                :disabled="!data?.length">
                {{ name }}
              </option>
            </select>
          </div>
          
          <div class="selector-group" v-if="languageData">
            <label for="datasetSelect">Dataset:</label>
            <select 
              id="datasetSelect" 
              v-model="dataset" 
              class="leaderboard-select">
              <option 
                v-for="{ name, results } in languageData" 
                :key="name" 
                :value="name" 
                :disabled="!results?.length">
                {{ name }}
              </option>
            </select>
          </div>
        </div>
        
        <!-- 简洁的数据指示器 -->
        <div class="data-indicator">
          <span class="indicator-item">{{ selectedCategory }}</span>
          <span class="indicator-separator">›</span>
          <span class="indicator-item">{{ language }}</span>
          <span class="indicator-separator">›</span>
          <span class="indicator-item">{{ dataset }}</span>
        </div>
        
        <div class="tabcontent tabcontentall block" v-if="datasetResults">
          <table class="scrollable">
            <thead>
              <tr>
                <th><div class="sticky-header-content">Model</div></th>
                <th><div class="sticky-header-content">% Resolved</div></th>
                <th><div class="sticky-header-content">Date</div></th>
                <th><div class="sticky-header-content">Logs</div></th>
                <th><div class="sticky-header-content">Trajs</div></th>
                <th><div class="sticky-header-content">Site</div></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) of datasetResults">
                <td>
                  <template v-if="index === 0">🥇 </template>
                  <template v-else-if="index === 1">🥈 </template>
                  <template v-else-if="index === 2">🥉 </template>
                  <template v-if="item.oss">🤠 </template>
                  <template v-if="item.verified">✅ </template>
                  {{ item.name }}
                </td>
                <td class="font-bold">
                  {{ +(item.resolved * 100 / total).toFixed(2) }}
                </td>
                <td>
                  <span class="label-date">{{ item.date }}</span>
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
          - The <span style="color:var(--dark_accent_color);"><b>% Resolved</b></span> metric refers to the percentage of Multi-SWE-bench instances
          that were <i>resolved</i> by the model.
          <br>
          - <span style="color:var(--dark_accent_color);"><b>✅ Verified</b></span> indicates that we, the Multi-SWE-bench team, received access to the system and
          were able to reproduce the patch generations.
          <br>
          - <span style="color:var(--dark_accent_color);"><b>🤠 Open</b></span> refers to submissions that have open-source code. This does <i>not</i>
          necessarily mean the underlying model is open-source.
          <br>
          - If you would like to submit your model to the leaderboard, please check the <router-link to="/submit">submission</router-link> page.
          <br>
          - All submissions are Pass@1, do not use
          <code style="color:black;background-color:#ddd;border-radius: 0.25em">hints_text</code>,
          and are in the unassisted setting.
        </p>
      </div>
    </div>
    <About></About>
  </section>
</template>

<script lang="ts" setup>

import { useLeaderboard, useVisualLeaderboard, useAllLeaderboard } from './utils'
import About from './About.vue'
import Header from './Header.vue'
import Resources from './Resources.vue'

const { allLeaderboards, selectedCategory, leaderboard, languageData, datasetResults, language, dataset, total} = useAllLeaderboard()
const GITHUB_URL = 'https://github.com/multi-swe-bench/experiments/tree/main/evaluation'

</script>

<style lang="scss">
.leaderboard-navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.selector-group {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  
  label {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: #555;
  }
}

.leaderboard-select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:hover {
    border-color: var(--accent_color);
  }
  
  &:focus {
    outline: none;
    border-color: var(--accent_color);
    box-shadow: 0 0 0 2px rgba(var(--accent_color-rgb), 0.2);
  }
  
  option:disabled {
    color: #aaa;
  }
}

.data-indicator {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
  
  .indicator-item {
    font-weight: 600;
    
    &:last-child {
      color: var(--accent_color);
    }
  }
  
  .indicator-separator {
    margin: 0 0.5rem;
    color: #aaa;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .leaderboard-navigation {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .selector-group {
    width: 100%;
  }
}

table.scrollable {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: 600;
    text-align: left;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tr:hover {
    background-color: #f1f1f1;
  }
}

.text-center {
  text-align: center;
}

.font-bold {
  font-weight: bold;
}
</style>