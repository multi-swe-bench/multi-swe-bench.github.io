<template>
  <Header></Header>
  <section class="main-container">
    <div class="content-wrapper" style="display: flex; justify-content: center; align-items: center;">
      <div style="background-color: black; padding: 1.5em 1em; color: white; border-radius: 1em; text-align: center; width: 80%;">
        🔥 Evaluating on Multi-SWE-bench just became a lot more reliable!
        Multi-SWE-bench evaluation now uses <b>Docker</b> for easier, containerized, reproducible evaluation.
        [<a style="color:#0ca7ff" href="https://github.com/princeton-nlp/SWE-bench/tree/main/docs/20240627_docker">Report</a>]
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content-box" v-if="leaderboard">
        <h2 class="text-title">Leaderboard</h2>
        <ul class="tab">
          <li
            v-for="{ name, data } in leaderboard"
            :key="name"
            :class="{ active: name === language, disabled: !data?.length }"
            @click="language = name">
            <button>{{ name }}</button>
          </li>
        </ul>
        <ul class="tab" v-if="languageData">
          <li
            v-for="{ name, data } in languageData"
            :key="name"
            :class="{ active: name === dataset, disabled: !data?.length }"
            @click="dataset = name">
            <button>{{ name }}</button>
          </li>
        </ul>
        <div class="tabcontent tabcontentall" style="display: block" v-if="datasetData">
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
              <tr v-for="(item, index) of datasetData">
                <td>
                  <template v-if="index === 0">🥇 </template>
                  <template v-else-if="index === 1">🥈 </template>
                  <template v-else-if="index === 2">🥉 </template>
                  <template v-if="item.oss">🤠 </template>
                  <template v-if="item.verified">✅ </template>
                  {{ item.name }}
                </td>
                <td class="font-bold">
                  {{ item.resolved }}
                </td>
                <td>
                  <span class="label-date">{{ item.date }}</span>
                </td>
                <td class="text-center">
                  <template v-if="item.logs">
                    <a :href="item.logs">🔗</a>
                  </template>
                  <template v-else> - </template>
                </td>
                <td class="text-center">
                  <template v-if="item.trajs">
                    <a :href="item.trajs">🔗</a>
                  </template>
                  <template v-else> - </template>
                </td>
                <td class="text-center">
                  <template v-if="item.site">
                    <a :href="item.site">🔗</a>
                  </template>
                  <template v-else> - </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-content">
          - The <span style="color:#0ea7ff;"><b>% Resolved</b></span> metric refers to the percentage of SWE-bench instances (2294 total)
          that were <i>resolved</i> by the model.
          <br>
          - <span style="color:#0ea7ff;"><b>✅ Verified</b></span> indicates that we, the SWE-bench team, received access to the system and
          were able to reproduce the patch generations.
          <br>
          - <span style="color:#0ea7ff;"><b>🤠 Open</b></span> refers to submissions that have open-source code. This does <i>not</i>
          necessarily mean the underlying model is open-source.
          <br>
          - The leaderboard is updated once a week on <b>Monday</b>.
          <br>
          - If you would like to submit your model to the leaderboard, please check the <a href="submit.html">submission</a> page.
          <br>
          - All submissions are Pass@1, do not use
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

import { ref, onMounted, computed } from 'vue'
import About from './About.vue'
import Header from './Header.vue'
import Resources from './Resources.vue'

const language = ref('Java')
const dataset = ref('Full')

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

const leaderboard = ref<ListItem<ListItem<Result>>[]>()
const languageData = computed(() => leaderboard.value?.find(item => item.name === language.value).data)
const datasetData = computed(() => languageData.value?.find(item => item.name === dataset.value).data)

onMounted(async () => {
  const response = await fetch('https://multi-swe-bench.github.io/experiments/leaderboard.json')
  leaderboard.value = await response.json()
})

</script>

<style lang="scss">

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

</style>
