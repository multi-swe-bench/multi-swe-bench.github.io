<template>
  <div class="content-wrapper">
    <div class="content-box">
      <h2 class="text-title">Citation</h2>
      <!-- <img src="../img/teaser.png" style="width:80%;margin:auto;display:block;"/> -->
      <p class="text-content">
        <!-- SWE-bench is a dataset that tests systems' ability to solve GitHub
        issues automatically. The dataset collects 2,294 Issue-Pull Request
        pairs from 12 popular Python repositories. Evaluation is performed by unit test verification using post-PR behavior as the reference solution.
        Read more about SWE-bench in our <a href="https://arxiv.org/abs/2310.06770" target="_blank">paper</a>!
        <br/><br/> -->
        <pre id="citation"><code>@misc{zan2024multiswebench,
  title={SWE-bench-java: A GitHub Issue Resolving Benchmark for Java}, 
  author={xxx},
  year={2024},
  eprint={2408.xxxxx},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2408.xxxxx}, 
}</code></pre>
        <br/>
        <b>Disclaimer:</b> Multi-SWE-bench is for research purposes only. Models
        trained and evaluated on Multi-SWE-bench can produce unexpected results.
        We are not responsible for any damages caused by the use of
        Multi-SWE-bench, including but not limited to, any loss of profit, data,
        or use of data. This leaderboard is a modified version based on 
        <a href="https://github.com/swe-bench/swe-bench.github.io">the SWE-bench leaderboard</a>,
        and we would like to extend our special thanks for that.
      </p>
      <p class="text-content">
        Correspondence to: <a href="mailto:daoguang@iscas.ac.cn">daoguang@iscas.ac.cn</a>
      </p>
      <div class="content-wrapper" style="display: flex; flex-direction: row;">
        <a href="http://www.is.cas.cn" title="中国科学院软件研究所">
          <img src="../img/iscas.png" style="height: 3em;padding-top:0.5em;padding-right: 1em" />
        </a>
        <a href="https://www.huawei.com" title="华为">
          <img src="../img/huawei.png" style="height: 3em;padding-top:0.5em;padding-right: 1em" />
        </a>
        <a href="https://www.pku.edu.cn" title="北京大学">
          <img src="../img/pku.png" style="height: 3em;padding-top:0.5em;padding-right: 1em" />
        </a>
        <a href="https://ailingzhi.com" title="灵智 AI">
          <img src="../img/lingzhi.png" style="height: 3em;padding-top:0.5em;padding-right: 1em" />
        </a>
      </div>
    </div>
  </div>
</template>