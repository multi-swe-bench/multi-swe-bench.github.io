<template>
  <div class="content-wrapper">
    <div class="content-box">
      <h2 class="text-title">Resources</h2>
      <p class="text-content">
        You can download the SWE-bench task instances from HuggingFace or directly as a JSON
        file (<a href="https://drive.google.com/uc?export=download&id=1SbOxHiR0eXlq2azPSSOIDZz-Hva0ETpX">development</a>,
        <a href="https://drive.google.com/uc?export=download&id=164g55i3_B78F6EphCZGtgSrd2GneFyRM">test</a> sets).
        For your convenience, to fine tune your own model for evaluation on SWE-bench, we provide five pre-processed datasets at different retrieval settings ("Oracle", 13K, 27K, 40K, 50K "Llama"). We recommend using the 13K, 27K, or 40K datasets for evaluation. The 50K "Llama" dataset is provided for reproducing the results of the SWE-bench paper.
      </p>
      <div class="content-wrapper" style="width: 100%">
        <div class="content-box column">
          <a
            style="width: 100%"
            href="https://huggingface.co/datasets/princeton-nlp/SWE-bench"
          >
            <div class="download">🤗 SWE-bench</div>
          </a>
          <a
            style="width: 100%"
            href="https://huggingface.co/datasets/princeton-nlp/SWE-bench_oracle"
          >
            <div class="download">
              🤗 "Oracle" Retrieval
            </div>
          </a>
          <a
          style="width: 100%"
          href="https://huggingface.co/datasets/princeton-nlp/SWE-bench_bm25_50k_llama"
        >
          <div class="download">
            🤗 BM25 Retrieval 50K (Llama)
          </div>
        </a>
        </div>
        <div class="content-box column">
          <a
            style="width: 100%"
            href="https://huggingface.co/datasets/princeton-nlp/SWE-bench_bm25_13K"
          >
            <div class="download">
              🤗 BM25 Retrieval 13K
            </div>
          </a>
          <a
            style="width: 100%"
            href="https://huggingface.co/datasets/princeton-nlp/SWE-bench_bm25_27K"
          >
            <div class="download">
              🤗 BM25 Retrieval 27K
            </div>
          </a>
          <a
            style="width: 100%"
            href="https://huggingface.co/datasets/princeton-nlp/SWE-bench_bm25_40K"
          >
            <div class="download">
              🤗 BM25 Retrieval 40K
            </div>
          </a>
        </div>
      </div>
      <p class="text-content" style="margin-top:1em;">
        SWE-bench Lite is also available for download from HuggingFace.
      </p>
      <div class="content-wrapper" style="width: 100%">
        <div class="content-box column">
          <a
            style="width: 100%"
            href="https://huggingface.co/datasets/princeton-nlp/SWE-bench_Lite"
          >
            <div class="download">🤗 SWE-bench Lite</div>
          </a>
          <a
            style="width: 100%"
            href="https://huggingface.co/datasets/princeton-nlp/SWE-bench_Lite_oracle"
          >
            <div class="download">
              🤗 "Oracle" Retrieval Lite
            </div>
          </a>
        </div>
        <div class="content-box column">
          <a
            style="width: 100%"
            href="https://huggingface.co/datasets/princeton-nlp/SWE-bench_Lite_bm25_13K"
          >
            <div class="download">
              🤗 BM25 Retrieval 13K Lite
            </div>
          </a>
          <a
            style="width: 100%"
            href="https://huggingface.co/datasets/princeton-nlp/SWE-bench_Lite_bm25_27K"
          >
            <div class="download">
              🤗 BM25 Retrieval 27K Lite
            </div>
          </a>
        </div>
      </div>  
      <p class="text-content" style="margin-top:1em;">
        We also provide the full SWE-Llama model weights at 13b and 7b parameters, along with their PEFT LoRA weights.
      </p>
      <div class="content-wrapper" style="width: 100%">
        <div class="content-box column">
          <a
            style="width: 100%"
            href="https://huggingface.co/princeton-nlp/SWE-Llama-13b"
          >
            <div class="download">
              <img
                src="/logo.png"
                style="height:1.3em;vertical-align: middle;margin-bottom:0.35em;margin-right:0.2em"
              />
              SWE-Llama 13b
            </div>
          </a>
          <a
            style="width: 100%"
            href="https://huggingface.co/princeton-nlp/SWE-Llama-13b-peft"
          >
            <div class="download">
              <img
                src="/logo.png"
                style="height:1.3em;vertical-align: middle;margin-bottom:0.35em;margin-right:0.2em"
              />
              SWE-Llama 13b (PEFT)
            </div>
          </a>
        </div>
        <div class="content-box column">
          <a
            style="width: 100%"
            href="https://huggingface.co/princeton-nlp/SWE-Llama-7b"
          >
            <div class="download">
              <img
                src="/logo.png"
                style="height:1.3em;vertical-align: middle;margin-bottom:0.35em;margin-right:0.2em"
              />
              SWE-Llama 7b
            </div>
          </a>
          <a
            style="width: 100%"
            href="https://huggingface.co/princeton-nlp/SWE-Llama-7b-peft"
          >
            <div class="download">
              <img
                src="/logo.png"
                style="height:1.3em;vertical-align: middle;margin-bottom:0.35em;margin-right:0.2em"
              />
              SWE-Llama 7b (PEFT)
            </div>
          </a>
        </div>
        
      </div>
    </div>
  </div>
</template>
