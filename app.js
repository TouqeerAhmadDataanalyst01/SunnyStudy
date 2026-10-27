const SAMPLE_DATA = [
  { order_id: 101, month: 'Jan', region: 'North', category: 'Electronics', product: 'Laptop', customer: 'Aisha', sales: 820, quantity: 2 },
  { order_id: 102, month: 'Jan', region: 'South', category: 'Furniture', product: 'Desk', customer: 'Rohan', sales: 430, quantity: 1 },
  { order_id: 103, month: 'Feb', region: 'North', category: 'Stationery', product: 'Notebook Set', customer: 'Nina', sales: 240, quantity: 5 },
  { order_id: 104, month: 'Feb', region: 'East', category: 'Electronics', product: 'Monitor', customer: 'Priya', sales: 660, quantity: 3 },
  { order_id: 105, month: 'Mar', region: 'West', category: 'Office', product: 'Printer', customer: 'Sam', sales: 520, quantity: 2 },
  { order_id: 106, month: 'Mar', region: 'East', category: 'Furniture', product: 'Chair', customer: 'Leo', sales: 310, quantity: 4 },
  { order_id: 107, month: 'Apr', region: 'South', category: 'Electronics', product: 'Tablet', customer: 'Meera', sales: 710, quantity: 2 },
  { order_id: 108, month: 'Apr', region: 'West', category: 'Office', product: 'Projector', customer: 'Adil', sales: 980, quantity: 1 },
  { order_id: 109, month: 'May', region: 'North', category: 'Furniture', product: 'Shelf', customer: 'Zara', sales: 390, quantity: 3 },
  { order_id: 110, month: 'May', region: 'South', category: 'Stationery', product: 'Marker Pack', customer: 'Tariq', sales: 180, quantity: 8 }
];

const LESSONS = {
  sql: [
    { id: 'sql-select', title: 'SELECT basics', summary: 'Read rows with confidence.' },
    { id: 'sql-filter', title: 'WHERE filters', summary: 'Reduce data to relevant rows.' },
    { id: 'sql-group', title: 'GROUP BY', summary: 'Summarize categories and trends.' },
    { id: 'sql-join', title: 'JOIN patterns', summary: 'Connect data across tables.' }
  ],
  excel: [
    { id: 'excel-sum', title: 'SUM and averages', summary: 'Combine values with formulas.' },
    { id: 'excel-lookup', title: 'LOOKUP logic', summary: 'Pull values from a table.' },
    { id: 'excel-if', title: 'IF conditions', summary: 'Flag outcomes quickly.' }
  ],
  python: [
    { id: 'python-filter', title: 'Filtering rows', summary: 'Trim data with conditions.' },
    { id: 'python-group', title: 'Grouping data', summary: 'Spot patterns by key.' },
    { id: 'python-sort', title: 'Sorting values', summary: 'Rank results insightfully.' }
  ],
  powerbi: [
    { id: 'powerbi-kpi', title: 'KPI cards', summary: 'Track high-level metrics.' },
    { id: 'powerbi-visual', title: 'Bar and donut', summary: 'Turn categories into visuals.' },
    { id: 'powerbi-summary', title: 'Insight table', summary: 'Summaries that tell a story.' }
  ]
};

const TOOL_LABELS = {
  sql: 'SQL',
  excel: 'Excel',
  python: 'Python',
  powerbi: 'Power BI'
};

const state = {
  tool: 'sql',
  activeLesson: 'sql-select',
  dataset: structuredClone(SAMPLE_DATA),
  datasetName: 'sample_sales.csv',
  datasetType: 'CSV',
  selectedCell: { row: 1, col: 0 },
  chartType: 'bar',
  template: 'classic',
  page: 'learn',
  currentResult: null,
  formulaState: {},
  currentAssignment: ''
};

const els = {};

function $(selector) {
  return document.querySelector(selector);
}

function init() {
  cacheElements();
  bindGlobalEvents();
  seedInitialData();
  restoreAssignmentDraft();
  restoreProjectState();
  populateFormFromState();
  renderLessonList();
  renderSourceTable();
  renderPowerBIControls();
  renderResultPanel();
  updateAssignmentPreview();
  updateWordCount();
}

function cacheElements() {
  els.lessonList = $('#lesson-list');
  els.toolButtons = [...document.querySelectorAll('.tool-button')];
  els.navButtons = [...document.querySelectorAll('.nav-link')];
  els.toolKicker = $('#tool-kicker');
  els.activeLessonTitle = $('#active-lesson-title');
  els.datasetName = $('#dataset-name');
  els.datasetSize = $('#dataset-size');
  els.fileType = $('#file-type');
  els.columnCount = $('#column-count');
  els.sourceTable = $('#source-table');
  els.consoleLanguage = $('#console-language');
  els.consoleCaption = $('#console-caption');
  els.sqlEditor = $('#sql-editor');
  els.excelEditor = $('#excel-editor');
  els.pythonEditor = $('#python-editor');
  els.powerbiEditor = $('#powerbi-editor');
  els.sqlCommand = $('#sql-command');
  els.formulaInput = $('#formula-input');
  els.pythonCommand = $('#python-command');
  els.chartColumn = $('#chart-column');
  els.categoryColumn = $('#category-column');
  els.runCommand = $('#run-command');
  els.runStatus = $('#run-status');
  els.resultContent = $('#result-content');
  els.resultCount = $('#result-count');
  els.datasetUpload = $('#dataset-upload');
  els.resetData = $('#reset-data');
  els.saveProject = $('#save-project');
  els.exportCsv = $('#export-csv');
  els.quickExamples = [...document.querySelectorAll('[data-example]')];
  els.chartTypeButtons = [...document.querySelectorAll('.chart-type')];
  els.assignmentPage = $('#assignment-page');
  els.learnPage = $('#learn-page');
  els.assignForm = $('#assignment-form');
  els.assignmentContent = $('#assignment-content');
  els.printAssignment = $('#print-assignment');
  els.templateOptionButtons = [...document.querySelectorAll('.template-option')];
  els.paperPreview = $('#cover-preview');
  els.toast = $('#toast');
  els.wordCount = $('#word-count');
  els.selectedCell = $('#selected-cell');
  els.stepButtons = [...document.querySelectorAll('.step-button')];
  els.formSteps = [...document.querySelectorAll('.form-step')];
  els.formFields = [...document.querySelectorAll('#assignment-form input')];
  els.editorToolbarButtons = [...document.querySelectorAll('[data-insert]')];
  els.finishAssignment = $('#finish-assignment');
}

