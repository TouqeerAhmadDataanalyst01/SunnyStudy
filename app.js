const LAYER_LABELS = {
  analyst: 'L1 Analyst',
  scientist: 'L2 Scientist',
  engineer: 'L3 Engineer'
};

const TOOL_LABELS = {
  sql: 'SQL',
  excel: 'Excel',
  python: 'Python',
  powerbi: 'Power BI'
};

const LESSONS = {
  analyst: [
    { id: 'a1', title: 'Clean a customer table', tool: 'sql', summary: 'Filter nulls and duplicate rows before analysis.', command: 'SELECT customer_id, COUNT(*) FROM customers WHERE segment IS NOT NULL GROUP BY customer_id HAVING COUNT(*) > 1;' },
    { id: 'a2', title: 'Revenue trend by month', tool: 'excel', summary: 'Use SUMIFS to compare revenue and growth.', command: '=SUMIFS(RevenueRange, DateRange, ">="&A2, DateRange, "<="&EOMONTH(A2,0))' },
    { id: 'a3', title: 'Segment performance', tool: 'powerbi', summary: 'Create a KPI card for group performance.', command: 'Revenue by Segment = CALCULATE(SUM(Sales[Revenue]), ALLEXCEPT(Sales, Sales[Segment]))' },
    { id: 'a4', title: 'Explore campaign response', tool: 'sql', summary: 'Join campaign and transaction tables to measure CTR.', command: 'SELECT campaign, ROUND(AVG(response_rate), 2) AS avg_ctr FROM marketing GROUP BY campaign;' },
    { id: 'a5', title: 'Pivot summaries', tool: 'excel', summary: 'Compare region totals with a pivot-style table.', command: '=SUMIFS(Revenue, Region, "North")' },
    { id: 'a6', title: 'Audit data quality', tool: 'python', summary: 'Use Python to detect missing values and bad categories.', command: 'df.isna().sum()' },
    { id: 'a7', title: 'Retention funnel', tool: 'powerbi', summary: 'Track conversion from visit to purchase.', command: 'Conversion = DIVIDE(COUNTROWS(FilterTable), COUNTROWS(VisitorsTable))' },
    { id: 'a8', title: 'Top customers', tool: 'sql', summary: 'Rank customers by lifetime value.', command: 'SELECT customer_id, SUM(revenue) AS LTV FROM orders GROUP BY customer_id ORDER BY LTV DESC LIMIT 10;' },
    { id: 'a9', title: 'Subscription health', tool: 'excel', summary: 'Highlight churn risk by plan type.', command: '=COUNTIFS(PlanType, "Starter", Status, "At Risk")' },
    { id: 'a10', title: 'Decision memo', tool: 'powerbi', summary: 'Translate numbers into a board-ready story.', command: 'Narrative = "North region grew 18% quarter-over-quarter."' }
  ],
  scientist: [
    { id: 's1', title: 'Feature correlation map', tool: 'python', summary: 'Validate which variables move together.', command: 'corr = df.corr(numeric_only=True); corr.round(2)' },
    { id: 's2', title: 'Time series forecast', tool: 'python', summary: 'Forecast monthly demand with rolling averages.', command: 'rolling = df["sales"].rolling(window=3).mean()' },
    { id: 's3', title: 'Cohort segmentation', tool: 'sql', summary: 'Group users into behavioural cohorts.', command: 'WITH cohorts AS (SELECT user_id, ROUND(AVG(orders), 1) AS avg_orders FROM sessions GROUP BY user_id) SELECT * FROM cohorts WHERE avg_orders > 3;' },
    { id: 's4', title: 'A/B test uplift', tool: 'excel', summary: 'Compare conversion differences across experiments.', command: '=((ExperimentBConversion-ExperimentAConversion)/ExperimentAConversion)' },
    { id: 's5', title: 'Clustering students', tool: 'python', summary: 'Identify which learners have similar engagement.', command: 'from sklearn.cluster import KMeans\nmodel = KMeans(n_clusters=3); labels = model.fit_predict(X)' },
    { id: 's6', title: 'Model quality review', tool: 'powerbi', summary: 'Measure recall and precision in an executive dashboard.', command: 'Precision = DIVIDE([TP], [TP] + [FP])' },
    { id: 's7', title: 'Regression diagnostics', tool: 'excel', summary: 'Check slope, intercept, and residual trend.', command: '=LINEST(y_values, x_values, TRUE, TRUE)' },
    { id: 's8', title: 'Feature importance', tool: 'python', summary: 'Rank the strongest drivers of an outcome.', command: 'import pandas as pd\nimportance = pd.Series(model.feature_importances_, index=X.columns).sort_values(ascending=False)' },
    { id: 's9', title: 'Anomaly detection', tool: 'sql', summary: 'Flag spikes in traffic data.', command: 'SELECT date, traffic FROM logs WHERE traffic > AVG(traffic) + 2 * STDDEV(traffic);' },
    { id: 's10', title: 'Research summary', tool: 'powerbi', summary: 'Turn model results into a scientific narrative.', command: 'Story = "The highest lift came from the strongest-engagement cohort."' }
  ],
  engineer: [
    { id: 'e1', title: 'Build a warehouse table', tool: 'sql', summary: 'Create fact tables for downstream analytics.', command: 'CREATE TABLE fact_orders AS SELECT * FROM raw_orders WHERE order_date IS NOT NULL;' },
    { id: 'e2', title: 'ETL pipeline preview', tool: 'powerbi', summary: 'Validate raw-to-clean transformations in a storage map.', command: 'Raw -> Validate -> Clean -> Aggregate -> Publish' },
    { id: 'e3', title: 'Normalize event logs', tool: 'python', summary: 'Flatten messy JSON and standardize columns.', command: 'df = pd.json_normalize(events)' },
    { id: 'e4', title: 'Data quality checks', tool: 'sql', summary: 'Reject invalid rows before publishing data.', command: 'SELECT COUNT(*) FROM users WHERE email IS NULL OR country NOT IN (\'PK\', \'US\', \'UK\');' },
    { id: 'e5', title: 'UTC timestamp cleanup', tool: 'python', summary: 'Convert logs into a consistent time zone.', command: 'df["ts"] = pd.to_datetime(df["ts"], utc=True)' },
    { id: 'e6', title: 'Warehouse query replay', tool: 'sql', summary: 'Optimize a dashboard query with filters and partitions.', command: 'SELECT region, SUM(amount) FROM fact_orders WHERE order_date >= CURRENT_DATE - 30 GROUP BY region;' },
    { id: 'e7', title: 'Model-ready dataset', tool: 'python', summary: 'Prepare a training dataset with no gaps.', command: 'df = df.dropna().reset_index(drop=True)' },
    { id: 'e8', title: 'Observability guardrail', tool: 'powerbi', summary: 'Track ingestion success and failed rows.', command: 'Load Success Rate = DIVIDE([SuccessfulRows], [TotalRows])' },
    { id: 'e9', title: 'DuckDB in-browser query', tool: 'sql', summary: 'Run a lightweight analytical SQL engine in the browser.', command: 'SELECT country, sum(amount) AS revenue FROM orders GROUP BY country ORDER BY revenue DESC;' },
    { id: 'e10', title: 'Deployment checklist', tool: 'powerbi', summary: 'Publish only after QA, access, and traceability checks.', command: 'Checklist = [QA, Access, Docs, SLA, Monitoring]' }
  ]
};

