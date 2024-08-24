<template>
  <section style="background-color: var(--dark_accent_color)">
    <div
      class="content-wrapper title-wrapper"
      style="flex-direction: column;text-align: center;"
    >
      <h1 style="font-size: 60px; padding-top: 0.4em">SWE-bench Analysis</h1>
      <div class="content-wrapper" style="margin-top: 2em">
        <router-link to="/">
          <button class="outline" style="flex-direction: row; display: flex; justify-content: center; align-items: center;">
            <img src="../img/logo.png" style="height: 1.3em; margin-right: 0.4em; margin-bottom: 0.3em;" />
            Home&nbsp;
          </button>
        </router-link>
        <a href="https://arxiv.org/abs/2310.06770">
          <button class="outline">
            <i class="fa fa-paperclip"></i> Paper&nbsp;
          </button>
        </a>
        <a href="https://github.com/princeton-nlp/SWE-bench">
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
        Select the split & model below to get automated analyses of the model's performance on the SWE-bench split.
      </div>
    </div>
    <div style="text-align: center; margin: 1em 0 1.5em 0;">
      <label for="split-and-model">Split & Model:</label>
      <select id="split-and-model">
        <option value="lite,20240702_codestory_aide_mixed">Lite / (2024-07-02) CodeStory Aide + Mixed Models</option>
    
        <option value="lite,20240627_abanteai_mentatbot_gpt4o">Lite / (2024-06-27) AbanteAI MentatBot + GPT 4o (2024-05-13)</option>
    
        <option value="lite,20240723_marscode-agent-dev">Lite / (2024-07-23) Bytedance MarsCode Agent + GPT 4o (2024-05-13)</option>
    
        <option value="lite,20240622_Lingma_Agent">Lite / (2024-06-22) Alibaba Lingma Agent</option>
    
        <option value="lite,20240617_factory_code_droid">Lite / (2024-06-17) Factory Code Droid</option>
    
        <option value="lite,20240621_autocoderover-v20240620">Lite / (2024-06-21) AutoCodeRover (v20240620) + GPT 4o (2024-05-13)</option>
    
        <option value="lite,20240721_amazon-q-developer-agent-20240719-dev">Lite / (2024-07-21) Amazon Q Developer Agent (v20240719-dev)</option>
    
        <option value="lite,20240604_CodeR">Lite / (2024-06-04) CodeR + GPT 4 (1106)</option>
    
        <option value="lite,20240612_MASAI_gpt4o">Lite / (2024-06-12) MASAI + GPT 4o (2024-05-13)</option>
    
        <option value="lite,20240706_sima_gpt4o">Lite / (2024-07-06) SIMA + GPT 4o (2024-05-13)</option>
    
        <option value="lite,20240630_agentless_gpt4o">Lite / (2024-06-30) Agentless + GPT 4o (2024-05-13)</option>
    
        <option value="lite,20240623_moatless_claude35sonnet">Lite / (2024-06-23) Moatless Tools + Claude 3.5 Sonnet</option>
    
        <option value="lite,20240612_IBM_Research_Agent101">Lite / (2024-06-12) IBM Research Agent-101</option>
    
        <option value="lite,20240523_aider">Lite / (2024-05-23) Aider + GPT 4o & Claude 3 Opus</option>
    
        <option value="lite,20240725_opendevin_codeact_v1.8_claude35sonnet">Lite / (2024-07-25) OpenDevin + CodeAct v1.8</option>
    
        <option value="lite,20240617_moatless_gpt4o">Lite / (2024-06-17) Moatless Tools + GPT 4o (2024-05-13)</option>
    
        <option value="lite,20240524_opencsg_starship_gpt4">Lite / (2024-05-24) OpenCSG StarShip CodeGenAgent + GPT 4 (0613)</option>
    
        <option value="lite,20240620_sweagent_claude3.5sonnet">Lite / (2024-06-20) SWE-agent + Claude 3.5 Sonnet</option>
    
        <option value="lite,20240615_appmap-navie_gpt4o">Lite / (2024-06-15) AppMap Navie + GPT 4o (2024-05-13)</option>
    
        <option value="lite,20240509_amazon-q-developer-agent-20240430-dev">Lite / (2024-05-09) Amazon Q Developer Agent (v20240430-dev)</option>
    
        <option value="lite,20240530_autocoderover-v20240408">Lite / (2024-05-30) AutoCodeRover (v20240408) + GPT 4 (0125)</option>
    
        <option value="lite,20240402_sweagent_gpt4">Lite / (2024-04-02) SWE-agent + GPT 4 (1106)</option>
    
        <option value="lite,20240603_sweagent_gpt4o">Lite / (2024-06-03) SWE-agent + GPT 4o (2024-05-13)</option>
    
        <option value="lite,20240402_sweagent_claude3opus">Lite / (2024-04-02) SWE-agent + Claude 3 Opus</option>
    
        <option value="lite,20240402_rag_claude3opus">Lite / (2024-04-02) RAG + Claude 3 Opus</option>
    
        <option value="lite,20231010_rag_claude2">Lite / (2023-10-10) RAG + Claude 2</option>
    
        <option value="lite,20240402_rag_gpt4">Lite / (2024-04-02) RAG + GPT 4 (1106)</option>
    
        <option value="lite,20231010_rag_swellama7b">Lite / (2023-10-10) RAG + SWE-Llama 7B</option>
    
        <option value="lite,20231010_rag_swellama13b">Lite / (2023-10-10) RAG + SWE-Llama 13B</option>
    
        <option value="lite,20231010_rag_gpt35">Lite / (2023-10-10) RAG + ChatGPT 3.5</option>
    
    
        <option value="test,20240721_amazon-q-developer-agent-20240719-dev">Test / (2024-07-21) Amazon Q Developer Agent (v20240719-dev)</option>
    
        <option value="test,20240617_factory_code_droid">Test / (2024-06-17) Factory Code Droid</option>
    
        <option value="test,20240628_autocoderover-v20240620">Test / (2024-06-28) AutoCodeRover (v20240620) + GPT 4o (2024-05-13)</option>
    
        <option value="test,20240620_sweagent_claude3.5sonnet">Test / (2024-06-20) SWE-agent + Claude 3.5 Sonnet</option>
    
        <option value="test,20240615_appmap-navie_gpt4o">Test / (2024-06-15) AppMap Navie + GPT 4o (2024-05-13)</option>
    
        <option value="test,20240509_amazon-q-developer-agent-20240430-dev">Test / (2024-05-09) Amazon Q Developer Agent (v20240430-dev)</option>
    
        <option value="test,20240402_sweagent_gpt4">Test / (2024-04-02) SWE-agent + GPT 4 (1106)</option>
    
        <option value="test,20240402_sweagent_claude3opus">Test / (2024-04-02) SWE-agent + Claude 3 Opus</option>
    
        <option value="test,20240402_rag_claude3opus">Test / (2024-04-02) RAG + Claude 3 Opus</option>
    
        <option value="test,20231010_rag_claude2">Test / (2023-10-10) RAG + Claude 2</option>
    
        <option value="test,20240402_rag_gpt4">Test / (2024-04-02) RAG + GPT 4 (1106)</option>
    
        <option value="test,20231010_rag_swellama13b">Test / (2023-10-10) RAG + SWE-Llama 13B</option>
    
        <option value="test,20231010_rag_swellama7b">Test / (2023-10-10) RAG + SWE-Llama 7B</option>
    
        <option value="test,20231010_rag_gpt35">Test / (2023-10-10) RAG + ChatGPT 3.5</option>
        
      </select>
      <button id="loadData">Load Data</button>
    </div>
    <div class="content-wrapper">
        <div id="displaySelections">
            Viewing <span style="color:#0ca7ff" id="selectedModel"></span>'s performance
            on the SWE-bench <span style="color:#0ca7ff" id="selectedSplit"></span> split,
            which resolved <span style="color:#0ca7ff" id="selectedResolved"></span>% of
            <span style="color:#0ca7ff" id="selectedSplitNum"></span> issues.
            (<a href="" id="modelSplitURL">Logs</a>)
        </div>
    </div>
    <div class="content-wrapper">
        <div class="content-box" id="readme">
            Loading README.md...
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
    <br><br>
    <!-- <div class="content-wrapper">
        <h3 style="flex: 0 0 15%;margin: 0;">Log Viewer</h3>
        <div id="log-viewer"></div>
    </div> -->
</section>
</template>