function bindGlobalEvents() {
  els.toolButtons.forEach(button => {
    button.addEventListener('click', () => {
      state.tool = button.dataset.tool;
      const lessons = LESSONS[state.tool];
      state.activeLesson = lessons[0].id;
      renderToolUI();
      renderLessonList();
      renderResultPanel();
      renderPowerBIControls();
      updateConsoleCaption();
      renderSourceTable();
      updateExampleText();
    });
  });

  els.navButtons.forEach(button => {
    button.addEventListener('click', () => {
      state.page = button.dataset.page;
      els.navButtons.forEach(btn => btn.classList.toggle('is-active', btn === button));
      if (state.page === 'learn') {
        els.learnPage.classList.add('is-visible');
        els.learnPage.removeAttribute('hidden');
        els.assignmentPage.setAttribute('hidden', 'hidden');
      } else {
        els.learnPage.classList.remove('is-visible');
        els.learnPage.setAttribute('hidden', 'hidden');
        els.assignmentPage.removeAttribute('hidden');
      }
    });
  });

  els.lessonList.addEventListener('click', (event) => {
    const item = event.target.closest('.lesson-item');
    if (!item) return;
    state.activeLesson = item.dataset.lessonId;
    renderLessonList();
    updateConsoleCaption();
    renderResultPanel();
    updateExampleText();
  });

  els.runCommand.addEventListener('click', () => {
    runCurrentCommand();
  });

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      runCurrentCommand();
    }
  });

  els.quickExamples.forEach(button => {
    button.addEventListener('click', () => {
      const example = button.dataset.example;
      if (state.tool === 'sql') {
        els.sqlCommand.value = SQL_EXAMPLES[example] || SQL_EXAMPLES.basic;
      } else if (state.tool === 'excel') {
        els.formulaInput.value = EXCEL_EXAMPLES[example] || EXCEL_EXAMPLES.basic;
        applyExcelFormula();
      } else if (state.tool === 'python') {
        els.pythonCommand.value = PYTHON_EXAMPLES[example] || PYTHON_EXAMPLES.filter;
      }
      showToast('Example loaded');
    });
  });

  els.chartTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
      state.chartType = button.dataset.chart;
      els.chartTypeButtons.forEach(btn => btn.classList.toggle('is-active', btn === button));
      renderPowerBIControls();
      renderResultPanel();
    });
  });

  els.chartColumn.addEventListener('change', () => renderResultPanel());
  els.categoryColumn.addEventListener('change', () => renderResultPanel());

  els.datasetUpload.addEventListener('change', async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const text = await file.text();
    let parsed;

    if (file.name.toLowerCase().endsWith('.json')) {
      parsed = parseJSONDataset(text);
      state.datasetType = 'JSON';
    } else {
      parsed = parseCSVDataset(text);
      state.datasetType = 'CSV';
    }

    if (!parsed.length) {
      showToast('No rows were detected in the uploaded file.');
      return;
    }

    state.dataset = parsed;
    state.datasetName = file.name;
    state.formulaState = {};
    resetSelectedCell();
    renderSourceTable();
    renderPowerBIControls();
    renderResultPanel();
    showToast(`${file.name} uploaded and parsed.`);
    event.target.value = '';
  });

  els.resetData.addEventListener('click', () => {
    state.dataset = structuredClone(SAMPLE_DATA);
    state.datasetName = 'sample_sales.csv';
    state.datasetType = 'CSV';
    state.formulaState = {};
    resetSelectedCell();
    renderSourceTable();
    renderPowerBIControls();
    renderResultPanel();
    showToast('Sample dataset restored.');
  });

  els.saveProject.addEventListener('click', () => {
    saveProjectState();
    showToast('Project saved locally');
  });

  els.exportCsv.addEventListener('click', () => {
    exportToCsv();
  });

  els.formFields.forEach(field => {
    field.addEventListener('input', () => {
      updateAssignmentPreview();
      saveAssignmentDraft();
      if (field.name === 'studentName' || field.name === 'rollNumber' || field.name === 'college' || field.name === 'department' || field.name === 'courseName' || field.name === 'courseCode' || field.name === 'submissionDate') {
        updatePreviewText();
      }
    });
  });

  els.templateOptionButtons.forEach(button => {
    button.addEventListener('click', () => {
      state.template = button.dataset.template;
      els.templateOptionButtons.forEach(btn => {
        const isSelected = btn === button;
        btn.classList.toggle('is-selected', isSelected);
        btn.setAttribute('aria-checked', String(isSelected));
      });
      updateAssignmentPreview();
      showToast(`Cover template: ${capitalize(state.template)}`);
    });
  });

  els.assignmentContent.addEventListener('input', () => {
    saveAssignmentDraft();
    updateWordCount();
  });

  els.editorToolbarButtons.forEach(button => {
    button.addEventListener('click', () => {
      insertAssignmentText(button.dataset.insert);
    });
  });

  els.finishAssignment.addEventListener('click', () => {
    updateAssignmentPreview();
    createPrintDocument();
  });

  els.printAssignment.addEventListener('click', () => {
    createPrintDocument();
  });

  els.stepButtons.forEach(button => {
    button.addEventListener('click', () => {
      const step = Number(button.dataset.step);
      switchStep(step);
    });
  });

  document.querySelectorAll('[data-next]').forEach(button => {
    button.addEventListener('click', () => {
      const nextStep = Number(button.dataset.next);
      switchStep(nextStep);
    });
  });

  document.querySelectorAll('[data-back]').forEach(button => {
    button.addEventListener('click', () => {
      const prevStep = Number(button.dataset.back);
      switchStep(prevStep);
    });
  });

  els.sourceTable.addEventListener('click', (event) => {
    const cell = event.target.closest('td[data-row][data-col]');
    if (!cell) return;
    const rowIndex = Number(cell.dataset.row);
    const colIndex = Number(cell.dataset.col);
    state.selectedCell = { row: rowIndex, col: colIndex };
    const label = coordinateLabel(rowIndex, colIndex);
    els.selectedCell.textContent = label;
    renderSourceTable();
  });

  els.formulaInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      applyExcelFormula();
    }
  });

  els.formulaInput.addEventListener('blur', () => {
    applyExcelFormula();
  });

  els.sqlCommand.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      runCurrentCommand();
    }
  });

  els.pythonCommand.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      runCurrentCommand();
    }
  });
}

function seedInitialData() {
  state.dataset = structuredClone(SAMPLE_DATA);
  state.datasetName = 'sample_sales.csv';
  state.datasetType = 'CSV';
  state.activeLesson = LESSONS.sql[0].id;
  state.formulaState = {};
  els.sqlCommand.value = SQL_EXAMPLES.basic;
  els.pythonCommand.value = PYTHON_EXAMPLES.filter;
  renderToolUI();
}

function renderToolUI() {
  const lessons = LESSONS[state.tool];
  const activeLesson = lessons.find(item => item.id === state.activeLesson) || lessons[0];
  state.activeLesson = activeLesson.id;

  els.toolButtons.forEach(button => {
    const isActive = button.dataset.tool === state.tool;
    button.classList.toggle('is-active', isActive);
  });

  els.toolKicker.textContent = `${TOOL_LABELS[state.tool]} FOUNDATIONS`;
  els.activeLessonTitle.textContent = activeLesson.title;

  const editorMap = {
    sql: els.sqlEditor,
    excel: els.excelEditor,
    python: els.pythonEditor,
    powerbi: els.powerbiEditor
  };

  Object.entries(editorMap).forEach(([key, editor]) => {
    editor.classList.toggle('is-hidden', key !== state.tool);
  });

  els.consoleLanguage.textContent = TOOL_LABELS[state.tool];
  updateConsoleCaption();
}

