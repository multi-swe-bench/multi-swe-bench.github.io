<template>
  <div class="content-wrapper">
    <div class="content-box">
      <h2 class="text-title">About</h2>
      <p class="text-content">
        Multi-SWE-Bench is a benchmark for evaluating the issue-resolving capabilities of LLMs across multiple programming languages.
        The dataset consists of 1,632 issue-resolving tasks spanning 7 programming languages: Java, TypeScript, JavaScript, Go, Rust, C, and C++.
        Evaluation is performed by verifying the project's built-in test suite results, using post-PR behavior as the reference solution.
        Read more about Multi-SWE-bench in our <a href="https://arxiv.org/abs/xxx" target="_blank">paper</a>!
      </p>
      <h3 class="text-title">Citation</h3>
      If you found our <a href="https://multi-swe-bench.github.io">Multi-SWE-bench</a> helpful for your work, please cite as follows:
      <p class="text-content">
<pre id="citation">
<code>@misc{zan2025multiswebench,
      title={Multi-SWE-bench: A Multilingual Benchmark for Issue Resolving}, 
      author={Xxx},
      year={2025},
      eprint={2503.17315},
      archivePrefix={arXiv},
      primaryClass={cs.SE},
      url={xxx}, 
}</code></pre>
<pre id="citation">
<code>@inproceedings{
    jimenez2024swebench,
    title={{SWE}-bench: Can Language Models Resolve Real-world Github Issues?},
    author={Carlos E Jimenez and John Yang and Alexander Wettig and Shunyu Yao and Kexin Pei and Ofir Press and Karthik R Narasimhan},
    booktitle={The Twelfth International Conference on Learning Representations},
    year={2024},
    url={https://openreview.net/forum?id=VTF8yNQM66}
}</code></pre>
    <br/>
        <b>Disclaimer:</b> Multi-SWE-bench is for research purposes only. Models
        evaluated on Multi-SWE-bench may produce unexpected results.
        We are not responsible for any damages caused by the use of
        Multi-SWE-bench, including but not limited to, any loss of profit, data,
        or use of data.
        <br/><br/>
        <b>Acknowledgements:</b> This leaderboard is a modified version based on the <a href="https://swebench.com">SWE-bench leaderboard</a>,
        and we are using this template with the explicit permission of the SWE-bench team. 
        We express our deepest gratitude to the creators of the SWE-bench dataset.
      </p>
      <p class="text-content">
        Correspondence to: <a href="mailto:zandaoguang@bytedance.com">zandaoguang@bytedance.com</a> and <a href="mailto:shen.kai@bytedance.com">shen.kai@bytedance.com</a>
        <br/>
        If you're interested, feel free to join our discussions on <a href="https://discord.gg/EtfbkfqUuN">Discord</a>.
      </p>
      <div class="content-wrapper" style="display: flex; flex-direction: row;">
        <a href="https://team.doubao.com/" title="Bytedance Seed">
          <img src="../img/seed.jpg" style="height: 3em;padding-top:0.5em;padding-right: 1em" />
        </a>
      </div>
    </div>
  </div>
</template>