const SAMPLE_DATA = {
  sales: [
    { month: 'Jan', revenue: 62000, orders: 1200, region: 'North' },
    { month: 'Feb', revenue: 58000, orders: 1150, region: 'North' },
    { month: 'Mar', revenue: 71000, orders: 1300, region: 'North' },
    { month: 'Apr', revenue: 76000, orders: 1450, region: 'South' },
    { month: 'May', revenue: 89000, orders: 1700, region: 'South' },
    { month: 'Jun', revenue: 98000, orders: 1880, region: 'East' },
    { month: 'Jul', revenue: 105000, orders: 2100, region: 'East' },
    { month: 'Aug', revenue: 115000, orders: 2200, region: 'West' },
    { month: 'Sep', revenue: 118000, orders: 2250, region: 'West' },
    { month: 'Oct', revenue: 121000, orders: 2300, region: 'West' },
    { month: 'Nov', revenue: 132000, orders: 2420, region: 'Central' },
    { month: 'Dec', revenue: 148000, orders: 2550, region: 'Central' }
  ],
  engagement: [
    { student: 'Ayesha', attendance: 96, labs: 18, score: 92 },
    { student: 'Bilal', attendance: 88, labs: 12, score: 81 },
    { student: 'Hira', attendance: 97, labs: 20, score: 95 },
    { student: 'Muhammad', attendance: 84, labs: 9, score: 72 },
    { student: 'Sana', attendance: 92, labs: 16, score: 89 },
    { student: 'Zain', attendance: 79, labs: 8, score: 68 }
  ],
  events: [
    { date: '2024-01-03', country: 'PK', amount: 2700, channel: 'Organic' },
    { date: '2024-01-06', country: 'US', amount: 4300, channel: 'Paid' },
    { date: '2024-01-12', country: 'UK', amount: 5200, channel: 'Referral' },
    { date: '2024-02-02', country: 'PK', amount: 6100, channel: 'Organic' },
    { date: '2024-02-28', country: 'US', amount: 6900, channel: 'Paid' },
    { date: '2024-03-01', country: 'UK', amount: 7100, channel: 'Referral' }
  ]
};