function renderLessonList() {
  const lessons = LESSONS[state.tool];
  els.lessonList.innerHTML = lessons.map((lesson, index) => {
    const isActive = state.activeLesson === lesson.id;
    return `
      <button type="button" class="lesson-item ${isActive ? 'is-active' : ''}" data-lesson-id="${lesson.id}">
        <span class="lesson-number">${index + 1}</span>
        <span class="lesson-copy"><strong>${lesson.title}</strong><small>${lesson.summary}</small></span>
      </button>
    `;
  }).join('');
  els.lessonCount = $('#lesson-count');
  if (els.lessonCount) {
    els.lessonCount.textContent = String(lessons.length);
  }
}

function renderSourceTable() {
  const rows = state.dataset;
  if (!rows.length) {
    els.sourceTable.innerHTML = '<tbody><tr><td>No data loaded.</td></tr></tbody>';
    els.columnCount.textContent = '0 columns';
    els.datasetSize.textContent = '0 rows';
    return;
  }

  const headers = Object.keys(rows[0]);
  const tableRows = rows.slice(0, 12).map((row, rowIndex) => {
    const displayRow = rowIndex + 1;
    return `
      <tr>
        ${headers.map((header, colIndex) => {
          const value = getCellDisplayValue(displayRow, colIndex, row[header]);
          const isSelected = state.tool === 'excel' && state.selectedCell.row === displayRow && state.selectedCell.col === colIndex;
          return `<td class="${isSelected ? 'cell-selected' : ''}" data-row="${displayRow}" data-col="${colIndex}" tabindex="0">${value}</td>`;
        }).join('')}
      </tr>
    `;
  }).join('');

  els.sourceTable.innerHTML = `
    <thead>
      <tr>
        ${headers.map((header, index) => `<th data-col="${index}">${header}</th>`).join('')}
      </tr>
    </thead>
    <tbody>${tableRows}</tbody>
  `;

  els.columnCount.textContent = `${headers.length} columns`;
  els.datasetSize.textContent = `${rows.length} rows`;
  els.datasetName.textContent = state.datasetName;
  els.fileType.textContent = state.datasetType;

  if (state.tool === 'excel') {
    const selectedLabel = coordinateLabel(state.selectedCell.row, state.selectedCell.col);
    els.selectedCell.textContent = selectedLabel;
    const currentValue = getCurrentCellFormulaValue();
    if (currentValue && !els.formulaInput.value) {
      els.formulaInput.value = currentValue;
    }
  }
}

function renderPowerBIControls() {
  const numericColumns = getNumericColumns();
  const categoricalColumns = getCategoricalColumns();

  if (!numericColumns.length) return;

  const measureValue = els.chartColumn.value || numericColumns[0];
  const categoryValue = els.categoryColumn.value || categoricalColumns[0] || numericColumns[0];

  els.chartColumn.innerHTML = numericColumns.map(col => `<option value="${col}">${col}</option>`).join('');
  els.categoryColumn.innerHTML = categoricalColumns.map(col => `<option value="${col}">${col}</option>`).join('');

  if (numericColumns.includes(measureValue)) {
    els.chartColumn.value = measureValue;
  }
  if (categoricalColumns.includes(categoryValue)) {
    els.categoryColumn.value = categoryValue;
  }
}

function renderResultPanel() {
  const dataset = state.dataset;
  if (!dataset.length) {
    els.resultContent.innerHTML = emptyResultMarkup();
    els.resultCount.textContent = 'Awaiting command';
    return;
  }

  if (state.tool === 'sql') {
    runSQLFromLesson();
    return;
  }

  if (state.tool === 'excel') {
    renderExcelResult();
    return;
  }

  if (state.tool === 'python') {
    runPythonFromLesson();
    return;
  }

  if (state.tool === 'powerbi') {
    renderPowerBI();
  }
}

function updateConsoleCaption() {
  const activeTitle = LESSONS[state.tool].find(item => item.id === state.activeLesson)?.title || 'Practice';
  const captions = {
    sql: 'Write a query against your active data.',
    excel: 'Use a spreadsheet-style formula on the active grid.',
    python: 'Simulate a notebook cell with Pandas-style syntax.',
    powerbi: 'Choose a measure and group field for a live visual.'
  };
  els.consoleCaption.textContent = `${captions[state.tool]} Active lesson: ${activeTitle}.`;
}

function updateExampleText() {
  if (state.tool === 'sql') {
    els.sqlCommand.value = SQL_EXAMPLES.basic;
  }
  if (state.tool === 'excel') {
    els.formulaInput.value = '=SUM(E2:E9)';
  }
  if (state.tool === 'python') {
    els.pythonCommand.value = PYTHON_EXAMPLES.filter;
  }
}

function emptyResultMarkup() {
  return `
    <div class="empty-result">
      <span>↗</span>
      <p>Your output will appear here after you run a command.</p>
    </div>
  `;
}

function runCurrentCommand() {
  if (state.tool === 'sql') {
    runSQLQuery(els.sqlCommand.value || SQL_EXAMPLES.basic);
    return;
  }
  if (state.tool === 'excel') {
    applyExcelFormula();
    return;
  }
  if (state.tool === 'python') {
    runPythonCommand(els.pythonCommand.value || PYTHON_EXAMPLES.filter);
    return;
  }
  if (state.tool === 'powerbi') {
    renderPowerBI();
  }
}

function runSQLFromLesson() {
  const exampleMap = {
    'sql-select': "SELECT region, product, sales FROM sales WHERE sales > 300 ORDER BY sales DESC",
    'sql-filter': "SELECT product, region, sales FROM sales WHERE region = 'North' AND sales > 200",
    'sql-group': "SELECT region, SUM(sales) AS total_sales FROM sales GROUP BY region ORDER BY total_sales DESC",
    'sql-join': "SELECT a.region, a.product, b.customer FROM sales a JOIN sales b ON a.order_id = b.order_id WHERE a.sales > 350"
  };

  const query = exampleMap[state.activeLesson] || exampleMap['sql-select'];
  els.sqlCommand.value = query;
  runSQLQuery(query);
}

function runPythonFromLesson() {
  const exampleMap = {
    'python-filter': 'df.filter(region == "North")',
    'python-group': 'df.groupby("region")["sales"].sum()',
    'python-sort': 'df.sort_values("sales", descending=True)'
  };
  const command = exampleMap[state.activeLesson] || exampleMap['python-filter'];
  els.pythonCommand.value = command;
  runPythonCommand(command);
}

function runSQLQuery(rawQuery) {
  const query = rawQuery.trim().replace(/;/g, '');
  if (!query) {
    els.runStatus.textContent = 'No command entered';
    els.runStatus.classList.add('error');
    return;
  }

  try {
    const result = executeSQL(query, state.dataset);
    const rows = result.rows || [];
    const headers = result.headers || [];
    if (!rows.length) {
      els.resultContent.innerHTML = `<div class="empty-result"><span>!</span><p>No rows matched the query.</p></div>`;
      els.resultCount.textContent = '0 rows';
      els.runStatus.textContent = 'Query returned no rows';
      els.runStatus.classList.remove('error');
      return;
    }

    state.currentResult = { type: 'table', headers, rows };
    els.resultContent.innerHTML = tableMarkup(headers, rows);
    els.resultCount.textContent = `${rows.length} rows`;
    els.runStatus.textContent = 'SQL query executed';
    els.runStatus.classList.remove('error');
  } catch (error) {
    els.resultContent.innerHTML = `<div class="empty-result"><span>!</span><p>${escapeHtml(error.message)}</p></div>`;
    els.resultCount.textContent = 'Error';
    els.runStatus.textContent = 'Query failed';
    els.runStatus.classList.add('error');
  }
}

