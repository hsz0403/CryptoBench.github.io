const chartData = [
  {
    title: "Combined evaluation scores",
    file: "3_combined_eval_scores.pdf",
    description: "Direct LLM vs. SmolAgent performance between Oct 12–18. Red bars show raw calls, blue bars show agentic frameworks.",
  },
  {
    title: "LLM-only leaderboard",
    file: "1_llm_eval_scores.pdf",
    description: "Grok-4 (Web) leads with 1.32 pts while GPT-5 trails at 0.90—highlighting retrieval dominance in raw models.",
  },
  {
    title: "SmolAgent leaderboard",
    file: "2_smolagent_eval_scores.pdf",
    description: "Agentic scaffolding reshuffles rankings: Grok-4 stays ahead yet Qwen3-Max and Gemini narrow the gap.",
  },
  {
    title: "Task distribution",
    file: "A_task_distribution.pdf",
    description: "Balanced mix of prediction vs. retrieval tasks ensures no single skill can game the benchmark.",
  },
  {
    title: "Platform distribution",
    file: "B_platform_distribution.pdf",
    description: "20+ live surfaces—from on-chain explorers to AI signal feeds—force real tool orchestration.",
  },
  {
    title: "Difficulty breakdown",
    file: "C_performance_by_difficulty.pdf",
    description: "Every model drops on complex prompts; Grok-4 loses ~10pts, GPT-5 collapses beyond 25pts.",
  },
  {
    title: "Retrieval vs. prediction",
    file: "D_performance_by_task_family.pdf",
    description: "CryptoBench exposes the retrieval–prediction imbalance where GPT-5 hits 41% vs. 6.25%.",
  },
  {
    title: "Macro category radar",
    file: "E_performance_by_category_radar.pdf",
    description: "DeFi analytics and derivatives data remain hardest, while general 'Other' fare is easier for most models.",
  },
  {
    title: "Quadrant heatmap",
    file: "F_performance_by_task_quadrant.pdf",
    description: "Simple retrieval is saturated; complex prediction reveals the sharpest capability gaps.",
  },
  {
    title: "Quadrant framework",
    file: "Figure1.pdf",
    description: "Visualization of the four-quadrant evaluation model used across monthly releases.",
  },
  {
    title: "Benchmark pipeline",
    file: "Figure2.pdf",
    description: "High-level diagram showing authoring, data capture, agent execution, and scoring feedback loops.",
  },
];

const failureModes = [
  {
    title: "Shallow search & source fidelity",
    detail:
      "Agents grab stale blog posts instead of navigating to official dashboards, missing real-time TVL or liquidation data.",
  },
  {
    title: "Stale information",
    detail:
      "Cached search snippets lag behind volatile metrics—e.g., reporting 14% liquidation ratios when reference is 79%.",
  },
  {
    title: "Integration errors",
    detail:
      "Models retrieve the right numbers but fail to compute spreads or compare assets correctly, leading to mismatched conclusions.",
  },
  {
    title: "Prediction hallucination",
    detail:
      "Instead of grounding in gmgn.ai outputs, some agents fabricate trending token lists to justify narrative answers.",
  },
];

const chartGrid = document.getElementById("chart-grid");
const failureGrid = document.getElementById("failure-grid");

const buildChartCard = (item) => {
  const card = document.createElement("article");
  card.className = "chart-card";

  const header = document.createElement("header");
  const title = document.createElement("h3");
  title.textContent = item.title;
  const desc = document.createElement("p");
  desc.textContent = item.description;

  header.append(title, desc);

  const frame = document.createElement("iframe");
  frame.className = "chart-frame";
  frame.setAttribute("loading", "lazy");
  frame.src = `assets/pdfs/${item.file}#toolbar=0&view=fitH`;
  frame.title = `${item.title} PDF`;

  const link = document.createElement("a");
  link.href = `assets/pdfs/${item.file}`;
  link.download = item.file;
  link.textContent = "Download PDF";

  card.append(header, frame, link);
  return card;
};

const buildFailureCard = (item) => {
  const card = document.createElement("article");
  card.className = "glass";
  const title = document.createElement("h3");
  title.textContent = item.title;
  const detail = document.createElement("p");
  detail.textContent = item.detail;
  card.append(title, detail);
  return card;
};

if (chartGrid) {
  chartData.forEach((entry) => chartGrid.appendChild(buildChartCard(entry)));
}

if (failureGrid) {
  failureModes.forEach((entry) => failureGrid.appendChild(buildFailureCard(entry)));
}