const state = {
  layer: 'analyst',
  tool: 'sql',
  currentLesson: null,
  resultTable: [],
  sourceTable: [],
  projects: [],
  chart: null,
  pyodideReady: false,
  duckdbReady: false,
  studentHelped: Number(localStorage.getItem('sunnystudy_helped') || 0),
  datasets: {}
};

const elements = {};

function init() {
  cacheDom();
  seedDatasetCatalog();
  bindEvents();
  renderLayerButtons();
  renderToolButtons();
  refreshLessonList();
  restoreProjectState();
  renderDashboard();
  renderProjectGallery();
  updateHelpCounter();
  registerServiceWorker();
  initIndexedDb();
}

function cacheDom() {
  elements.lessonList = document.getElementById('lesson-list');
  elements.lessonCount = document.getElementById('lesson-count');
  elements.sourceTable = document.getElementById('source-table');
  elements.consoleInput = document.getElementById('sql-command') || document.getElementById('console-input') || document.getElementById('formula-input') || document.getElementById('python-command');
  elements.consoleRun = document.getElementById('run-command') || document.getElementById('console-run');
  elements.consoleOutput = document.getElementById('console-output');
  elements.outputChart = document.getElementById('chart-canvas');
  elements.summaryTitle = document.getElementById('summary-title') || document.getElementById('active-lesson-title');
  elements.summaryText = document.getElementById('summary-text') || document.getElementById('console-caption');
  elements.toast = document.getElementById('toast');
  elements.projectGalleryModal = document.getElementById('project-gallery-modal');
  elements.projectGalleryList = document.getElementById('project-gallery-list');
  elements.closeGallery = document.getElementById('close-gallery');
  elements.layerButtons = [...document.querySelectorAll('.layer-button')];
  elements.toolButtons = [...document.querySelectorAll('.tool-button')];
  elements.ethicalAd = document.getElementById('ethical-ad');
  elements.datasetList = document.getElementById('dataset-list');
  elements.saveProject = document.getElementById('save-project');
  elements.exportCsv = document.getElementById('export-csv');
  elements.projectGallery = document.getElementById('project-gallery');
  elements.printAssignment = document.getElementById('print-assignment');
}

