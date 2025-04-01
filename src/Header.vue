<template>
  <section class="gradient-background">
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
<!--        <h1 style="font-size: 60px; margin: 0; color: black">Multi-SWE-bench</h1>-->
<!--        <h1 style="font-size: 60px; margin: 0; color: black; border: 3px solid white; padding: 10px; border-radius: 10px; display: inline-block;">-->
<!--    Multi-SWE-bench-->
<!--        </h1>-->
        <h1 style="font-size: 60px; margin: 0; color: black;
    text-shadow: -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white;">
    Multi-SWE-bench
        </h1>
        <img
          src="/logo-v3.svg"
          style="height: 100px; padding-left: 0.5em"
        />
      </div>
      <h3 style="color: #333">
        A <span style="font-weight: bold;
            color: #000;">
            Multilingual
        </span> Benchmark for Issue Resolving
      </h3>
      <!--<h3 style="font-size: 20px; padding-top: 1.2em">ArXiv 2024</h3>-->
          <!-- <p style="text-align: center;margin-top:1em;">
        Daoguang Zan*, Zhirong Huang*, Ailun Yu*, <br />
        Shaoxin Lin, Yifan Shi, Wei Liu, Dong Chen, Zongshuai Qi, <br />
        Hao Yu, Lei Yu, Dezhi Ran, Muhan Zeng, Bo Shen, Pan Bian, <br />
        Guangtai Liang, Bei Guan, Pengjie Huang, Tao Xie, Yongji Wang, Qianxiang Wang
      </p>-->
      <div class="content-wrapper" style="margin-top: 2em">

    <!-- Paper-->
    <a href="https://arxiv.org/abs/xxxx.xxxxx">
      <button class="outline">
        <i class="fa fa-paperclip"></i> Paper&nbsp;
      </button>
    </a>

    <!-- Code -->
    <a href="https://github.com/multi-swe-bench/multi-swe-bench">
      <button class="outline">
        <i class="fab fa-github"></i> Code&nbsp;
      </button>
    </a>

     <!-- Data -->
    <a href="https://huggingface.co/datasets/bytedance-research/Multi-SWE-Bench">
      <button class="outline">
        <i class="fa fa-database"></i> Data&nbsp;
      </button>
    </a>
<!--       <a href="https://arxiv.org/abs/xxxx.xxxxx">
          <button class="outline">
            <i class="fa fa-paperclip"></i> Paper&nbsp;
          </button>
        </a>
        <a href="https://github.com/multi-swe-bench/multi-swe-bench">
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

<style lang="css">
.gradient-background {
  height: 400px;
  background: 
    radial-gradient(circle at 20% 30%, #b07219, transparent 40%),
    radial-gradient(circle at 80% 40%, #3178c6, transparent 40%),
    radial-gradient(circle at 20% 70%, #f1e05a, transparent 40%),
    radial-gradient(circle at 70% 90%, #00ADD8, transparent 40%),
    radial-gradient(circle at 50% 50%, #f34b7d, transparent 40%);
  background-blend-mode: screen;
  display: flex;
  align-items: center;
}

</style>

<script setup lang="ts">
</script>