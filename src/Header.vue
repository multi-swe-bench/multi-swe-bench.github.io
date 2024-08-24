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
          src="../img/swellama.png"
          style="height: 100px; padding-top: 0em; padding-left: 0.5em"
        />
      </div>
      <h3>A Multi-Lingual GitHub Issue Resolving Benchmark</h3>
      <h3 style="font-size: 20px; padding-top: 1.2em"><del>ICLR 2024</del></h3>
      <p style="text-align: center;margin-top:1em;"><del>
        Carlos E. Jimenez*, John Yang*, <br />
        Alexander Wettig, Shunyu Yao, Kexin Pei, <br />
        Ofir Press, Karthik Narasimhan
      </del></p>
      <div class="content-wrapper" style="margin-top: 2em">
        <a href="https://arxiv.org/abs/2310.06770">
          <button class="outline">
            <i class="fa fa-paperclip"></i> <del>Paper</del>&nbsp;
          </button>
        </a>
        <a href="https://github.com/princeton-nlp/SWE-bench">
          <button class="outline">
            <i class="fab fa-github"></i> <del>Code</del>&nbsp;
          </button>
        </a>
        <a href="submit.html">
          <button class="outline">
            <i class="fa fa-upload"></i> Submit&nbsp;
          </button>
        </a>
        <a href="viewer.html">
          <button class="outline">
            <i class="fa fa-chart-simple"></i> Analysis&nbsp;
          </button>
        </a>
      </div>
    </div>
  </section>
</template>