function bindEvents() {
  elements.layerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.layer = button.dataset.layer;
      state.tool = getDefaultToolForLayer(state.layer);
      renderLayerButtons();
      renderToolButtons();
      refreshLessonList();
      renderDashboard();
      showToast(`${LAYER_LABELS[state.layer]} selected`);
    });
  });

  elements.toolButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.tool = button.dataset.tool;
      renderToolButtons();
      refreshLessonList();
      renderDashboard();
      showToast(`${TOOL_LABELS[state.tool]} mode selected`);
    });
  });

  elements.consoleRun.addEventListener('click', handleConsoleRun);
  elements.consoleInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleConsoleRun();
    }
  });

  elements.saveProject.addEventListener('click', saveCurrentProject);
  elements.exportCsv.addEventListener('click', exportCurrentCsv);
  elements.projectGallery.addEventListener('click', () => showProjectGallery());
  elements.closeGallery.addEventListener('click', () => elements.projectGalleryModal.classList.add('hidden'));
  elements.projectGalleryModal.addEventListener('click', (event) => {
    if (event.target === elements.projectGalleryModal) {
      elements.projectGalleryModal.classList.add('hidden');
    }
  });

  elements.printAssignment.addEventListener('click', () => window.print());
}

function renderLayerButtons() {
  elements.layerButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.layer === state.layer);
  });
}

function renderToolButtons() {
  const availableTools = getToolsForLayer(state.layer);
  elements.toolButtons.forEach((button) => {
    const isActive = button.dataset.tool === state.tool && availableTools.includes(state.tool);
    button.classList.toggle('is-active', isActive);
    button.disabled = !availableTools.includes(button.dataset.tool);
    button.style.opacity = button.disabled ? '0.35' : '1';
  });

  syncEditorPanels();
}

function syncEditorPanels() {
  const editorMap = {
    sql: document.getElementById('sql-editor'),
    excel: document.getElementById('excel-editor'),
    python: document.getElementById('python-editor'),
    powerbi: document.getElementById('powerbi-editor')
  };

  Object.entries(editorMap).forEach(([tool, panel]) => {
    if (!panel) return;
    const visible = tool === state.tool;
    panel.classList.toggle('is-hidden', !visible);
  });

  const activeInputMap = {
    sql: document.getElementById('sql-command'),
    excel: document.getElementById('formula-input'),
    python: document.getElementById('python-command'),
    powerbi: document.getElementById('chart-column')
  };

  elements.consoleInput = activeInputMap[state.tool] || document.getElementById('sql-command');
  const activeLang = document.getElementById('console-language');
  const caption = document.getElementById('console-caption');
  if (activeLang) activeLang.textContent = TOOL_LABELS[state.tool].toUpperCase();
  if (caption) {
    const copy = {
      sql: 'Write a query against your active data.',
      excel: 'Build a formula view for your active dataset.',
      python: 'Run a Python notebook expression against your data.',
      powerbi: 'Build a visual metric and group your data.'
    };
    caption.textContent = copy[state.tool] || 'Write a query against your active data.';
  }
}

function getDefaultToolForLayer(layer) {
  if (layer === 'scientist') return 'python';
  if (layer === 'engineer') return 'sql';
  return 'sql';
}

function getToolsForLayer(layer) {
  if (layer === 'scientist') return ['python', 'excel', 'powerbi', 'sql'];
  if (layer === 'engineer') return ['sql', 'python', 'powerbi', 'excel'];
  return ['sql', 'excel', 'powerbi', 'python'];
}

function refreshLessonList() {
  const lessons = LESSONS[state.layer].filter((lesson) => lesson.tool === state.tool || state.tool === 'sql');
  const items = lessons.length ? lessons : LESSONS[state.layer];
  elements.lessonList.innerHTML = items
    .map((lesson) => `
      <button type="button" class="lesson-item ${state.currentLesson && state.currentLesson.id === lesson.id ? 'is-selected' : ''}" data-lesson-id="${lesson.id}">
        <span class="lesson-dot"></span>
        <span>
          <strong>${lesson.title}</strong>
          <small>${lesson.summary}</small>
        </span>
      </button>
    `)
    .join('');

  elements.lessonCount.textContent = String(items.length);

  elements.lessonList.querySelectorAll('.lesson-item').forEach((button) => {
    button.addEventListener('click', () => {
      const matched = getLessonById(button.dataset.lessonId);
      if (!matched) return;
      state.currentLesson = matched;
      elements.consoleInput.value = matched.command;
      renderLessonSummary(matched);
      runLessonScenario(matched);
      refreshLessonList();
    });
  });

  if (!state.currentLesson) {
    const defaultLesson = items[0];
    if (defaultLesson) {
      state.currentLesson = defaultLesson;
      elements.consoleInput.value = defaultLesson.command;
      renderLessonSummary(defaultLesson);
      runLessonScenario(defaultLesson);
    }
  }
}

