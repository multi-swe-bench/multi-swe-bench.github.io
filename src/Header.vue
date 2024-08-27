<template>
  <section style="background-color: var(--dark_accent_color)">
    <div
      class="content-wrapper title-wrapper"
      style="flex-direction: column"
    >
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-bottom: 15px;
        "
      >
        <h1 style="font-size: 60px; padding-top: 0.4em">Multi-SWE-bench</h1>
        <img
          src="/logo.png"
          style="height: 100px; padding-top: 0em; padding-left: 0.5em"
        />
      </div>
      <h3>A Multi-Lingual GitHub Issue Resolving Benchmark</h3>
      <h3 style="font-size: 20px; padding-top: 1.2em">ArXiv 2024</h3>
      <p style="text-align: center;margin-top:1em;">
        Daoguang Zan*, Zhirong Huang*, Ailun Yu*, <br />
        Shaoxin Lin, Yifan Shi, Wei Liu, Dong Chen, Zongshuai Qi, <br />
        Hao Yu, Lei Yu, Dezhi Ran, Muhan Zeng, Bo Shen, Pan Bian, <br />
        Guangtai Liang, Bei Guan, Pengjie Huang, Tao Xie, Yongji Wang, Qianxiang Wang
      </p>
      <div class="content-wrapper" style="margin-top: 2em">
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
        <router-link to="/viewer">
          <button class="outline">
            <i class="fa fa-chart-simple"></i> Analysis&nbsp;
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>