function executeSQL(query, rows) {
  const normalized = query.replace(/\s+/g, ' ').trim();
  const selectMatch = normalized.match(/SELECT\s+(.+?)\s+FROM\s+/i);
  if (!selectMatch) {
    throw new Error('SQL syntax should match SELECT ... FROM ...');
  }

  let selectList = selectMatch[1].trim();
  const whereMatch = normalized.match(/WHERE\s+(.+?)(?=\s+GROUP BY|\s+ORDER BY|\s+LIMIT|$)/i);
  const groupByMatch = normalized.match(/GROUP BY\s+([A-Za-z_ ,]+)/i);
  const orderByMatch = normalized.match(/ORDER BY\s+([A-Za-z_ ,]+)(?:\s+DESC|ASC)?/i);
  const joinMatch = normalized.match(/JOIN\s+([A-Za-z_]+)\s+ON\s+([A-Za-z_.]+)\s*=\s*([A-Za-z_.]+)/i);

  let workingRows = rows.map((row) => ({ ...row }));

  if (joinMatch) {
    const joinTable = joinMatch[1].toLowerCase();
    if (joinTable === 'sales') {
      const joined = [];
      workingRows.forEach((row) => {
        const match = rows.find((candidate) => candidate.order_id === row.order_id && candidate !== row);
        if (match) joined.push({ ...row, ...match });
      });
      if (joined.length) workingRows = joined;
    }
  }

  if (whereMatch) {
    const condition = whereMatch[1].trim();
    workingRows = workingRows.filter((row) => evaluateCondition(row, condition));
  }

  let headers = [];
  let finalRows = [];

  if (groupByMatch) {
    const groupKey = groupByMatch[1].split(',')[0].trim();
    const groupMap = new Map();
    workingRows.forEach((row) => {
      const key = String(row[groupKey] ?? 'Unknown');
      if (!groupMap.has(key)) {
        groupMap.set(key, { [groupKey]: key, total_sales: 0, total_quantity: 0, count: 0 });
      }
      const bucket = groupMap.get(key);
      bucket.total_sales += Number(row.sales || 0);
      bucket.total_quantity += Number(row.quantity || 0);
      bucket.count += 1;
    });

    const groupRows = Array.from(groupMap.values());
    const selectedFields = selectList.split(',').map((item) => item.trim());

    finalRows = groupRows.map((entry) => {
      const rowObject = {};
      selectedFields.forEach((field) => {
        const cleanField = field.replace(/\s+AS\s+/i, ' ');
        if (/SUM\(/i.test(cleanField)) {
          const target = cleanField.match(/SUM\(([^)]+)\)/i)?.[1]?.trim();
          rowObject[cleanField.replace(/.*\(([^)]+)\).*/i, '$1')] = Number(entry.total_sales || 0).toFixed(2);
          if (target && target === 'sales') rowObject.total_sales = Number(entry.total_sales || 0).toFixed(2);
        } else if (/COUNT\(/i.test(cleanField)) {
          rowObject.count = entry.count;
        } else if (/AVG\(/i.test(cleanField)) {
          const target = cleanField.match(/AVG\(([^)]+)\)/i)?.[1]?.trim();
          rowObject[target || 'average_value'] = (entry.total_sales / Math.max(entry.count, 1)).toFixed(2);
        } else {
          rowObject[cleanField] = entry[cleanField] ?? entry[groupKey];
        }
      });
      return rowObject;
    });

    headers = dedupeHeaders(Object.keys(finalRows[0] || {}));
  } else if (selectList === '*') {
    finalRows = workingRows;
    headers = Object.keys(workingRows[0] || {});
  } else {
    const selectedFields = selectList.split(',').map((item) => item.trim());
    headers = selectedFields.map((field) => {
      const alias = field.match(/\s+AS\s+([A-Za-z_]+)/i)?.[1];
      return alias || field.replace(/\s+/g, ' ').split(' ').slice(-1)[0].replace(/[()]/g, '');
    });

    finalRows = workingRows.map((row) => {
      const item = {};
      selectedFields.forEach((field) => {
        const alias = field.match(/\s+AS\s+([A-Za-z_]+)/i)?.[1];
        const fieldName = field.replace(/\s+AS\s+[A-Za-z_]+/i, '').trim();
        if (/SUM\(/i.test(fieldName) || /COUNT\(/i.test(fieldName) || /AVG\(/i.test(fieldName) || /MIN\(/i.test(fieldName) || /MAX\(/i.test(fieldName)) {
          const target = fieldName.match(/\(([^)]+)\)/)?.[1]?.trim();
          const agg = fieldName.match(/^([A-Za-z]+)/)?.[1]?.toUpperCase();
          const values = workingRows.map((entry) => Number(entry[target] || 0));
          let aggregateValue = 0;
          if (agg === 'SUM') aggregateValue = values.reduce((sum, value) => sum + value, 0);
          if (agg === 'COUNT') aggregateValue = values.length;
          if (agg === 'AVG') aggregateValue = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
          item[alias || fieldName] = agg === 'COUNT' ? aggregateValue : Number(aggregateValue).toFixed(2);
        } else {
          const outputKey = alias || fieldName;
          item[outputKey] = row[fieldName] ?? row[outputKey];
        }
      });
      return item;
    });
  }

  if (orderByMatch) {
    const orderField = orderByMatch[1].trim().split(' ').pop();
    const descending = /DESC/i.test(orderByMatch[0]);
    finalRows.sort((a, b) => {
      const left = Number(a[orderField] ?? 0);
      const right = Number(b[orderField] ?? 0);
      return descending ? right - left : left - right;
    });
  }

  return { headers: dedupeHeaders(headers), rows: finalRows.slice(0, 12) };
}

function evaluateCondition(row, condition) {
  const clause = condition.replace(/\s+/g, ' ').trim();
  if (!clause) return true;

  const segments = clause.split(/\s+(AND|OR)\s+/i);
  if (segments.length === 1) {
    return evaluateSingleCondition(row, clause);
  }

  let result = evaluateSingleCondition(row, segments[0]);
  for (let i = 1; i < segments.length; i += 2) {
    const operator = segments[i].toUpperCase();
    const nextPart = evaluateSingleCondition(row, segments[i + 1]);
    result = operator === 'AND' ? result && nextPart : result || nextPart;
  }
  return result;
}

function evaluateSingleCondition(row, clause) {
  const comparison = clause.match(/([A-Za-z_]+)\s*(<=|>=|!=|=|>|<)\s*('?[^\s]+?'?|\d+(?:\.\d+)?)$/i);
  if (!comparison) return true;

  const [, key, operator, rawValue] = comparison;
  const left = row[key];
  const rightValue = rawValue.replace(/['"]/g, '').trim();
  const rightNumber = Number(rightValue);
  const leftNumber = Number(left);

  switch (operator) {
    case '=':
      return String(left) === String(rightValue);
    case '>':
      return leftNumber > rightNumber || String(left) > rightValue;
    case '<':
      return leftNumber < rightNumber || String(left) < rightValue;
    case '>=':
      return leftNumber >= rightNumber || String(left) >= rightValue;
    case '<=':
      return leftNumber <= rightNumber || String(left) <= rightValue;
    case '!=':
      return String(left) !== String(rightValue);
    default:
      return true;
  }
}

function dedupeHeaders(headers) {
  const seen = new Set();
  return headers.filter((header) => {
    const key = String(header).trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function applyExcelFormula() {
  const formula = (els.formulaInput.value || '').trim();
  if (!formula) return;

  const selected = state.selectedCell;
  const cellKey = `${selected.row}:${selected.col}`;
  state.formulaState[cellKey] = formula;

  const resultValue = evaluateFormula(formula, selected.row, selected.col);
  const currentDisplay = getCurrentCellDisplayValue();
  if (resultValue !== null) {
    state.dataset[selected.row - 1][Object.keys(state.dataset[selected.row - 1])[selected.col]] = resultValue;
  }

  renderSourceTable();
  renderResultPanel();
  els.runStatus.textContent = 'Excel formula applied';
  els.runStatus.classList.remove('error');
  if (!resultValue && currentDisplay === '' && formula.startsWith('=')) {
    els.resultContent.innerHTML = `<div class="empty-result"><span>!</span><p>Check the formula; it returned no valid value.</p></div>`;
  }
}

function evaluateFormula(formula, rowIndex, colIndex) {
  const input = formula.trim();
  if (!input.startsWith('=')) return null;

  const converted = input.slice(1).trim();
  if (converted.toUpperCase().startsWith('SUM(')) {
    const range = converted.match(/SUM\(([^)]+)\)/i)?.[1];
    if (!range) return null;
    const values = getRangeValues(range);
    return values.reduce((sum, value) => sum + Number(value || 0), 0);
  }

  if (converted.toUpperCase().startsWith('AVERAGE(')) {
    const range = converted.match(/AVERAGE\(([^)]+)\)/i)?.[1];
    if (!range) return null;
    const values = getRangeValues(range).filter((value) => value !== null && value !== undefined && value !== '');
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + Number(value || 0), 0) / values.length;
  }

  if (converted.toUpperCase().startsWith('VLOOKUP(')) {
    const args = converted.match(/VLOOKUP\((.+)\)/i)?.[1];
    if (!args) return null;
    const parts = splitFormulaArguments(args);
    const lookupValue = parts[0];
    const range = parts[1];
    const index = Number(parts[2] || 1) - 1;
    const normalized = range.replace(/\s+/g, '').split(':');
    const [startCell, endCell] = normalized;
    const firstRow = parseCell(startCell).row;
    const lastRow = parseCell(endCell).row;
    const rangeValues = [];
    for (let currentRow = firstRow; currentRow <= lastRow; currentRow += 1) {
      const cellValue = getCellValueByReference(currentRow, parseCell(startCell).col);
      rangeValues.push({ lookup: cellValue, row: currentRow });
    }
    const result = rangeValues.find((item) => String(item.lookup) === String(lookupValue.replace(/['"]/g, '')));
    if (!result) return null;
    const targetRow = result.row;
    const targetCol = parseCell(startCell).col + index;
    const cellVal = getCellValueByReference(targetRow, targetCol);
    return cellVal;
  }

  if (converted.toUpperCase().startsWith('IF(')) {
    const args = converted.match(/IF\((.+)\)/i)?.[1];
    if (!args) return null;
    const parts = splitFormulaArguments(args);
    const condition = parts[0];
    const trueValue = parseLiteral(parts[1]);
    const falseValue = parseLiteral(parts[2] || '0');
    const match = condition.match(/([A-Z]+\d+)\s*(>=|<=|!=|=|>|<)\s*(\d+(?:\.\d+)?|"[^"]+"|'[^']+')/i);
    if (!match) return falseValue;
    const [, cellRef, operator, rawValue] = match;
    const cellCoord = parseCell(cellRef);
    const left = Number(getCellValueByReference(cellCoord.row, cellCoord.col) || 0);
    const right = Number(rawValue.replace(/['"]/g, ''));
    let conditionResult = false;
    switch (operator) {
      case '>':
        conditionResult = left > right; break;
      case '<':
        conditionResult = left < right; break;
      case '>=':
        conditionResult = left >= right; break;
      case '<=':
        conditionResult = left <= right; break;
      case '=':
        conditionResult = left === right; break;
      case '!=':
        conditionResult = left !== right; break;
      default:
        conditionResult = false;
    }
    return conditionResult ? trueValue : falseValue;
  }

  return null;
}

function splitFormulaArguments(rawArgs) {
  const parts = [];
  let current = '';
  let quote = null;
  for (let i = 0; i < rawArgs.length; i += 1) {
    const char = rawArgs[i];
    if ((char === '"' || char === "'") && (quote === null || quote === char)) {
      quote = quote === null ? char : null;
      current += char;
      continue;
    }
    if (char === ',' && quote === null) {
      parts.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function parseLiteral(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return isNaN(Number(trimmed)) ? trimmed : Number(trimmed);
}

function getCurrentCellDisplayValue() {
  const row = state.dataset[state.selectedCell.row - 1];
  if (!row) return '';
  const columns = Object.keys(row);
  if (!columns[state.selectedCell.col]) return '';
  return row[columns[state.selectedCell.col]];
}

function getRangeValues(range) {
  const cleanRange = range.replace(/\s+/g, '').trim();
  if (!cleanRange.includes(':')) {
    const ref = parseCell(cleanRange);
    return [getCellValueByReference(ref.row, ref.col)];
  }

  const [start, end] = cleanRange.split(':');
  const startCell = parseCell(start);
  const endCell = parseCell(end);
  const values = [];
  for (let row = startCell.row; row <= endCell.row; row += 1) {
    for (let col = startCell.col; col <= endCell.col; col += 1) {
      values.push(getCellValueByReference(row, col));
    }
  }
  return values;
}

function parseCell(ref) {
  const match = ref.match(/([A-Z]+)(\d+)/i);
  if (!match) return { row: 1, col: 0 };
  const colLetters = match[1].toUpperCase();
  let col = 0;
  for (let i = 0; i < colLetters.length; i += 1) {
    col = col * 26 + (colLetters.charCodeAt(i) - 64);
  }
  col -= 1;
  return { row: Number(match[2]), col };
}

function coordinateLabel(rowIndex, colIndex) {
  const columnLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const colToken = columnLetters[colIndex] || `C${colIndex + 1}`;
  return `${colToken}${rowIndex}`;
}

function getCellValueByReference(row, col) {
  const lastRowIndex = state.dataset.length;
  if (row < 1 || row > lastRowIndex) return null;
  const keys = Object.keys(state.dataset[row - 1]);
  const key = keys[col];
  if (!key) return null;
  return state.dataset[row - 1][key];
}

function renderExcelResult() {
  const headers = Object.keys(state.dataset[0] || {});
  const rows = state.dataset.slice(0, 12);
  const activeCell = coordinateLabel(state.selectedCell.row, state.selectedCell.col);
  const result = {
    headers,
    rows,
    formula: els.formulaInput.value || 'No formula' 
  };
  els.resultContent.innerHTML = `
    <div class="metric-grid">
      <div class="metric-card"><span>SELECTED CELL</span><strong>${activeCell}</strong><small>Live formula</small></div>
      <div class="metric-card"><span>FORMULA</span><strong>${escapeHtml(result.formula)}</strong><small>Current state</small></div>
    </div>
    ${tableMarkup(headers, rows)}
  `;
  els.resultCount.textContent = `${rows.length} visible rows`;
}

function runPythonCommand(rawCommand) {
  const command = rawCommand.trim();
  if (!command) {
    els.runStatus.textContent = 'No Python command entered';
    els.runStatus.classList.add('error');
    return;
  }

  try {
    const result = executePython(command, state.dataset);
    state.currentResult = { type: 'table', headers: result.headers, rows: result.rows };
    els.resultContent.innerHTML = tableMarkup(result.headers, result.rows);
    els.resultCount.textContent = `${result.rows.length} rows`;
    els.runStatus.textContent = 'Python notebook executed';
    els.runStatus.classList.remove('error');
  } catch (error) {
    els.resultContent.innerHTML = `<div class="empty-result"><span>!</span><p>${escapeHtml(error.message)}</p></div>`;
    els.resultCount.textContent = 'Error';
    els.runStatus.textContent = 'Python command failed';
    els.runStatus.classList.add('error');
  }
}

function executePython(command, dataset) {
  const df = dataset.map((row) => ({ ...row }));

  if (command.includes('.filter(')) {
    const condition = command.match(/\.filter\((.+)\)/)?.[1] || '';
    const filtered = df.filter((row) => evaluatePythonCondition(row, condition));
    return { headers: Object.keys(filtered[0] || df[0]), rows: filtered.slice(0, 12) };
  }

  if (command.includes('.groupby(')) {
    const groupFieldMatch = command.match(/groupby\(["']([^"']+)["']\)/i);
    const groupField = groupFieldMatch ? groupFieldMatch[1] : 'region';
    const aggregateKey = command.includes('"sales"') || command.includes("'sales'") ? 'sales' : 'quantity';
    const bucket = {};
    df.forEach((row) => {
      const key = row[groupField];
      if (!bucket[key]) bucket[key] = 0;
      bucket[key] += Number(row[aggregateKey] || 0);
    });
    const rows = Object.entries(bucket).map(([label, value]) => ({ [groupField]: label, [`${aggregateKey}_total`]: Number(value).toFixed(2) }));
    return { headers: [groupField, `${aggregateKey}_total`], rows: rows.slice(0, 12) };
  }

  if (command.includes('.sort_values(')) {
    const match = command.match(/sort_values\(["']([^"']+)["']\s*,\s*descending\s*=\s*(true|false)\s*\)/i);
    const field = match ? match[1] : 'sales';
    const descending = Boolean(match && match[2].toLowerCase() === 'true');
    const sorted = [...df].sort((a, b) => {
      const left = Number(a[field] || 0);
      const right = Number(b[field] || 0);
      return descending ? right - left : left - right;
    });
    return { headers: Object.keys(sorted[0] || df[0]), rows: sorted.slice(0, 12) };
  }

  if (command.includes('.select(')) {
    const selectors = command.match(/\.select\((.+)\)/)?.[1] || '';
    const fields = selectors.split(',').map((token) => token.replace(/["'()\s]/g, '').trim()).filter(Boolean);
    const rows = df.map((row) => {
      const selected = {};
      fields.forEach((field) => selected[field] = row[field]);
      return selected;
    });
    return { headers: fields, rows: rows.slice(0, 12) };
  }

  if (command.includes('df.')) {
    return { headers: Object.keys(df[0] || {}), rows: df.slice(0, 12) };
  }

  return { headers: Object.keys(df[0] || {}), rows: df.slice(0, 12) };
}

function evaluatePythonCondition(row, condition) {
  const clean = condition.replace(/\s+/g, ' ').trim();
  if (!clean) return true;
  const match = clean.match(/([A-Za-z_]+)\s*(==|!=|>=|<=|>|<)\s*(.+)$/);
  if (!match) return true;
  const [, key, operator, rawValue] = match;
  const left = row[key];
  const right = rawValue.replace(/['"]/g, '').trim();

  switch (operator) {
    case '==': return String(left) === right;
    case '!=': return String(left) !== right;
    case '>': return Number(left) > Number(right);
    case '<': return Number(left) < Number(right);
    case '>=': return Number(left) >= Number(right);
    case '<=': return Number(left) <= Number(right);
    default: return true;
  }
}

function renderPowerBI() {
  const numericColumns = getNumericColumns();
  const categoryField = els.categoryColumn.value || getCategoricalColumns()[0] || 'region';
  const measureField = els.chartColumn.value || numericColumns[0] || 'sales';

  const grouped = {};
  state.dataset.forEach((row) => {
    const key = String(row[categoryField] ?? 'Unknown');
    if (!grouped[key]) grouped[key] = 0;
    grouped[key] += Number(row[measureField] || 0);
  });

  const entries = Object.entries(grouped).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, value]) => sum + Number(value), 0);
  const kpis = [
    { label: 'Total', value: currencyFormat(entries.reduce((sum, [, value]) => sum + Number(value), 0)), short: 'Revenue' },
    { label: 'Avg', value: currencyFormat(entries.reduce((sum, [, value]) => sum + Number(value), 0) / (entries.length || 1)), short: 'Per group' },
    { label: 'Top group', value: entries[0]?.[0] || 'N/A', short: 'Best segment' },
    { label: 'Records', value: String(state.dataset.length), short: 'Rows' }
  ];

  const chartMarkup = {
    bar: buildBarChart(entries),
    donut: buildDonutChart(entries),
    table: buildDataTable(entries)
  }[state.chartType] || buildBarChart(entries);

  els.resultContent.innerHTML = `
    <div class="metric-grid">
      ${kpis.map(metric => `
        <div class="metric-card">
          <span>${metric.label}</span>
          <strong>${metric.value}</strong>
          <small>${metric.short}</small>
        </div>
      `).join('')}
    </div>
    ${chartMarkup}
  `;
  els.resultCount.textContent = `${entries.length} groups`;
  els.runStatus.textContent = 'Power BI summary refreshed';
  els.runStatus.classList.remove('error');
}

function buildBarChart(entries) {
  const max = Math.max(...entries.map(([, value]) => Number(value || 0)), 1);
  return `
    <div class="chart-heading">${escapeHtml(els.categoryColumn.value || 'Category')} by ${escapeHtml(els.chartColumn.value || 'sales')}</div>
    <div class="bar-chart">
      ${entries.map(([label, value]) => `
        <div class="bar-item">
          <span class="bar-label">${escapeHtml(label)}</span>
          <span class="bar-track"><span class="bar-fill" style="width:${(Number(value) / max) * 100}%"></span></span>
          <span class="bar-value">${currencyFormat(value)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function buildDonutChart(entries) {
  const total = entries.reduce((sum, [, value]) => sum + Number(value || 0), 0) || 1;
  const segments = entries.map(([label, value], index) => {
    const colors = ['#2e694c', '#e6bd3c', '#dc755e', '#8ab3bf', '#7ea8dd'];
    const start = entries.slice(0, index).reduce((sum, [, innerValue]) => sum + (Number(innerValue || 0) / total) * 100, 0);
    return `${colors[index % colors.length]} ${start}% ${start + ((Number(value || 0) / total) * 100)}%`;
  }).join(', ');

  return `
    <div class="donut-layout">
      <div class="donut-chart" style="background: conic-gradient(${segments});"></div>
      <div class="donut-legend">
        ${entries.map(([label, value], index) => `
          <div class="legend-item"><span class="legend-swatch" style="background:${['#2e694c', '#e6bd3c', '#dc755e', '#8ab3bf', '#7ea8dd'][index % 5]};"></span>${escapeHtml(label)} · ${currencyFormat(value)}</div>
        `).join('')}
      </div>
    </div>
  `;
}

function buildDataTable(entries) {
  return `
    <div class="result-table-wrap">
      <table class="result-table">
        <thead>
          <tr>
            <th>${escapeHtml(els.categoryColumn.value || 'Category')}</th>
            <th>${escapeHtml(els.chartColumn.value || 'Value')}</th>
          </tr>
        </thead>
        <tbody>
          ${entries.map(([label, value]) => `<tr><td>${escapeHtml(label)}</td><td>${currencyFormat(value)}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function tableMarkup(headers, rows) {
  const safeHeaders = dedupeHeaders(headers);
  const renderRows = rows.map((row) => {
    return `<tr>${safeHeaders.map((header) => `<td>${escapeHtml(String(row[header] ?? ''))}</td>`).join('')}</tr>`;
  }).join('');

  return `
    <div class="result-table-wrap">
      <table class="result-table">
        <thead><tr>${safeHeaders.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr></thead>
        <tbody>${renderRows}</tbody>
      </table>
    </div>
  `;
}

function getNumericColumns() {
  if (!state.dataset.length) return [];
  return Object.keys(state.dataset[0]).filter((key) => state.dataset.some((row) => !Number.isNaN(Number(row[key]))));
}

function getCategoricalColumns() {
  if (!state.dataset.length) return [];
  return Object.keys(state.dataset[0]).filter((key) => state.dataset.some((row) => Number.isNaN(Number(row[key]))));
}

function currencyFormat(value) {
  const num = Number(value) || 0;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
}

function sortRows(rows) {
  return [...rows].sort((a, b) => {
    const left = Number(a.sales || 0);
    const right = Number(b.sales || 0);
    return right - left;
  });
}

function parseCSVDataset(text) {
  const rows = text.trim().split(/\r?\n/);
  if (!rows.length) return [];
  const [headerLine, ...dataLines] = rows;
  const headers = splitCSVLine(headerLine);
  return dataLines.filter(Boolean).map((line) => {
    const values = splitCSVLine(line);
    const item = {};
    headers.forEach((header, index) => {
      const raw = values[index] ?? '';
      const trimmed = raw.trim();
      item[header] = Number.isFinite(Number(trimmed)) ? Number(trimmed) : trimmed;
    });
    return item;
  });
}

function splitCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);
  return values.map((value) => value.trim());
}

function parseJSONDataset(text) {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.data)) return parsed.data;
    if (parsed && typeof parsed === 'object') return [parsed];
    return [];
  } catch (error) {
    showToast('JSON import failed. Please check the file format.');
    return [];
  }
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    els.toast.classList.remove('is-visible');
  }, 1800);
}

function resetSelectedCell() {
  state.selectedCell = { row: 1, col: 0 };
  els.selectedCell.textContent = 'A1';
  els.formulaInput.value = '=SUM(E2:E9)';
}

function getCellDisplayValue(rowIndex, colIndex, currentValue) {
  if (state.tool !== 'excel') return currentValue;
  const key = `${rowIndex}:${colIndex}`;
  const formula = state.formulaState[key];
  if (formula) {
    const result = evaluateFormula(formula, rowIndex, colIndex);
    return result ?? currentValue;
  }
  return currentValue;
}

function getCurrentCellFormulaValue() {
  const key = `${state.selectedCell.row}:${state.selectedCell.col}`;
  return state.formulaState[key] || '';
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const SQL_EXAMPLES = {
  basic: "SELECT region, product, sales FROM sales WHERE sales > 250 ORDER BY sales DESC",
  filter: "SELECT product, region, sales FROM sales WHERE region = 'North' AND sales > 300",
  group: "SELECT region, SUM(sales) AS total_sales FROM sales GROUP BY region ORDER BY total_sales DESC"
};

const EXCEL_EXAMPLES = {
  basic: '=SUM(E2:E9)',
  average: '=AVERAGE(E2:E9)',
  lookup: "=VLOOKUP(A2,A1:F9,3,FALSE)",
  if: '=IF(E2>500,"High","Standard")'
};

const PYTHON_EXAMPLES = {
  filter: 'df.filter(region == "North")',
  group: 'df.groupby("region")["sales"].sum()',
  sort: 'df.sort_values("sales", descending=True)'
};

function saveProjectState() {
  const payload = {
    dataset: state.dataset,
    datasetName: state.datasetName,
    datasetType: state.datasetType,
    tool: state.tool,
    activeLesson: state.activeLesson,
    chartType: state.chartType,
    selectedCell: state.selectedCell,
    template: state.template,
    assignmentText: els.assignmentContent ? els.assignmentContent.value : '',
    assignmentForm: els.assignForm ? Object.fromEntries(new FormData(els.assignForm).entries()) : {},
    savedAt: Date.now()
  };
  localStorage.setItem('sunnystudy-project', JSON.stringify(payload));
}

function restoreProjectState() {
  try {
    const raw = localStorage.getItem('sunnystudy-project');
    if (!raw) return;
    const payload = JSON.parse(raw);
    if (!payload) return;

    if (Array.isArray(payload.dataset) && payload.dataset.length) {
      state.dataset = payload.dataset;
    }
    if (payload.datasetName) state.datasetName = payload.datasetName;
    if (payload.datasetType) state.datasetType = payload.datasetType;
    if (payload.tool) state.tool = payload.tool;
    if (payload.activeLesson) state.activeLesson = payload.activeLesson;
    if (payload.chartType) state.chartType = payload.chartType;
    if (payload.selectedCell) state.selectedCell = payload.selectedCell;
    if (payload.template) state.template = payload.template;

    if (els.assignForm && payload.assignmentForm) {
      Object.entries(payload.assignmentForm).forEach(([key, value]) => {
        const field = els.assignForm.elements.namedItem(key);
        if (field) field.value = value;
      });
    }

    if (els.assignmentContent && payload.assignmentText) {
      els.assignmentContent.value = payload.assignmentText;
    }

    const btn = document.querySelector(`.chart-type[data-chart="${state.chartType}"]`);
    if (btn) {
      els.chartTypeButtons.forEach((button) => button.classList.toggle('is-active', button === btn));
    }
    renderToolUI();
    renderLessonList();
    renderSourceTable();
    renderPowerBIControls();
    renderResultPanel();
    updateAssignmentPreview();
    updateWordCount();
  } catch (error) {
    console.warn('Unable to restore saved project.', error);
  }
}

function exportToCsv() {
  if (!state.dataset.length) {
    showToast('No dataset to export.');
    return;
  }

  const headers = Object.keys(state.dataset[0]);
  const rows = state.dataset.map((row) => headers.map((header) => {
    const value = row[header];
    const text = value == null ? '' : String(value);
    return `"${text.replace(/"/g, '""')}"`;
  }).join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${state.datasetName.replace(/\.[^/.]+$/, '') || 'dataset'}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast('CSV downloaded');
}

function createPrintDocument() {
  const printContainer = document.getElementById('print-document') || document.createElement('div');
  printContainer.id = 'print-document';
  printContainer.className = 'print-document';

  const formData = new FormData(els.assignForm);
  const values = Object.fromEntries(formData.entries());
  const studentName = values.studentName || 'Student name';
  const rollNumber = values.rollNumber || '—';
  const college = values.college || 'Your university / college';
  const department = values.department || 'Department';
  const courseName = values.courseName || 'Course name';
  const courseCode = values.courseCode || 'COURSE CODE';
  const submissionDate = values.submissionDate ? new Date(values.submissionDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Submission date';
  const assignmentText = (els.assignmentContent.value || '').trim();
  const template = state.template;
  const bodyHtml = assignmentText
    ? assignmentText
        .split(/\n{2,}/)
        .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
        .join('')
    : '<p>No assignment content has been entered yet.</p>';

  printContainer.innerHTML = `
    <section class="print-cover template-${template}">
      <div class="print-brand">SUNNYSTUDY</div>
      <div class="print-cover-main">
        <div class="print-cover-title">ACADEMIC SUBMISSION</div>
        <div class="print-college">${escapeHtml(college)}</div>
        <div class="print-course">${escapeHtml(courseName)} • ${escapeHtml(courseCode)}</div>
        <div class="print-cover-details">
          <p><span>Submitted By</span>${escapeHtml(studentName)}<br><small>Roll no. ${escapeHtml(rollNumber)}</small></p>
          <p><span>Department</span>${escapeHtml(department)}</p>
          <p><span>Submission Date</span>${escapeHtml(submissionDate)}</p>
          <p><span>Course</span>${escapeHtml(courseName)}</p>
        </div>
      </div>
      <div class="print-brand print-bottom">Learning in your own way</div>
    </section>
    <section class="print-body">${bodyHtml}</section>
  `;

  document.body.classList.add('printing-assignment');
  document.body.appendChild(printContainer);

  window.setTimeout(() => {
    window.print();
    window.setTimeout(() => {
      document.body.classList.remove('printing-assignment');
      const existingPrintDocument = document.getElementById('print-document');
      if (existingPrintDocument) existingPrintDocument.remove();
    }, 500);
  }, 50);
}

function updateAssignmentPreview() {
  const formData = new FormData(els.assignForm);
  const values = Object.fromEntries(formData.entries());

  const previewMap = {
    studentName: 'Student name',
    rollNumber: '—',
    college: 'YOUR UNIVERSITY / COLLEGE',
    department: 'Department',
    courseName: 'Course name',
    courseCode: 'COURSE CODE',
    submissionDate: 'Date'
  };

  Object.entries(previewMap).forEach(([key, fallback]) => {
    const element = document.querySelector(`[data-preview="${key}"]`);
    if (!element) return;
    const value = values[key] || fallback;
    element.textContent = key === 'submissionDate' && value ? new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : value;
  });

  els.paperPreview.className = `paper-preview template-${state.template}`;
}

function updatePreviewText() {
  updateAssignmentPreview();
}

function switchStep(step) {
  els.formSteps.forEach((panel) => {
    const isActive = Number(panel.dataset.formStep) === step;
    panel.hidden = !isActive;
    panel.classList.toggle('is-active', isActive);
  });

  els.stepButtons.forEach((button) => {
    const stepNumber = Number(button.dataset.step);
    const isCurrent = stepNumber === step;
    const isComplete = stepNumber < step;
    button.classList.toggle('is-active', isCurrent);
    button.classList.toggle('is-complete', isComplete);
  });
}

function insertAssignmentText(kind) {
  const textarea = els.assignmentContent;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const insertions = {
    heading: '\n## Section heading\n',
    bold: '**bold text**',
    list: '\n1. First point\n2. Second point\n'
  };
  const insert = insertions[kind] || '';
  textarea.value = value.slice(0, start) + insert + value.slice(end);
  textarea.focus();
  textarea.setSelectionRange(start + insert.length, start + insert.length);
  updateWordCount();
  saveAssignmentDraft();
}

function updateWordCount() {
  const value = els.assignmentContent.value.trim();
  const count = value ? value.split(/\s+/).length : 0;
  els.wordCount.textContent = `${count} words`;
}

function saveAssignmentDraft() {
  const payload = {
    form: Object.fromEntries(new FormData(els.assignForm).entries()),
    template: state.template,
    text: els.assignmentContent.value,
    tool: state.tool,
    time: Date.now()
  };
  localStorage.setItem('sunnystudy-assignment', JSON.stringify(payload));
}

function restoreAssignmentDraft() {
  try {
    const raw = localStorage.getItem('sunnystudy-assignment');
    if (!raw) return;
    const payload = JSON.parse(raw);
    if (!payload || !payload.form) return;
    Object.entries(payload.form).forEach(([key, value]) => {
      const input = els.assignForm.elements.namedItem(key);
      if (input) input.value = value;
    });
    state.template = payload.template || 'classic';
    els.assignmentContent.value = payload.text || '';
    if (payload.tool) state.tool = payload.tool;
    els.templateOptionButtons.forEach((button) => {
      const selected = button.dataset.template === state.template;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-checked', String(selected));
    });
    updateWordCount();
  } catch (error) {
    console.warn('Unable to restore saved draft.', error);
  }
}

function populateFormFromState() {
  if (!els.assignForm) return;
  document.querySelectorAll('#assignment-form input').forEach((field) => {
    if (field.name === 'studentName') {
      field.value = 'Aanya Sharma';
    }
    if (field.name === 'rollNumber') field.value = '24CS108';
    if (field.name === 'college') field.value = 'Northview Institute of Technology';
    if (field.name === 'department') field.value = 'Computer Science';
    if (field.name === 'courseName') field.value = 'Data Analytics';
    if (field.name === 'courseCode') field.value = 'CS204';
    if (field.name === 'submissionDate') field.value = '2026-11-20';
  });
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

document.addEventListener('DOMContentLoaded', init);