function getLessonById(id) {
  return LESSONS[state.layer].find((lesson) => lesson.id === id) || null;
}

function renderLessonSummary(lesson) {
  const layerTitle = LAYER_LABELS[state.layer];
  if (elements.summaryTitle) elements.summaryTitle.textContent = `${layerTitle} · ${lesson.title}`;
  if (elements.summaryText) elements.summaryText.textContent = `${lesson.summary} Use the console to practice the command with your browser-based dataset.`;

  const activeLessonEl = document.getElementById('active-lesson-title');
  if (activeLessonEl) activeLessonEl.textContent = lesson.title;

  const toolKicker = document.getElementById('tool-kicker');
  if (toolKicker) toolKicker.textContent = `${TOOL_LABELS[state.tool].toUpperCase()} · ${layerTitle.toUpperCase()}`;
}

function runLessonScenario(lesson) {
  const tableData = buildScenarioTable(lesson);
  state.resultTable = tableData;
  state.sourceTable = tableData;
  renderSourceTable();
  renderResultTable(tableData);
  renderChart(tableData);
  updateHelpCounter();
}

function buildScenarioTable(lesson) {
  const base = [...SAMPLE_DATA.sales];
  if (lesson.tool === 'python') {
    return SAMPLE_DATA.engagement.map((person) => ({
      student: person.student,
      score: person.score,
      attendance: person.attendance,
      labs: person.labs
    }));
  }
  if (lesson.tool === 'powerbi') {
    return base.map((entry) => ({ month: entry.month, revenue: entry.revenue, region: entry.region }));
  }
  if (lesson.tool === 'excel') {
    return SAMPLE_DATA.engagement.map((person) => ({ student: person.student, attendance: person.attendance, score: person.score }));
  }
  return base.map((entry) => ({ month: entry.month, revenue: entry.revenue, orders: entry.orders, region: entry.region }));
}

function renderDashboard() {
  const dataset = buildScenarioTable(state.currentLesson || { tool: state.tool });
  state.resultTable = dataset;
  state.sourceTable = dataset;
  const datasetName = document.getElementById('dataset-name');
  const datasetSize = document.getElementById('dataset-size');
  if (datasetName) datasetName.textContent = 'sample_sales.csv';
  if (datasetSize) datasetSize.textContent = `${dataset.length} rows`;
  renderSourceTable();
  renderResultTable(dataset);
  renderChart(dataset);
}

function renderSourceTable() {
  if (!state.sourceTable || !state.sourceTable.length) {
    elements.sourceTable.innerHTML = '<tr><td colspan="4">No dataset available yet.</td></tr>';
    return;
  }

  const headers = Object.keys(state.sourceTable[0]);
  const rows = state.sourceTable.slice(0, 7).map((row) => {
    const cells = headers.map((header) => `<td>${row[header]}</td>`).join('');
    return `<tr>${cells}</tr>`;
  }).join('');

  elements.sourceTable.innerHTML = `
    <thead>
      <tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr>
    </thead>
    <tbody>${rows}</tbody>
  `;
}

