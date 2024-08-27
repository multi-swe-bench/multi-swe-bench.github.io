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
        <a href="https://arxiv.org/abs/2408.14354">
          <button class="outline">
            <i class="fa fa-paperclip"></i> Paper&nbsp;
          </button>
        </a>
        <a href="https://github.com/multi-swe-bench/multi-swe-bench-env">
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
            <template v-for="{ name } in datasetData" :key="name">
              <option :value="name">{{ name }}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="text-center mt-2">
        <button id="loadData">Load Data</button>
      </div>
    </div>
    <div class="content-wrapper">
      <div v-if="modelData">
        Viewing <span style="color:#0ca7ff">{{ model }}</span>'s performance
        on the Multi-SWE-bench <span style="color:#0ca7ff">{{ language }}</span> language and
        <span style="color:#0ca7ff">{{ dataset }}</span> split,
        which resolved <span style="color:#0ca7ff" id="selectedResolved">{{ +modelData.resolved.toFixed(2) }}</span>% of
        <span style="color:#0ca7ff" id="selectedSplitNum"></span> issues.
        (<a :href="`https://github.com/multi-swe-bench/experiments/tree/main/evaluation/${language}/${dataset}/${model}`">Logs</a>)
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content-box" id="readme">
        <markdown :src="readme"></markdown>
      </div>
    </div>
    <div class="content-wrapper">
      <h3 style="flex: 0 0 15%;margin: 0;">% Resolved by Repository</h3>
      <table id="table-by-repo" class="table-results">
        <thead>
          <tr>
            <th width="40%">Repository</th>
            <th>Resolved</th>
            <th>Total</th>
            <th>% Resolved</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <br><br>
    <div class="content-wrapper">
      <h3 style="flex: 0 0 15%;margin: 0;">% Resolved by Year</h3>
      <table id="table-by-year" class="table-results">
        <thead>
          <tr>
            <th style="width: 40%">Year</th>
            <th>Resolved</th>
            <th>Total</th>
            <th>% Resolved</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </section>
</template>

<script lang="ts" setup>

import { computed, ref, watch } from 'vue'
import { useLeaderboard } from './utils'
import markdown from 'marked-vue'

const { leaderboard, languageData, datasetData, modelData, language, dataset, model } = useLeaderboard()

const readme = ref('README.md not provided.')

watch(modelData, async (data) => {
  if (!data) return readme.value = 'README.md not provided.'
  readme.value = 'Loading README.md...'
  const url = `https://raw.githubusercontent.com/multi-swe-bench/experiments/main/evaluation/${language.value}/${dataset.value}/${model.value}/README.md`
  const response = await fetch(url)
  if (response.ok) {
    readme.value = await response.text()
  } else {
    readme.value = 'README.md not provided.'
  }
})

// document.getElementById('loadData').addEventListener('click', () => {
//     document.getElementById('selectedModel').textContent = modelValue;
//     document.getElementById('selectedSplitNum').textContent = splitValue == 'lite' ? 300 : 2294;
//     document.getElementById('modelSplitURL').href = `https://github.com/multi-swe-bench/experiments/tree/main/evaluation/${splitValue}/${modelValue}`;

//     updateMainResults(language.value, dataset.value, model.value);
//     updateReadme(language.value, dataset.value, model.value);
//     updateTableByRepo(language.value, dataset.value, model.value);
//     updateTableByYear(language.value, dataset.value, model.value);
// });

</script>
