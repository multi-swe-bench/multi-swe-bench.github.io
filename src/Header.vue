<template>
  <section style="background-image: linear-gradient(to right bottom, #0ea7ff, #00b5fa, #00c1e9, #00c9d0, #00cfb4);">
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
        <h1 style="font-size: 60px; margin: 0">Multi-SWE-bench</h1>
        <img
          src="/logo-v3.svg"
          style="height: 100px; padding-left: 0.5em"
        />
      </div>
      <h3>A Multi-Lingual and Multi-Modal GitHub Issue Resolving Benchmark</h3>
      <!--<h3 style="font-size: 20px; padding-top: 1.2em">ArXiv 2024</h3>-->
          <!-- <p style="text-align: center;margin-top:1em;">
        Daoguang Zan*, Zhirong Huang*, Ailun Yu*, <br />
        Shaoxin Lin, Yifan Shi, Wei Liu, Dong Chen, Zongshuai Qi, <br />
        Hao Yu, Lei Yu, Dezhi Ran, Muhan Zeng, Bo Shen, Pan Bian, <br />
        Guangtai Liang, Bei Guan, Pengjie Huang, Tao Xie, Yongji Wang, Qianxiang Wang
      </p>-->
      <div class="content-wrapper" style="margin-top: 2em">

    <!-- Paper-->
    <div class="dropdown-wrapper">
      <a href="https://arxiv.org/abs/2408.14354">
        <button class="outline">
          <i class="fa fa-paperclip"></i> Paper&nbsp;
        </button>
      </a>
      <div class="dropdown-content">
        <a href="https://arxiv.org/abs/2408.14354">
          <button class="outline" style="font-size: 12pt; height: 1.5em; width: 9em;outline: 3px solid #87CEFA;">
            <i class="fa fa-paperclip"></i> Textual-Java
          </button>
        </a>
        <a href="https://arxiv.org/abs/2412.17315">
          <button class="outline" style="font-size: 12pt; height: 1.5em; width: 9em;outline: 3px solid #87CEFA;">
            <i class="fa fa-paperclip"></i> Visual-Python
          </button>
        </a>
      </div>
    </div>

    <!-- Code -->
    <div class="dropdown-wrapper">
      <a href="https://github.com/multi-swe-bench/multi-swe-bench-env">
        <button class="outline">
          <i class="fab fa-github"></i> Code&nbsp;
        </button>
      </a>
      <div class="dropdown-content">
        <a href="https://github.com/multi-swe-bench/multi-swe-bench-env">
          <button class="outline" style="font-size: 12pt; height: 1.5em; width: 9em;outline: 3px solid #87CEFA;">
            <i class="fab fa-github"></i> Textual-Java
          </button>
        </a>
        <a href="https://github.com/luolin101/CodeV">
          <button class="outline" style="font-size: 12pt; height: 1.5em; width: 9em;outline: 3px solid #87CEFA;">
            <i class="fab fa-github"></i> Visual-Python
          </button>
        </a>
      </div>
    </div>
        
<!--       <a href="https://arxiv.org/abs/2408.14354">
          <button class="outline">
            <i class="fa fa-paperclip"></i> Paper&nbsp;
          </button>
        </a>
        <a href="https://github.com/multi-swe-bench/multi-swe-bench-env">
          <button class="outline">
            <i class="fab fa-github"></i> Code&nbsp;
          </button>
        </a>  -->
        <router-link to="/submit">
          <button class="outline">
            <i class="fa fa-upload"></i> Submit&nbsp;
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>