function renderResultTable(rows) {
  const output = document.getElementById('output-table');
  const resultCount = document.getElementById('result-count');
  if (resultCount) resultCount.textContent = rows && rows.length ? `${rows.length} rows` : 'Awaiting command';
  if (!output) return;

  if (!rows || !rows.length) {
    output.innerHTML = '<div class="empty-state">No output available.</div>';
    return;
  }

  const headers = Object.keys(rows[0]);
  output.innerHTML = `
    <table>
      <thead><tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr></thead>
      <tbody>${rows.slice(0, 7).map((row) => `<tr>${headers.map((header) => `<td>${row[header]}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
  `;
}

function renderChart(rows) {
  const canvas = document.getElementById('chart-canvas');
  if (!canvas) return;

  const labels = rows.map((item) => item.month || item.student || item.region || item.date || 'Item');
  const values = rows.map((item) => {
    const keys = ['revenue', 'score', 'attendance', 'labs', 'orders', 'amount'];
    const value = keys.find((key) => item[key] != null && !Number.isNaN(Number(item[key])));
    return Number(value ? item[value] : 0);
  });

  if (window.Chart) {
    if (state.chart) {
      state.chart.destroy();
    }
    state.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: `${LAYER_LABELS[state.layer]} • ${TOOL_LABELS[state.tool]}`,
          data: values,
          backgroundColor: ['#7ce0ac', '#8ec5ff', '#f9d56e', '#db8bff', '#ffb88c', '#9fe7d6', '#91a9ff', '#f7a6c8', '#e0ffd0', '#cde5ff'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: false } }
      }
    });
  }
}

function handleConsoleRun() {
  const rawCommand = elements.consoleInput.value.trim();
  if (!rawCommand) {
    showToast('Enter a command first.');
    return;
  }

  const typed = rawCommand.toLowerCase();
  let output = '';

  if (typed.includes('select') || typed.includes('group by') || typed.includes('count') || typed.includes('sum') || typed.includes('avg')) {
    output = runSqlSimulation(rawCommand);
  } else if (typed.includes('df.') || typed.includes('corr') || typed.includes('kmeans') || typed.includes('rolling')) {
    output = runPythonSimulation(rawCommand);
  } else if (typed.includes('=') || typed.includes('sumif') || typed.includes('countif')) {
    output = runExcelSimulation(rawCommand);
  } else if (typed.includes('calculate') || typed.includes('revenue') || typed.includes('divid') || typed.includes('story')) {
    output = runPowerBiSimulation(rawCommand);
  } else {
    output = `Command ready: ${rawCommand}\nResult: simulated with the current SunnyStudy dataset.`;
  }

  const formatted = `> ${rawCommand}\n${output}`;
  elements.consoleOutput.textContent = formatted;

  if (state.layer === 'engineer') {
    runDuckDbPipeline(rawCommand).catch(() => undefined);
  }

  if (state.layer === 'scientist') {
    runPyodideTask(rawCommand).catch(() => undefined);
  }

  trackStudentHelp();
  renderResultTable(state.resultTable);
  showToast('Analysis updated.');
}

function runSqlSimulation(command) {
  const sanitized = command.toLowerCase();
  const revenueList = SAMPLE_DATA.sales.map((item) => item.revenue);
  const averageRevenue = Math.round(revenueList.reduce((sum, value) => sum + value, 0) / revenueList.length);

  if (sanitized.includes('group by') || sanitized.includes('sum')) {
    state.resultTable = SAMPLE_DATA.sales.map((item) => ({ month: item.month, revenue: item.revenue, region: item.region }));
    return `SQL summary\n- Avg monthly revenue: $${averageRevenue.toLocaleString()}\n- Top month: Dec\n- Result rows: ${state.resultTable.length}`;
  }

  const top = [...SAMPLE_DATA.sales].sort((a, b) => b.revenue - a.revenue)[0];
  state.resultTable = [{ month: top.month, revenue: top.revenue, region: top.region }];
  return `SQL result\n- Highest revenue: $${top.revenue.toLocaleString()} in ${top.month}\n- Region: ${top.region}`;
}

function runPythonSimulation(command) {
  if (command.includes('corr')) {
    state.resultTable = SAMPLE_DATA.engagement.map((student) => ({ student: student.student, score: student.score, attendance: student.attendance }));
    return 'Python insight\n- Score and attendance are positively related\n- Strongest learners show 90%+ attendance';
  }

  if (command.includes('kmeans')) {
    state.resultTable = SAMPLE_DATA.engagement.map((student) => ({ student: student.student, labs: student.labs, score: student.score }));
    return 'Scientific clustering\n- 3 learner cohorts detected\n- High-engagement cluster: Hira, Ayesha, Sana';
  }

  state.resultTable = SAMPLE_DATA.engagement;
  return 'Python preview\n- Dataset size: 6 learners\n- Feature checks passed\n- Ready for notebook analysis';
}

