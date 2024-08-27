<template>
  <section style="background-color: var(--dark_accent_color)">
    <div
      class="content-wrapper title-wrapper"
      style="flex-direction: column;text-align: center;"
    >
      <h1 style="font-size: 60px; padding-top: 0.4em">Multi-SWE-bench Analysis</h1>
      <div class="content-wrapper" style="margin-top: 2em">
        <router-link to="/">
          <button class="outline" style="flex-direction: row; display: flex; justify-content: center; align-items: center;">
            <img src="/logo.png" style="height: 1.3em; margin-right: 0.4em; margin-bottom: 0.3em;" />
            Home&nbsp;
          </button>
        </router-link>
        <a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2408.14354">
          <button class="outline">
            <i class="fa fa-paperclip"></i> Paper&nbsp;
          </button>
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/multi-swe-bench/multi-swe-bench-env">
          <button class="outline">
            <i class="fab fa-github"></i> Code&nbsp;
          </button>
        </a>
        <router-link to="/submit">
          <button class="outline">
            <i class="fa fa-upload"></i> Submit&nbsp;
          </button>
        </router-link>
      </div>
    </div>
  </section>
  <section class="main-container">
    <div class="content-wrapper" style="display: flex; justify-content: center; align-items: center;">
      <div style="background-color: black; padding: 1.5em 1em; color: white; border-radius: 1em; text-align: center; width: 80%;">
        Select the language&dataset&model below to get automated analyses of the model's performance on Multi-SWE-bench.
      </div>
    </div>
    <div class="mt-4 mb-6 flex flex-col gap-y-2">
      <div class="flex align-center justify-center gap-x-4">
        <span class="w-40 text-right">Language</span>
        <div>
          <select class="w-80" v-model="language">
            <template v-for="{ name, data } in leaderboard" :key="name">
              <option :disabled="!data?.length" :value="name">{{ name }}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="flex align-center justify-center gap-x-4">
        <span class="w-40 text-right">Dataset</span>
        <div>
          <select class="w-80" v-model="dataset">
            <template v-for="{ name, data } in languageData" :key="name">
              <option :disabled="!data?.length" :value="name">{{ name }}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="flex align-center justify-center gap-x-4">
        <span class="w-40 text-right">Model</span>
        <div>
          <select class="w-80" v-model="model">
            <template v-for="{ name } in datasetResults" :key="name">
              <option :value="name">{{ name }}</option>
            </template>
          </select>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div v-if="modelData">
        Viewing <span style="color:#0ca7ff">{{ model }}</span>'s performance
        on the Multi-SWE-bench <span style="color:#0ca7ff">{{ language }}</span> language and
        <span style="color:#0ca7ff">{{ dataset }}</span> split,
        which resolved <span style="color:#0ca7ff">{{ +(modelData.resolved * 100 / total).toFixed(2) }}</span>% of
        <span style="color:#0ca7ff">{{ total }}</span> issues.
        <template v-if="modelData.hasLogs">
          (<a target="_blank" rel="noopener noreferrer" :href="`https://github.com/multi-swe-bench/experiments/tree/main/evaluation/${modelData.path}/logs`">Logs</a>)
        </template>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content-box">
        <markdown :src="readme"></markdown>
      </div>
    </div>
    <div class="content-wrapper">
      <h3 style="flex: 0 0 15%;margin: 0;">% Resolved by Repository</h3>
      <table class="table-results">
        <thead>
          <tr>
            <th width="40%">Repository</th>
            <th>Resolved</th>
            <th>Total</th>
            <th>% Resolved</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repo in repos" :key="repo.name">
            <td>{{ repo.name }}</td>
            <td>{{ repo.resolved }}</td>
            <td>{{ repo.total }}</td>
            <td>{{ +(repo.resolved * 100 / repo.total).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br><br>
    <div class="content-wrapper">
      <h3 style="flex: 0 0 15%;margin: 0;">% Resolved by Year</h3>
      <table class="table-results">
        <thead>
          <tr>
            <th style="width: 40%">Year</th>
            <th>Resolved</th>
            <th>Total</th>
            <th>% Resolved</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="year in years" :key="year.name">
            <td>{{ year.name }}</td>
            <td>{{ year.resolved }}</td>
            <td>{{ year.total }}</td>
            <td>{{ +(year.resolved * 100 / year.total).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script lang="ts" setup>

import { computed, ref, watch } from 'vue'
import { useLeaderboard, Result } from './utils'
import markdown from 'marked-vue'

const { leaderboard, languageData, datasetResults, datasetData, modelData, language, dataset, model, total } = useLeaderboard()

interface GroupResult {
  name: string
  resolved: number
  total: number
}

const readme = ref('README.md not provided.')
const repos = ref<GroupResult[]>()
const years = ref<GroupResult[]>()

watch(modelData, (data) => {
  updateReadme(data)
  updateTable(data)
})

async function updateReadme(data: Result) {
  if (!data?.hasReadme) return readme.value = 'README.md not provided.'
  readme.value = 'Loading README.md...'
  const url = `https://raw.githubusercontent.com/multi-swe-bench/experiments/main/evaluation/${data.path}/README.md`
  const response = await fetch(url)
  if (response.ok) {
    readme.value = await response.text()
  } else {
    readme.value = 'README.md not provided.'
  }
}

async function updateTable(data: Result) {
  repos.value = null
  const url = `https://raw.githubusercontent.com/multi-swe-bench/experiments/main/evaluation/${data.path}/results/results.json`
  const response = await fetch(url)
  if (!response.ok) return
  const { resolved }: { resolved: string[] } = await response.json()
  const repoMap: Record<string, GroupResult> = {}
  const yearMap: Record<string, GroupResult> = {}
  for (const data of Object.values(datasetData.value)) {
    repoMap[data.repository] ||= { name: data.repository, resolved: 0, total: 0 }
    repoMap[data.repository].total++
    yearMap[data.time.slice(0, 4)] ||= { name: data.time.slice(0, 4), resolved: 0, total: 0 }
    yearMap[data.time.slice(0, 4)].total++
  }
  for (const id of resolved) {
    const data = datasetData.value[id]
    repoMap[data.repository].resolved++
    yearMap[data.time.slice(0, 4)].resolved++
  }
  repos.value = Object.values(repoMap)
  years.value = Object.values(yearMap)
}

</script>