function runExcelSimulation(command) {
  const scoreSet = SAMPLE_DATA.engagement.map((student) => student.score);
  const maximum = Math.max(...scoreSet);
  const average = Math.round(scoreSet.reduce((sum, item) => sum + item, 0) / scoreSet.length);
  state.resultTable = SAMPLE_DATA.engagement;
  return `Excel output\n- Average score: ${average}\n- Maximum score: ${maximum}\n- Suggested action: support the low-performing cohort with labs and coaching.`;
}

function runPowerBiSimulation(command) {
  const regionTotal = SAMPLE_DATA.sales.reduce((memo, item) => {
    memo[item.region] = (memo[item.region] || 0) + item.revenue;
    return memo;
  }, {});
  const strongest = Object.entries(regionTotal).sort((a, b) => b[1] - a[1])[0];
  state.resultTable = Object.entries(regionTotal).map(([region, revenue]) => ({ region, revenue }));
  return `Power BI insight\n- Strongest region: ${strongest[0]} ($${strongest[1].toLocaleString()})\n- Dashboard story is ready to publish.`;
}

async function runPyodideTask(command) {
  if (!window.loadPyodide) {
    return;
  }

  if (!state.pyodideReady) {
    state.pyodideReady = true;
    window.pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/' });
  }

  const result = await window.pyodide.runPythonAsync(`
import json
print("PYODIDE_OK")
print(json.dumps({"command": ${JSON.stringify(command)}, "rows": ${SAMPLE_DATA.engagement.length}}))
`);

  elements.consoleOutput.textContent += `\n\n[Pyodide] ${String(result).slice(0, 250)}`;
}

async function runDuckDbPipeline(command) {
  if (!window.DuckDB) {
    return;
  }

  if (!state.duckdbReady) {
    const duckdb = await import('https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.29.0/dist/duckdb-browser.mjs');
    const bundle = await duckdb.selectBundle({
      mvp: { mainModule: 'https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.29.0/dist/duckdb-mvp.wasm', mainWorker: 'https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.29.0/dist/duckdb-browser-worker.js' },
      eh: { mainModule: 'https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.29.0/dist/duckdb-eh.wasm', mainWorker: 'https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.29.0/dist/duckdb-browser-worker.js' }
    });
    const db = new duckdb.Database(bundle);
    state.duckdbReady = !!db;
    window.duckdbEngine = db;
  }

  if (!window.duckdbEngine) {
    return;
  }

  const sql = `SELECT month, SUM(revenue) AS total_revenue FROM (VALUES ('Jan', 62000), ('Feb', 58000), ('Mar', 71000), ('Apr', 76000), ('May', 89000)) t(month, revenue) GROUP BY month;`;
  elements.consoleOutput.textContent += `\n\n[DuckDB] Query prepared for browser-side warehouse execution.\n${sql}`;
}

function trackStudentHelp() {
  state.studentHelped += 1;
  localStorage.setItem('sunnystudy_helped', String(state.studentHelped));
  updateHelpCounter();
}

function updateHelpCounter() {
  const count = document.getElementById('student-helped-count');
  if (count) {
    count.textContent = String(state.studentHelped);
  }
  if (elements.ethicalAd) {
    elements.ethicalAd.hidden = state.studentHelped < 6;
  }
}

function seedDatasetCatalog() {
  state.datasets = {
    sales: SAMPLE_DATA.sales,
    engagement: SAMPLE_DATA.engagement,
    events: SAMPLE_DATA.events
  };
  renderDatasetList();
}

function renderDatasetList() {
  if (!elements.datasetList) return;
  const entries = Object.entries(state.datasets);
  elements.datasetList.innerHTML = entries.map(([name, rows]) => `
    <button type="button" class="mini-dataset" data-name="${name}">${name} <span>${rows.length} rows</span></button>
  `).join('');

  elements.datasetList.querySelectorAll('.mini-dataset').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      if (state.datasets[name]) {
        state.sourceTable = state.datasets[name];
        renderSourceTable();
        showToast(`Loaded ${name} dataset.`);
      }
    });
  });
}

function saveCurrentProject() {
  const name = prompt('Project name', `SunnyStudy ${new Date().toLocaleDateString()}`) || `SunnyStudy ${new Date().toLocaleDateString()}`;
  const payload = {
    id: `${Date.now()}`,
    name,
    layer: state.layer,
    tool: state.tool,
    lesson: state.currentLesson ? state.currentLesson.title : 'Quick review',
    createdAt: new Date().toISOString(),
    preview: buildProjectThumbnail(),
    dataset: state.sourceTable.slice(0, 20)
  };

  state.projects = JSON.parse(localStorage.getItem('sunnystudy_projects') || '[]');
  state.projects.unshift(payload);
  localStorage.setItem('sunnystudy_projects', JSON.stringify(state.projects.slice(0, 12)));
  renderProjectGallery();
  saveProjectToIndexedDb(payload);
  trackStudentHelp();
  showToast(`Saved ${name}.`);
}

function buildProjectThumbnail() {
  const canvas = document.createElement('canvas');
  canvas.width = 220;
  canvas.height = 140;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0b1220';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#7ce0ac';
  for (let i = 0; i < 9; i += 1) {
    ctx.fillRect(10 + i * 20, 110 - i * 9, 12, i * 9 + 10);
  }
  return canvas.toDataURL('image/png');
}

function renderProjectGallery() {
  state.projects = JSON.parse(localStorage.getItem('sunnystudy_projects') || '[]');
  if (!elements.projectGalleryList) return;
  if (!state.projects.length) {
    elements.projectGalleryList.innerHTML = '<div class="empty-state">No saved projects yet. Save your first concept to build a gallery.</div>';
    return;
  }

  elements.projectGalleryList.innerHTML = state.projects.map((project) => `
    <article class="project-card">
      <img src="${project.preview || 'https://placehold.co/220x140/0b1220/7ce0ac?text=SunnyStudy'}" alt="${project.name}">
      <strong>${project.name}</strong>
      <small>${project.layer} • ${project.tool}</small>
      <small>${new Date(project.createdAt).toLocaleDateString()}</small>
    </article>
  `).join('');
}

function showProjectGallery() {
  renderProjectGallery();
  elements.projectGalleryModal.classList.remove('hidden');
}

function restoreProjectState() {
  try {
    const stored = JSON.parse(localStorage.getItem('sunnystudy_projects') || '[]');
    state.projects = Array.isArray(stored) ? stored : [];
  } catch (error) {
    state.projects = [];
  }
}

function exportCurrentCsv() {
  if (!state.resultTable || !state.resultTable.length) {
    showToast('No data to export yet.');
    return;
  }

  const header = Object.keys(state.resultTable[0]).join(',');
  const rows = state.resultTable.map((row) => Object.values(row).join(',')).join('\n');
  const blob = new Blob([`${header}\n${rows}\n`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `sunnystudy-${state.layer}-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast('CSV exported.');
}

function showToast(message) {
  if (!elements.toast) return;
  elements.toast.textContent = message;
  elements.toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => elements.toast.classList.remove('show'), 1800);
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => undefined);
    });
  }
}

function initIndexedDb() {
  const request = indexedDB.open('SunnyStudyDb', 1);
  request.onupgradeneeded = () => {
    const db = request.result;
    if (!db.objectStoreNames.contains('projects')) {
      db.createObjectStore('projects', { keyPath: 'id' });
    }
  };
  request.onsuccess = () => {
    console.info('IndexedDB ready for student project storage.');
  };
}

function saveProjectToIndexedDb(project) {
  const request = indexedDB.open('SunnyStudyDb', 1);
  request.onsuccess = () => {
    const db = request.result;
    const tx = db.transaction('projects', 'readwrite');
    tx.objectStore('projects').put(project);
  };
}

window.addEventListener('DOMContentLoaded', init);
