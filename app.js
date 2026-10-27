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

const DATA_CERTIFICATIONS = {
  analyst: {
    title: 'Data Analyst Certification',
    courses: [
      {
        title: 'Excel for Analysts',
        challenges: [
          makeChallenge('a1', 'Sum North region revenue', 'excel', 'Use `SUMIF` to total revenue for rows whose region is North.', '=SUMIF(?, ?, ?)', ['`SUMIF` takes a criteria range, a criterion, and a sum range.'], '=SUMIF(D2:D13,"North",B2:B13)', [
            checkFormula('Should use SUMIF', /SUMIF/i), checkNumber('Should total North revenue', (data) => totalWhere(data, 'region', 'North', 'revenue'))
          ]),
          makeProject('a2', 'Project: Regional revenue workbook', 'excel', 'Build a formula that totals all revenue in the active worksheet.', '', [], null, [
            checkFormula('Should use a real spreadsheet formula', /^\s*=/), checkNumber('Should match the dataset revenue total', (data) => total(data, 'revenue'))
          ])
        ]
      },
      {
        title: 'SQL Foundations',
        challenges: [
          makeChallenge('a3', 'Filter North region rows', 'sql', 'Return only rows where the region is North.', 'SELECT * FROM data;', ['Start with `SELECT * FROM data`, then add a `WHERE` condition.'], "SELECT * FROM data WHERE region = 'North';", [
            checkSql('Should filter with WHERE', /where/i), checkRows('Every returned row should be North', (rows) => rows.length > 0 && rows.every((row) => row.region === 'North'))
          ]),
          makeProject('a4', 'Project: Revenue by region', 'sql', 'Build a grouped revenue summary from the active dataset.', '', [], null, [
            checkSql('Should group records by region', /group\s+by\s+region/i), checkSqlRows('Should return a region and revenue total', (rows) => rows.length > 0 && rows.every((row) => 'region' in row && Object.values(row).some((value) => Number.isFinite(Number(value)))))
          ])
        ]
      },
      {
        title: 'Python Data Inspection',
        challenges: [
          makeChallenge('a5', 'Count the dataset rows', 'python', 'Use Python to count the rows provided in `rows`.', 'row_count = 0', ['The built-in `len` function counts list items.'], 'row_count = len(rows)', [
            checkPython('Should define row_count', /row_count\s*=/), checkPythonValue('row_count', (data) => data.length)
          ]),
          makeProject('a6', 'Project: Revenue quality audit', 'python', 'Calculate total revenue from every record in `rows`.', '', [], null, [
            checkPython('Should calculate from rows', /sum\s*\(/), checkPythonValue('revenue_total', (data) => total(data, 'revenue'))
          ])
        ]
      },
      {
        title: 'Power BI Visual Stories',
        challenges: [
          makeChallenge('a7', 'Choose a regional revenue chart', 'powerbi', 'Describe a chart using the dataset category, measure, and chart type.', '{"category":"","value":"","type":"bar"}', ['Use JSON with category, value, and type properties.'], '{"category":"region","value":"revenue","type":"bar"}', [
            checkChart('Should group by region', (chart) => chart.category === 'region'), checkChart('Should use revenue as the measure', (chart) => chart.value === 'revenue' && chart.points.length > 0)
          ]),
          makeProject('a8', 'Project: Build a sales dashboard chart', 'powerbi', 'Create a chart specification from scratch for monthly revenue.', '', [], null, [
            checkChart('Should select a valid dataset category', (chart, data) => data.length > 0 && chart.category in data[0]), checkChart('Should use a numeric measure and chart type', (chart, data) => chart.type === 'bar' && data.some((row) => Number.isFinite(Number(row[chart.value]))))
          ])
        ]
      },
      {
        title: 'Analyst Portfolio',
        challenges: [
          makeChallenge('a9', 'Find the highest revenue row', 'sql', 'Return the highest-revenue record using SQL ordering.', 'SELECT * FROM data;', ['Sort descending, then keep one row.'], 'SELECT * FROM data ORDER BY revenue DESC LIMIT 1;', [
            checkSql('Should sort revenue descending', /order\s+by\s+revenue\s+desc/i), checkSqlRows('Should return one top record', (rows) => rows.length === 1 && Number(rows[0].revenue) > 0)
          ]),
          makeProject('a10', 'Certification Project: Executive revenue insight', 'sql', 'Build a query that returns the total revenue as one named value.', '', [], null, [
            checkSql('Should aggregate revenue', /sum\s*\(\s*revenue\s*\)/i), checkSqlRows('Should return the dataset total', (rows, data) => rows.length === 1 && Object.values(rows[0]).some((value) => Number(value) === total(data, 'revenue')))
          ])
        ]
      }
    ]
  },
  scientist: {
    title: 'Data Scientist Certification',
    courses: [
      {
        title: 'Statistics with Python',
        challenges: [
          makeChallenge('s1', 'Calculate average revenue', 'python', 'Use the standard library to calculate the mean revenue from `rows`.', 'mean_revenue = 0', ['`statistics.mean` accepts an iterable of numbers.'], 'import statistics\nmean_revenue = statistics.mean(row["revenue"] for row in rows)', [
            checkPython('Should calculate a mean', /statistics\.mean/i), checkPythonValue('mean_revenue', (data) => total(data, 'revenue') / data.length)
          ]),
          makeProject('s2', 'Project: Score distribution summary', 'python', 'Calculate the mean score from `rows` as `mean_score`.', '', [], null, [
            checkPython('Should calculate the score mean', /mean\s*\(/i), checkPythonValue('mean_score', (data) => total(data, 'score') / data.length)
          ], { dataset: 'engagement' })
        ]
      },
      {
        title: 'Time Series and Trends',
        challenges: [
          makeChallenge('s3', 'Calculate a three-row moving average', 'python', 'Create `moving_average` from revenue values using a three-row window.', 'moving_average = []', ['Build windows from index 2 onward; each window contains three values.'], 'values = [row["revenue"] for row in rows]\nmoving_average = [sum(values[i - 2:i + 1]) / 3 for i in range(2, len(values))]', [
            checkPython('Should define a three-value moving average', /range\s*\(\s*2\s*,/), checkPythonArrayLength('moving_average', (data) => Math.max(0, data.length - 2))
          ]),
          makeProject('s4', 'Project: Forecast baseline', 'python', 'Build `forecast` as the mean of the last three revenue rows.', '', [], null, [
            checkPython('Should use the latest three observations', /rows\s*\[\s*-3\s*:/), checkPythonValue('forecast', (data) => total(data.slice(-3), 'revenue') / Math.min(3, data.length))
          ])
        ]
      },
      {
        title: 'Experiments and Cohorts',
        challenges: [
          makeChallenge('s5', 'Compare experiment conversion rates', 'excel', 'Calculate the relative change from a 12% baseline to a 15% treatment rate.', '=0', ['Relative lift is (treatment - baseline) / baseline.'], '=((15%-12%)/12%)', [
            checkFormula('Should compare both conversion rates', /15%/), checkNumber('Should return 0.25 relative lift', () => 0.25)
          ]),
          makeProject('s6', 'Project: Cohort revenue comparison', 'sql', 'Group active records by region and calculate average revenue.', '', [], null, [
            checkSql('Should group by region and average revenue', /group\s+by\s+region/i), checkSqlRows('Should return numeric cohort averages', (rows) => rows.length > 0 && rows.every((row) => 'region' in row && Object.values(row).some((value) => Number.isFinite(Number(value)))))
          ])
        ]
      },
      {
        title: 'Machine Learning Foundations',
        challenges: [
          makeChallenge('s7', 'Compute a feature correlation', 'python', 'Use `statistics.correlation` on attendance and score columns.', 'score_correlation = 0', ['Pass two lists of equal length to `statistics.correlation`.'], 'import statistics\nscore_correlation = statistics.correlation([row["attendance"] for row in rows], [row["score"] for row in rows])', [
            checkPython('Should use a correlation calculation', /correlation\s*\(/i), checkPythonRange('score_correlation', -1, 1)
          ], { dataset: 'engagement' }),
          makeProject('s8', 'Project: Build an anomaly flag', 'python', 'Create `anomalies` containing revenue rows greater than the mean revenue.', '', [], null, [
            checkPython('Should compare revenue against its mean', /revenue.*mean|mean.*revenue/i), checkPythonArrayLength('anomalies', (data) => data.filter((row) => row.revenue > total(data, 'revenue') / data.length).length)
          ])
        ]
      },
      {
        title: 'Research Communication',
        challenges: [
          makeChallenge('s9', 'Summarize engagement by student', 'sql', 'Return each student and their average score.', 'SELECT * FROM data;', ['Select the student field and aggregate score with `AVG`.'], 'SELECT student, AVG(score) AS average_score FROM data GROUP BY student;', [
            checkSql('Should use AVG and GROUP BY', /avg\s*\(/i, /group\s+by/i), checkSqlRows('Should return students with numeric scores', (rows) => rows.length > 0 && rows.every((row) => 'student' in row && Number.isFinite(Number(row.average_score))))
          ], { dataset: 'engagement' }),
          makeProject('s10', 'Certification Project: Research-ready findings', 'powerbi', 'Create a chart spec showing student scores by student.', '', [], null, [
            checkChart('Should chart students', (chart) => chart.category === 'student'), checkChart('Should chart score values', (chart, data) => chart.value === 'score' && data.length > 0)
          ], { dataset: 'engagement' })
        ]
      }
    ]
  },
  engineer: {
    title: 'Data Engineer Certification',
    courses: [
      {
        title: 'Warehouse SQL',
        challenges: [
          makeChallenge('e1', 'Select clean event records', 'sql', 'Return events with a non-empty country value.', 'SELECT * FROM data;', ['Use `IS NOT NULL` and exclude empty strings.'], "SELECT * FROM data WHERE country IS NOT NULL AND country != '';", [
            checkSql('Should validate null and empty countries', /is\s+not\s+null/i, /!=\s*''|<>\s*''/), checkSqlRows('Every row should have a country', (rows) => rows.length > 0 && rows.every((row) => row.country))
          ], { dataset: 'events' }),
          makeProject('e2', 'Project: Build a country revenue fact', 'sql', 'Aggregate event amount by country and order largest first.', '', [], null, [
            checkSql('Should group by country and order descending', /group\s+by\s+country/i, /order\s+by/i), checkSqlRows('Should return aggregated countries', (rows) => rows.length > 0 && rows.every((row) => 'country' in row))
          ], { dataset: 'events' })
        ]
      },
      {
        title: 'Python Data Pipelines',
        challenges: [
          makeChallenge('e3', 'Normalize revenue values', 'python', 'Create a clean list of numeric revenues named `clean_revenue`.', 'clean_revenue = []', ['Convert each non-null value with `float`.'], 'clean_revenue = [float(row["revenue"]) for row in rows if row.get("revenue") is not None]', [
            checkPython('Should convert values to floats', /float\s*\(/), checkPythonArrayLength('clean_revenue', (data) => data.filter((row) => row.revenue != null).length)
          ]),
          makeProject('e4', 'Project: Build a clean event pipeline', 'python', 'Create `clean_events` with rows whose amount is a positive number.', '', [], null, [
            checkPython('Should filter positive amounts', /amount.*>\s*0|>\s*0.*amount/i), checkPythonArrayLength('clean_events', (data) => data.filter((row) => Number(row.amount) > 0).length)
          ], { dataset: 'events' })
        ]
      },
      {
        title: 'Data Quality and Validation',
        challenges: [
          makeChallenge('e5', 'Count invalid email rows', 'sql', 'Count rows with a null email in the active dataset.', 'SELECT COUNT(*) AS invalid_rows FROM data;', ['Use `COUNT(*)` and filter with `IS NULL`.'], 'SELECT COUNT(*) AS invalid_rows FROM data WHERE email IS NULL;', [
            checkSql('Should count null values', /count\s*\(\s*\*\s*\)/i, /is\s+null/i), checkSqlRows('Should return one numeric count', (rows) => rows.length === 1 && Number.isFinite(Number(rows[0].invalid_rows)))
          ], { dataset: 'users' }),
          makeProject('e6', 'Project: Validate event amounts', 'python', 'Create `valid_events` with only rows that have a positive amount and country.', '', [], null, [
            checkPython('Should validate amount and country', /amount.*>\s*0/i, /country/i), checkPythonArrayLength('valid_events', (data) => data.filter((row) => Number(row.amount) > 0 && Boolean(row.country)).length)
          ], { dataset: 'events' })
        ]
      },
      {
        title: 'Data Observability',
        challenges: [
          makeChallenge('e7', 'Visualize rows by channel', 'powerbi', 'Build a bar chart that groups event amounts by channel.', '{"category":"","value":"","type":"bar"}', ['Choose a category field and numeric amount field.'], '{"category":"channel","value":"amount","type":"bar"}', [
            checkChart('Should group by channel', (chart) => chart.category === 'channel'), checkChart('Should use event amount', (chart) => chart.value === 'amount' && chart.points.length > 0)
          ], { dataset: 'events' }),
          makeProject('e8', 'Project: Ingestion observability chart', 'powerbi', 'Build a chart of revenue by month from scratch.', '', [], null, [
            checkChart('Should use month as the category', (chart) => chart.category === 'month'), checkChart('Should chart numeric revenue', (chart, data) => chart.value === 'revenue' && data.some((row) => Number.isFinite(Number(row.revenue))))
          ])
        ]
      },
      {
        title: 'Engineer Certification Project',
        challenges: [
          makeChallenge('e9', 'Deduplicate countries in SQL', 'sql', 'Return one row per country with its total event amount.', 'SELECT * FROM data;', ['Aggregate the amount and group by country.'], 'SELECT country, SUM(amount) AS total_amount FROM data GROUP BY country;', [
            checkSql('Should aggregate amount by country', /sum\s*\(\s*amount\s*\)/i, /group\s+by\s+country/i), checkSqlRows('Should return numeric totals', (rows) => rows.length > 0 && rows.every((row) => Number.isFinite(Number(row.total_amount))))
          ], { dataset: 'events' }),
          makeProject('e10', 'Certification Project: Publish a reliable data product', 'python', 'Build `published_rows` containing only complete rows from the active dataset.', '', [], null, [
            checkPython('Should check row completeness', /all\s*\(|not\s+none|is\s+not\s+none/i), checkPythonArrayLength('published_rows', (data) => data.filter((row) => Object.values(row).every((value) => value !== null && value !== '')).length)
          ], { dataset: 'events' })
        ]
      }
    ]
  }
};

function makeChallenge(id, title, tool, descriptionMD, starterCode, hints, solution, tests, options = {}) {
  return {
    id,
    title,
    tool,
    descriptionMD,
    example: options.example || ({
      sql: 'SELECT columns FROM data WHERE condition;',
      excel: '=SUMIF(criteria_range, criterion, sum_range)',
      python: 'result = transform(rows)',
      powerbi: '{"category":"group","value":"measure","type":"bar"}'
    }[tool] || starterCode),
    starterCode,
    hints,
    solution,
    tests,
    dataset: options.dataset || 'sales',
    resultName: options.resultName || inferResultName(starterCode),
    isProject: false
  };
}

function makeProject(id, title, tool, descriptionMD, starterCode, hints, solution, tests, options = {}) {
  return {
    ...makeChallenge(id, title, tool, descriptionMD, starterCode, hints, solution, tests, options),
    isProject: true,
    hints: [],
    solution: null
  };
}

function inferResultName(code) {
  const match = code.match(/^\s*([a-zA-Z_]\w*)\s*=/m);
  return match ? match[1] : 'result';
}

function checkFormula(text, pattern) {
  return { text, fn: ({ code }) => pattern.test(code) };
}

function checkNumber(text, expected) {
  return { text, fn: ({ result, data }) => Number.isFinite(Number(result.value)) && Math.abs(Number(result.value) - expected(data)) < 0.000001 };
}

function checkSql(text, ...patterns) {
  return { text, fn: ({ code }) => patterns.every((pattern) => pattern.test(code)) };
}

function checkRows(text, predicate) {
  return { text, fn: ({ result }) => result.rows.length > 0 && predicate(result.rows) };
}

function checkSqlRows(text, predicate) {
  return { text, fn: ({ result, data }) => result.rows.length > 0 && predicate(result.rows, data) };
}

function checkPython(text, ...patterns) {
  return { text, fn: ({ code }) => patterns.every((pattern) => pattern.test(code)) };
}

function checkPythonValue(name, expected) {
  return { text: `Should set ${name} to the expected value`, variable: name, fn: ({ result, data }) => result.variables[name] != null && Math.abs(Number(result.variables[name]) - expected(data)) < 0.000001 };
}

function checkPythonArrayLength(name, expectedLength) {
  return { text: `Should create ${name} with the matching rows`, variable: name, fn: ({ result, data }) => Array.isArray(result.variables[name]) && result.variables[name].length === expectedLength(data) };
}

function checkPythonRange(name, minimum, maximum) {
  return { text: `Should set ${name} between ${minimum} and ${maximum}`, variable: name, fn: ({ result }) => Number(result.variables[name]) >= minimum && Number(result.variables[name]) <= maximum };
}

function checkChart(text, predicate) {
  return { text, fn: ({ result, data }) => Boolean(result.chart) && predicate(result.chart, data) };
}

function expandCourseCurriculum() {
  if (state.curriculumExpanded) return;
  state.curriculumExpanded = true;
  Object.entries(DATA_CERTIFICATIONS).forEach(([layer, certification]) => {
    certification.courses.forEach((course, courseIndex) => {
      const base = course.challenges[0];
      const dataset = SAMPLE_DATA[base.dataset] || SAMPLE_DATA.sales;
      const keys = Object.keys(dataset[0] || {});
      const numericKey = keys.find((key) => dataset.some((row) => row[key] != null && Number.isFinite(Number(row[key]))));
      const textKey = keys.find((key) => dataset.some((row) => typeof row[key] === 'string'));
      const extras = makeCoursePractice(layer, course, courseIndex, dataset, numericKey, textKey);
      course.challenges.splice(1, 0, ...extras);
    });
  });
}

function makeCoursePractice(layer, course, courseIndex, data, numericKey, textKey) {
  const tool = course.challenges[0].tool;
  const dataName = course.challenges[0].dataset;
  const idPrefix = `${layer[0]}${courseIndex + 1}`;
  const practiceChallenge = (index, title, description, starter, solution, tests) => makeChallenge(
    `${idPrefix}-practice-${index + 1}`,
    `${title} · ${course.title}`,
    tool,
    description,
    starter,
    ['Use the active dataset and the operation named in the instructions. Check the output value and the test conditions.'],
    solution,
    tests,
    { dataset: dataName }
  );

  if (tool === 'sql') {
    const textColumn = textKey || Object.keys(data[0] || {})[0];
    const valueColumn = numericKey || 'revenue';
    const sqlQuote = (field) => `"${field.replace(/"/g, '""')}"`;
    return [
      practiceChallenge(0, 'Count input rows', 'Write a scalar SQL query that counts all rows in `data`.', 'SELECT * FROM data;', 'SELECT COUNT(*) AS row_count FROM data;', [
        checkSql('Should use COUNT(*)', /count\s*\(\s*\*\s*\)/i), checkSqlRows('Should count every input row', (rows, active) => rows.length === 1 && Number(rows[0].row_count) === active.length)
      ]),
      practiceChallenge(1, `Filter non-null ${textColumn}`, `Return records where **${textColumn}** is present.`, 'SELECT * FROM data;', `SELECT * FROM data WHERE ${sqlQuote(textColumn)} IS NOT NULL;`, [
        checkSql('Should filter null values', /where/i, /is\s+not\s+null/i), checkSqlRows(`Every returned ${textColumn} should be present`, (rows) => rows.length > 0 && rows.every((row) => row[textColumn] != null))
      ]),
      practiceChallenge(2, `Sort by ${valueColumn}`, `Return one row with the highest **${valueColumn}** value.`, 'SELECT * FROM data;', `SELECT * FROM data ORDER BY ${sqlQuote(valueColumn)} DESC LIMIT 1;`, [
        checkSql('Should sort descending and limit results', /order\s+by/i, /desc/i, /limit\s+1/i), checkSqlRows('Should return a numeric maximum', (rows, active) => rows.length === 1 && Number(rows[0][valueColumn]) === Math.max(...active.map((row) => Number(row[valueColumn]) || 0)))
      ]),
      practiceChallenge(3, `Sum ${valueColumn}`, `Calculate the total **${valueColumn}** using SQL aggregation.`, 'SELECT * FROM data;', `SELECT SUM(${sqlQuote(valueColumn)}) AS total_value FROM data;`, [
        checkSql('Should use SUM', /sum\s*\(/i), checkSqlRows('Should match the input sum', (rows, active) => rows.length === 1 && Number(rows[0].total_value) === total(active, valueColumn))
      ]),
      practiceChallenge(4, `Average ${valueColumn}`, `Calculate the average **${valueColumn}** and return one scalar.`, 'SELECT * FROM data;', `SELECT AVG(${sqlQuote(valueColumn)}) AS average_value FROM data;`, [
        checkSql('Should use AVG', /avg\s*\(/i), checkSqlRows('Should match the input average', (rows, active) => rows.length === 1 && Math.abs(Number(rows[0].average_value) - total(active, valueColumn) / active.length) < 0.000001)
      ]),
      practiceChallenge(5, `List distinct ${textColumn} values`, `Return unique values from **${textColumn}**.`, 'SELECT * FROM data;', `SELECT DISTINCT ${sqlQuote(textColumn)} FROM data;`, [
        checkSql('Should use DISTINCT', /select\s+distinct/i), checkSqlRows('Should return unique non-null categories', (rows) => rows.length > 0 && new Set(rows.map((row) => Object.values(row)[0])).size === rows.length)
      ])
    ];
  }

  if (tool === 'excel') {
    const field = numericKey || Object.keys(data[0] || {})[0];
    const columnIndex = Object.keys(data[0] || {}).indexOf(field);
    const columnName = excelColumn(columnIndex);
    const startRow = 2;
    const endRow = data.length + 1;
    const range = `${columnName}${startRow}:${columnName}${endRow}`;
    const activeValues = (active) => active.map((row) => Number(row[field])).filter(Number.isFinite);
    return [
      ['SUM', 'Sum values', `Use SUM to total **${field}** from the active sheet.`, `=SUM(${range})`, (active) => activeValues(active).reduce((sum, value) => sum + value, 0)],
      ['AVERAGE', 'Average values', `Use AVERAGE to calculate the mean **${field}**.`, `=AVERAGE(${range})`, (active) => activeValues(active).reduce((sum, value) => sum + value, 0) / activeValues(active).length],
      ['MAX', 'Find the maximum', `Use MAX to find the largest **${field}**.`, `=MAX(${range})`, (active) => Math.max(...activeValues(active))],
      ['MIN', 'Find the minimum', `Use MIN to find the smallest **${field}**.`, `=MIN(${range})`, (active) => Math.min(...activeValues(active))],
      ['COUNTA', 'Count filled cells', `Use COUNTA to count non-empty **${field}** cells.`, `=COUNTA(${range})`, (active) => active.filter((row) => row[field] != null && row[field] !== '').length],
      ['COUNT', 'Count numeric cells', `Use COUNT to count numeric **${field}** cells.`, `=COUNT(${range})`, (active) => activeValues(active).length]
    ].map(([fn, title, description, solution, expected], index) => practiceChallenge(index, title, description, '=0', solution, [
      checkFormula(`Should use ${fn}`, new RegExp(`^\\s*=${fn}\\s*\\(`, 'i')),
      checkNumber(`Should return the correct ${field} result`, expected)
    ]));
  }

  if (tool === 'python') {
    const field = numericKey || Object.keys(data[0] || {})[0];
    const values = data.map((row) => Number(row[field])).filter(Number.isFinite);
    const expectedSum = values.reduce((sum, value) => sum + value, 0);
    const expectedMax = Math.max(...values);
    return [
      practiceChallenge(0, 'Count input rows', 'Use `len` to store the number of records in `row_count`.', 'row_count = 0', 'row_count = len(rows)', [
        checkPython('Should use len(rows)', /len\s*\(\s*rows\s*\)/), checkPythonValue('row_count', (active) => active.length)
      ]),
      practiceChallenge(1, `Sum ${field}`, `Add all **${field}** values and store the result in \`total_value\`.`, 'total_value = 0', `total_value = sum(float(row["${field}"]) for row in rows)`, [
        checkPython('Should sum the selected field', /sum\s*\(/, new RegExp(field)), checkPythonValue('total_value', (active) => total(active, field))
      ]),
      practiceChallenge(2, `Find maximum ${field}`, `Find the largest **${field}** value and store it in \`maximum_value\`.`, 'maximum_value = 0', `maximum_value = max(float(row["${field}"]) for row in rows)`, [
        checkPython('Should use max on the selected field', /max\s*\(/, new RegExp(field)), checkPythonValue('maximum_value', (active) => Math.max(...active.map((row) => Number(row[field]) || 0)))
      ]),
      practiceChallenge(3, `Filter positive ${field}`, `Create \`positive_rows\` containing records with positive **${field}** values.`, 'positive_rows = []', `positive_rows = [row for row in rows if float(row["${field}"]) > 0]`, [
        checkPython('Should filter on a positive value', />\s*0/, new RegExp(field)), checkPythonArrayLength('positive_rows', (active) => active.filter((row) => Number(row[field]) > 0).length)
      ]),
      practiceChallenge(4, 'Create a unique category list', `Create \`unique_values\` from the distinct values in **${textKey || field}**.`, 'unique_values = []', `unique_values = sorted(set(row["${textKey || field}"] for row in rows))`, [
        checkPython('Should use set to deduplicate', /set\s*\(/), checkPythonArrayLength('unique_values', (active) => new Set(active.map((row) => row[textKey || field])).size)
      ]),
      practiceChallenge(5, `Calculate mean ${field}`, `Calculate the average **${field}** as \`mean_value\`.`, 'mean_value = 0', `mean_value = sum(float(row["${field}"]) for row in rows) / len(rows)`, [
        checkPython('Should calculate sum divided by row count', /sum\s*\(/, /len\s*\(/), checkPythonValue('mean_value', (active) => total(active, field) / active.length)
      ])
    ];
  }

  const category = textKey || Object.keys(data[0] || {})[0];
  const measure = numericKey || 'revenue';
  const specification = (type) => JSON.stringify({ category, value: measure, type });
  return ['bar', 'line', 'doughnut', 'bar', 'line', 'doughnut'].map((type, index) => practiceChallenge(index,
    `Build ${type} chart ${index + 1}`,
    `Create a real **${type}** chart grouped by **${category}** with **${measure}** values.`,
    '{"category":"","value":"","type":"bar"}',
    specification(type),
    [
      checkChart(`Should group by ${category}`, (chart) => chart.category === category),
      checkChart(`Should plot ${measure} with ${type}`, (chart) => chart.value === measure && chart.type === type && chart.points.length > 0)
    ]
  ));
}

function excelColumn(index) {
  let number = index + 1;
  let label = '';
  while (number > 0) {
    const remainder = (number - 1) % 26;
    label = String.fromCharCode(65 + remainder) + label;
    number = Math.floor((number - 1) / 26);
  }
  return label;
}

function total(rows, field) {
  return rows.reduce((sum, row) => sum + (Number(row[field]) || 0), 0);
}

function totalWhere(rows, field, target, sumField) {
  return total(rows.filter((row) => row[field] === target), sumField);
}

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
  ],
  users: [
    { user_id: 1, email: 'learner1@example.test', country: 'PK' },
    { user_id: 2, email: null, country: 'US' },
    { user_id: 3, email: 'learner3@example.test', country: 'UK' },
    { user_id: 4, email: '', country: 'PK' }
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
  elements.consoleInput = document.getElementById('challenge-code');
  elements.consoleRun = document.getElementById('run-command');
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
  elements.consoleInput = document.getElementById('challenge-code');
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
  elements.toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => elements.toast.classList.remove('is-visible'), 1800);
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

const lessonsMap = {
  ...DATA_CERTIFICATIONS,
  python_fullstack: { title: 'Full Stack Python Certification', courses: [] }
};

globalThis.lessonsMap = lessonsMap;

function init() {
  cacheDom();
  elements.challengeCode = document.getElementById('challenge-code');
  elements.instructions = document.getElementById('challenge-instructions');
  elements.example = document.getElementById('challenge-example');
  elements.hintPanel = document.getElementById('hint-panel');
  elements.hintButton = document.getElementById('show-hint');
  elements.solutionButton = document.getElementById('show-solution');
  elements.resetChallenge = document.getElementById('challenge-reset');
  elements.testList = document.getElementById('test-list');
  elements.testSummary = document.getElementById('test-summary');
  elements.certProgress = document.getElementById('certification-progress');
  elements.certProgressLabel = document.getElementById('certification-progress-label');
  elements.studyStreak = document.getElementById('study-streak');
  elements.fileInput = document.getElementById('dataset-upload');
  elements.lineNumbers = document.getElementById('editor-line-numbers');
  elements.instructionsCaption = document.getElementById('instructions-caption');
  elements.editorLanguage = document.getElementById('editor-language');
  elements.challengeKind = document.getElementById('challenge-kind');
  elements.runStatus = document.getElementById('run-status');
  elements.datasetName = document.getElementById('dataset-name');
  elements.datasetSize = document.getElementById('dataset-size');
  elements.columnCount = document.getElementById('column-count');

  state.progress = loadProgress();
  state.datasets = { ...SAMPLE_DATA };
  state.importedData = false;
  state.activeData = SAMPLE_DATA.sales;
  state.activeDatasetName = 'sales';
  state.currentChallenge = null;
  state.challengeDrafts = state.progress.drafts || {};
  state.projects = [];

  expandCourseCurriculum();
  bindChallengeEvents();
  renderLayerButtons();
  renderDatasetList();
  renderChallengeCurriculum();
  renderCertificationProgress();
  renderStudyStreak();
  updateHelpCounter();
  restoreProjectState();
  renderProjectGallery();
  registerServiceWorker();
  initIndexedDb();

  const firstChallenge = getAllChallenges('analyst')[0];
  if (firstChallenge) createChallenge(firstChallenge);
}

function bindChallengeEvents() {
  bindPageNavigation();

  elements.layerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.layer = button.dataset.layer;
      renderLayerButtons();
      renderChallengeCurriculum();
      const challenge = getAllChallenges(state.layer)[0];
      if (challenge) createChallenge(challenge);
    });
  });

  elements.consoleRun.addEventListener('click', () => runTests(elements.challengeCode.value));
  elements.challengeCode.addEventListener('input', () => {
    state.progress.drafts[state.currentChallenge.id] = elements.challengeCode.value;
    saveProgress();
    updateLineNumbers();
  });
  elements.challengeCode.addEventListener('scroll', updateLineNumbers);
  elements.challengeCode.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      runTests(elements.challengeCode.value);
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = elements.challengeCode.selectionStart;
      const end = elements.challengeCode.selectionEnd;
      elements.challengeCode.setRangeText('  ', start, end, 'end');
      elements.challengeCode.dispatchEvent(new Event('input'));
    }
  });
  elements.resetChallenge.addEventListener('click', resetChallengeCode);
  elements.hintButton.addEventListener('click', revealHint);
  elements.solutionButton.addEventListener('click', revealSolution);
  elements.saveProject.addEventListener('click', saveCurrentProject);
  elements.exportCsv.addEventListener('click', exportCurrentCsv);
  elements.projectGallery.addEventListener('click', showProjectGallery);
  elements.closeGallery.addEventListener('click', () => elements.projectGalleryModal.classList.add('hidden'));
  elements.projectGalleryModal.addEventListener('click', (event) => {
    if (event.target === elements.projectGalleryModal) elements.projectGalleryModal.classList.add('hidden');
  });
  elements.fileInput.addEventListener('change', importDatasetFile);

  const resetData = document.getElementById('reset-data');
  if (resetData) resetData.addEventListener('click', () => {
    state.importedData = false;
    state.activeDatasetName = state.currentChallenge.dataset;
    state.activeData = SAMPLE_DATA[state.activeDatasetName];
    renderActiveDataset();
    showToast('Restored the lesson sample dataset.');
  });
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('sunnystudy_progress') || '{}');
    return {
      completed: saved.completed || { analyst: [], scientist: [], engineer: [] },
      assisted: saved.assisted || {},
      solutionUsed: saved.solutionUsed || {},
      failures: saved.failures || {},
      drafts: saved.drafts || {},
      hints: saved.hints || {},
      helpCount: Number(saved.helpCount) || 0,
      streak: Number(saved.streak) || 0,
      lastStudyDate: saved.lastStudyDate || ''
    };
  } catch (error) {
    return { completed: { analyst: [], scientist: [], engineer: [] }, assisted: {}, failures: {}, drafts: {}, hints: {}, helpCount: 0, streak: 0, lastStudyDate: '' };
  }
}

function saveProgress() {
  localStorage.setItem('sunnystudy_progress', JSON.stringify(state.progress));
}

function getAllChallenges(layer) {
  return (lessonsMap[layer]?.courses || []).flatMap((course) => course.challenges);
}

function renderLayerButtons() {
  elements.layerButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.layer === state.layer);
  });
}

function renderChallengeCurriculum() {
  const certification = lessonsMap[state.layer];
  if (!certification) return;
  const challenges = getAllChallenges(state.layer);
  elements.lessonCount.textContent = String(challenges.length);
  elements.lessonList.innerHTML = certification.courses.map((course, courseIndex) => {
    const isCurrentCourse = course.challenges.some((challenge) => challenge.id === state.currentChallenge?.id);
    const coursePassed = course.challenges.every((challenge) => state.progress.completed[state.layer]?.includes(challenge.id));
    return `<details class="course-group" ${isCurrentCourse || (!state.currentChallenge && courseIndex === 0) ? 'open' : ''}>
      <summary><span>${escapeHtml(course.title)}</span><small>${coursePassed ? 'Complete' : `${course.challenges.filter((challenge) => state.progress.completed[state.layer]?.includes(challenge.id)).length}/${course.challenges.length}`}</small></summary>
      <div class="course-challenges">${course.challenges.map((challenge) => {
        const passed = state.progress.completed[state.layer]?.includes(challenge.id);
        const assisted = state.progress.assisted[challenge.id];
        const active = state.currentChallenge?.id === challenge.id;
        return `<button type="button" class="challenge-link ${active ? 'is-selected' : ''} ${passed ? 'is-passed' : ''}" data-challenge-id="${challenge.id}">
          <span class="challenge-status">${passed ? '&#10003;' : assisted ? '~' : '&#9675;'}</span>
          <span>${escapeHtml(challenge.title)}</span>
        </button>`;
      }).join('')}</div>
    </details>`;
  }).join('');

  elements.lessonList.querySelectorAll('.challenge-link').forEach((button) => {
    button.addEventListener('click', () => {
      const challenge = challenges.find((entry) => entry.id === button.dataset.challengeId);
      if (challenge) createChallenge(challenge);
    });
  });
  renderCertificationProgress();
}

function createChallenge(lesson) {
  state.currentChallenge = lesson;
  state.currentLesson = lesson;
  state.tool = lesson.tool;
  if (!state.importedData) {
    state.activeDatasetName = lesson.dataset;
    state.activeData = SAMPLE_DATA[lesson.dataset] || SAMPLE_DATA.sales;
  }

  document.getElementById('active-lesson-title').textContent = lesson.title;
  document.getElementById('tool-kicker').textContent = `${lessonsMap[state.layer].title.toUpperCase()} · ${lesson.tool.toUpperCase()}`;
  document.getElementById('editor-language').textContent = lesson.tool.toUpperCase();
  document.getElementById('console-caption').textContent = `Edit the ${lesson.tool} starter code, then run its real browser engine and tests.`;
  document.getElementById('challenge-kind').textContent = lesson.isProject ? 'PROJECT · NO HINTS' : 'CHALLENGE';
  document.getElementById('challenge-kind').classList.toggle('is-project', lesson.isProject);
  document.getElementById('summary-title').textContent = lesson.title;
  document.getElementById('summary-text').textContent = lesson.descriptionMD;
  elements.instructionsCaption.textContent = lesson.isProject ? 'Certification project · complete it without hints.' : `${lesson.tool.toUpperCase()} challenge · edit, run, and pass the checks.`;
  elements.instructions.innerHTML = markdownToHtml(lesson.descriptionMD);
  elements.example.textContent = lesson.example || 'No example provided.';
  elements.challengeCode.value = state.challengeDrafts[lesson.id] ?? lesson.starterCode;
  elements.hintPanel.hidden = true;
  elements.hintPanel.textContent = '';
  elements.testList.replaceChildren();
  elements.testSummary.textContent = 'Not run';
  elements.consoleOutput.textContent = '> Edit the challenge code, then run tests.';
  elements.runStatus.textContent = 'Ready';
  elements.runStatus.classList.remove('error', 'success');
  const failures = state.progress.failures[lesson.id] || 0;
  elements.hintButton.hidden = lesson.isProject || lesson.hints.length === 0 || failures < 2;
  elements.solutionButton.hidden = lesson.isProject || !lesson.solution || failures < 3;
  renderChallengeCurriculum();
  renderActiveDataset();
  renderChart();
  updateLineNumbers();
}

async function runTests(userCode, expectedOutput) {
  const challenge = state.currentChallenge;
  if (!challenge) return;
  elements.consoleRun.disabled = true;
  elements.runStatus.textContent = `Running ${challenge.tool}...`;
  elements.runStatus.classList.remove('error', 'success');

  try {
    const result = expectedOutput || await executeChallenge(challenge, userCode);
    state.resultTable = result.rows || [];
    renderResultTable(state.resultTable);
    if (result.chart) renderChartSpec(result.chart);
    else clearChart();
    const testResults = challenge.tests.map((test) => {
      let passed = false;
      try {
        passed = Boolean(test.fn({ code: userCode, result, data: state.activeData }));
      } catch (error) {
        passed = false;
      }
      return { text: test.text, passed };
    });
    renderTestResults(testResults);
    const allPassed = testResults.length > 0 && testResults.every((test) => test.passed);
    elements.consoleOutput.textContent = `> ${challenge.tool.toUpperCase()} execution complete\n${formatResult(result)}`;

    if (allPassed) {
      handleChallengePass(challenge);
      const assisted = Boolean(state.progress.solutionUsed?.[challenge.id]);
      elements.runStatus.textContent = assisted ? 'Passed with solution; not certified' : 'All tests passed';
      if (!assisted) elements.runStatus.classList.add('success');
    } else {
      handleChallengeFailure(challenge);
      elements.runStatus.textContent = 'Some tests need work';
      elements.runStatus.classList.add('error');
    }
  } catch (error) {
    handleChallengeFailure(challenge);
    renderTestResults(challenge.tests.map((test) => ({ text: test.text, passed: false })));
    elements.consoleOutput.textContent = `> ${challenge.tool.toUpperCase()} runtime error\n${error.message}`;
    elements.runStatus.textContent = 'Runtime unavailable or code error';
    elements.runStatus.classList.add('error');
    elements.testSummary.textContent = 'Execution failed';
  } finally {
    elements.consoleRun.disabled = false;
    renderChallengeCurriculum();
  }
}

async function executeChallenge(challenge, code) {
  if (!code.trim()) throw new Error('Write code in the editor before running tests.');
  if (challenge.tool === 'sql') return executeSql(code);
  if (challenge.tool === 'excel') return executeFormula(code);
  if (challenge.tool === 'python') return executePython(code, challenge);
  if (challenge.tool === 'powerbi') return executeChartSpec(code);
  throw new Error(`No runtime adapter is registered for ${challenge.tool}.`);
}

async function executeSql(code) {
  if (!window.initSqlJs) throw new Error('sql.js could not load. Check your internet connection and refresh.');
  if (!state.sqlModule) {
    state.sqlModule = await window.initSqlJs({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/sql.js@1.11.0/dist/${file}`
    });
  }
  const db = new state.sqlModule.Database();
  try {
    const columns = Object.keys(state.activeData[0] || {});
    if (!columns.length) throw new Error('The active dataset has no columns.');
    const definitions = columns.map((column) => `"${column.replace(/"/g, '""')}" ${state.activeData.some((row) => row[column] != null && Number.isFinite(Number(row[column]))) ? 'REAL' : 'TEXT'}`).join(', ');
    db.run(`CREATE TABLE data (${definitions});`);
    const quotedColumns = columns.map((column) => `"${column.replace(/"/g, '""')}"`).join(',');
    for (const row of state.activeData) {
      const values = columns.map((column) => sqlLiteral(row[column])).join(',');
      db.run(`INSERT INTO data (${quotedColumns}) VALUES (${values});`);
    }
    const output = db.exec(code);
    const first = output[0];
    const rows = first ? first.values.map((values) => Object.fromEntries(first.columns.map((column, index) => [column, values[index]]))) : [];
    return { rows, columns: first?.columns || [], value: rows[0] ? Object.values(rows[0])[0] : null };
  } finally {
    db.close();
  }
}

function sqlLiteral(value) {
  if (value == null || value === '') return 'NULL';
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return `'${String(value).replace(/'/g, "''")}'`;
}

async function executeFormula(code) {
  if (!window.HyperFormula) throw new Error('HyperFormula could not load. Check your internet connection and refresh.');
  if (!state.activeData.length) throw new Error('The active dataset is empty.');
  const columns = Object.keys(state.activeData[0]);
  const matrix = [columns, ...state.activeData.map((row) => columns.map((column) => row[column] ?? null))];
  const formula = state.importedData
    ? code.replace(/([A-Z]+)(\d+):([A-Z]+)\d+/gi, `$1$2:$3${state.activeData.length + 1}`)
    : code;
  const engine = window.HyperFormula.buildFromArray([...matrix, [formula]], { licenseKey: 'gpl-v3' });
  try {
    const address = { sheet: 0, row: matrix.length, col: 0 };
    const value = engine.getCellValue(address);
    if (value && typeof value === 'object' && value.type === 'ERROR') throw new Error(value.message || 'Formula error.');
    return { value, rows: [{ result: value }] };
  } finally {
    engine.destroy();
  }
}

async function executePython(code, challenge) {
  if (!window.loadPyodide) throw new Error('Pyodide could not load. Check your internet connection and refresh.');
  if (!state.pyodide) {
    state.pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/' });
  }
  state.pyodide.globals.set('sunnystudy_json', JSON.stringify(state.activeData));
  const names = [...new Set(challenge.tests.map((test) => test.variable).filter(Boolean))];
  const resetNames = names.map((name) => `globals().pop(${JSON.stringify(name)}, None)`).join('\n');
  await state.pyodide.runPythonAsync(`import json\nrows = json.loads(sunnystudy_json)\n${resetNames}\n${code}`);
  const variables = {};
  for (const name of names) {
    const proxy = state.pyodide.globals.get(name);
    if (proxy === undefined) continue;
    variables[name] = proxy && typeof proxy.toJs === 'function' ? proxy.toJs({ dict_converter: Object.fromEntries }) : proxy;
    if (proxy && typeof proxy.destroy === 'function') proxy.destroy();
  }
  return { rows: [], variables, value: variables[challenge.resultName] };
}

function executeChartSpec(code) {
  if (!window.Chart) throw new Error('Chart.js could not load. Check your internet connection and refresh.');
  let spec;
  try {
    spec = JSON.parse(code);
  } catch (error) {
    throw new Error('Enter a JSON chart spec, for example {"category":"region","value":"revenue","type":"bar"}.');
  }
  const firstRow = state.activeData[0] || {};
  if (!(spec.category in firstRow) || !(spec.value in firstRow)) throw new Error('The chosen category or value column is not in the active dataset.');
  if (!['bar', 'line', 'doughnut'].includes(spec.type)) throw new Error('Chart type must be bar, line, or doughnut.');
  const groups = new Map();
  state.activeData.forEach((row) => {
    const label = String(row[spec.category]);
    groups.set(label, (groups.get(label) || 0) + (Number(row[spec.value]) || 0));
  });
  const points = [...groups.entries()].map(([label, value]) => ({ [spec.category]: label, [spec.value]: value }));
  if (!points.length) throw new Error('No chart data is available for those columns.');
  const chart = { ...spec, labels: points.map((point) => point[spec.category]), values: points.map((point) => point[spec.value]), points };
  renderChartSpec(chart);
  return { chart, rows: points, value: points.length };
}

function renderChartSpec(spec) {
  const canvas = document.getElementById('chart-canvas');
  if (!canvas || !window.Chart) return;
  if (state.chart) state.chart.destroy();
  state.chart = new window.Chart(canvas, {
    type: spec.type,
    data: { labels: spec.labels, datasets: [{ label: spec.value, data: spec.values, backgroundColor: ['#7ce0ac', '#8ec5ff', '#f9d56e', '#ff8f71', '#91a9ff', '#f7a6c8'], borderWidth: 1 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: spec.type === 'doughnut' } } }
  });
}

function clearChart() {
  if (state.chart) {
    state.chart.destroy();
    state.chart = null;
  }
}

function renderTestResults(results) {
  elements.testList.replaceChildren();
  results.forEach((result) => {
    const item = document.createElement('li');
    item.className = `test-result ${result.passed ? 'is-passed' : 'is-failed'}`;
    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = result.passed ? '✓' : '✗';
    const text = document.createElement('span');
    text.textContent = result.text;
    item.append(icon, text);
    elements.testList.append(item);
  });
  const passed = results.filter((result) => result.passed).length;
  elements.testSummary.textContent = `${passed}/${results.length} passed`;
}

function handleChallengePass(challenge) {
  const certification = state.progress.completed[state.layer] || (state.progress.completed[state.layer] = []);
  if (state.progress.solutionUsed?.[challenge.id]) {
    state.progress.assisted[challenge.id] = true;
  } else if (!certification.includes(challenge.id)) {
    certification.push(challenge.id);
  }
  state.progress.failures[challenge.id] = 0;
  updateStudyStreak();
  renderStudyStreak();
  saveProgress();
  renderCertificationProgress();
  if (challenge.isProject && !state.progress.solutionUsed?.[challenge.id]) saveCertificationProject(challenge);
}

function handleChallengeFailure(challenge) {
  state.progress.failures[challenge.id] = (state.progress.failures[challenge.id] || 0) + 1;
  saveProgress();
  elements.hintButton.hidden = challenge.isProject || challenge.hints.length === 0 || state.progress.failures[challenge.id] < 2;
  elements.solutionButton.hidden = challenge.isProject || !challenge.solution || state.progress.failures[challenge.id] < 3;
}

function updateStudyStreak() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.progress.lastStudyDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  state.progress.streak = state.progress.lastStudyDate === yesterday.toISOString().slice(0, 10) ? state.progress.streak + 1 : 1;
  state.progress.lastStudyDate = today;
}

function renderCertificationProgress() {
  if (!elements.certProgress) return;
  const all = getAllChallenges(state.layer);
  const passed = state.progress.completed[state.layer] || [];
  const percentage = all.length ? Math.round((passed.length / all.length) * 100) : 0;
  elements.certProgress.value = percentage;
  elements.certProgressLabel.textContent = `${percentage}%`;
}

function renderStudyStreak() {
  if (elements.studyStreak) elements.studyStreak.textContent = `${state.progress.streak} ${state.progress.streak === 1 ? 'day' : 'days'}`;
}

function revealHint() {
  const challenge = state.currentChallenge;
  if (!challenge || challenge.isProject || !challenge.hints.length) return;
  const index = state.progress.hints[challenge.id] || 0;
  elements.hintPanel.textContent = challenge.hints[Math.min(index, challenge.hints.length - 1)];
  elements.hintPanel.hidden = false;
  state.progress.hints[challenge.id] = index + 1;
  state.progress.helpCount += 1;
  saveProgress();
  updateHelpCounter();
}

function revealSolution() {
  const challenge = state.currentChallenge;
  if (!challenge || challenge.isProject || !challenge.solution) return;
  state.progress.solutionUsed = state.progress.solutionUsed || {};
  state.progress.solutionUsed[challenge.id] = true;
  saveProgress();
  elements.hintPanel.textContent = `Solution (viewing this keeps the challenge out of certification progress):\n${challenge.solution}`;
  elements.hintPanel.hidden = false;
  state.progress.helpCount += 1;
  saveProgress();
  updateHelpCounter();
}

function resetChallengeCode() {
  const challenge = state.currentChallenge;
  if (!challenge) return;
  elements.challengeCode.value = challenge.starterCode;
  delete state.progress.drafts[challenge.id];
  delete state.progress.failures[challenge.id];
  delete state.progress.hints[challenge.id];
  elements.hintPanel.hidden = true;
  elements.solutionButton.hidden = true;
  elements.hintButton.hidden = challenge.isProject || challenge.hints.length === 0;
  elements.testList.replaceChildren();
  elements.testSummary.textContent = 'Not run';
  saveProgress();
  updateLineNumbers();
}

function updateHelpCounter() {
  const count = document.getElementById('student-helped-count');
  if (count) count.textContent = String(state.progress?.helpCount || 0);
  if (elements.ethicalAd) elements.ethicalAd.hidden = (state.progress?.helpCount || 0) < 5;
}

function renderDatasetList() {
  if (!elements.datasetList) return;
  elements.datasetList.innerHTML = Object.entries(SAMPLE_DATA).map(([name, rows]) =>
    `<button type="button" class="mini-dataset" data-name="${name}">${escapeHtml(name)} <span>${rows.length} rows</span></button>`
  ).join('');
  elements.datasetList.querySelectorAll('.mini-dataset').forEach((button) => button.addEventListener('click', () => {
    state.importedData = false;
    state.activeDatasetName = button.dataset.name;
    state.activeData = SAMPLE_DATA[state.activeDatasetName];
    renderActiveDataset();
  }));
}

function renderActiveDataset() {
  state.sourceTable = state.activeData;
  if (elements.datasetName) elements.datasetName.textContent = `${state.activeDatasetName}${state.importedData ? '' : '.csv'}`;
  if (elements.datasetSize) elements.datasetSize.textContent = `${state.activeData.length} rows`;
  if (elements.columnCount) elements.columnCount.textContent = `${Object.keys(state.activeData[0] || {}).length} columns`;
  renderSourceTable();
}

function renderSourceTable() {
  const table = elements.sourceTable;
  if (!table) return;
  const rows = state.activeData || [];
  if (!rows.length) {
    table.innerHTML = '<tbody><tr><td>No rows in this dataset.</td></tr></tbody>';
    return;
  }
  const columns = Object.keys(rows[0]);
  table.innerHTML = `<thead><tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join('')}</tr></thead><tbody>${rows.slice(0, 7).map((row) =>
    `<tr>${columns.map((column) => `<td>${escapeHtml(row[column] == null ? '' : String(row[column]))}</td>`).join('')}</tr>`
  ).join('')}</tbody>`;
}

function renderResultTable(rows) {
  const output = document.getElementById('output-table');
  const count = document.getElementById('result-count');
  if (count) count.textContent = rows.length ? `${rows.length} rows` : 'No result rows';
  if (!output) return;
  if (!rows.length) {
    output.innerHTML = '<p class="empty-state">No result rows returned.</p>';
    return;
  }
  const columns = Object.keys(rows[0]);
  output.innerHTML = `<div class="result-table-wrap"><table class="result-data-table"><thead><tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join('')}</tr></thead><tbody>${rows.slice(0, 8).map((row) =>
    `<tr>${columns.map((column) => `<td>${escapeHtml(row[column] == null ? '' : String(row[column]))}</td>`).join('')}</tr>`
  ).join('')}</tbody></table></div>`;
}

function renderChart() {
  if (!state.activeData?.length) return;
  const row = state.activeData[0];
  const category = Object.keys(row).find((key) => typeof row[key] === 'string');
  const value = Object.keys(row).find((key) => Number.isFinite(Number(row[key])));
  if (!category || !value || !window.Chart) return;
  const groups = new Map();
  state.activeData.forEach((item) => groups.set(String(item[category]), (groups.get(String(item[category])) || 0) + (Number(item[value]) || 0)));
  renderChartSpec({ type: 'bar', category, value, labels: [...groups.keys()], values: [...groups.values()] });
}

function updateLineNumbers() {
  if (!elements.challengeCode || !elements.lineNumbers) return;
  const lineCount = elements.challengeCode.value.split('\n').length;
  elements.lineNumbers.textContent = Array.from({ length: lineCount }, (_, index) => index + 1).join('\n');
  elements.lineNumbers.scrollTop = elements.challengeCode.scrollTop;
}

function formatResult(result) {
  if (result.value != null) return `Result: ${JSON.stringify(result.value)}`;
  if (result.rows?.length) return `Returned ${result.rows.length} row(s).`;
  if (result.chart) return `Rendered ${result.chart.type} chart with ${result.chart.points.length} group(s).`;
  return 'Code ran successfully.';
}

function markdownToHtml(markdown) {
  return markdown.split('\n').map((line) => {
    const safe = escapeHtml(line);
    if (safe.startsWith('### ')) return `<h4>${safe.slice(4)}</h4>`;
    if (safe.startsWith('## ')) return `<h3>${safe.slice(3)}</h3>`;
    if (safe.startsWith('- ')) return `<p class="instruction-bullet">${safe.slice(2)}</p>`;
    return safe ? `<p>${safe.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</p>` : '';
  }).join('');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function importDatasetFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      let rows;
      if (file.name.toLowerCase().endsWith('.json')) {
        const json = JSON.parse(String(reader.result));
        rows = Array.isArray(json) ? json : json.rows;
      } else if (window.Papa) {
        const parsed = window.Papa.parse(String(reader.result), { header: true, dynamicTyping: true, skipEmptyLines: true });
        if (parsed.errors.length) throw new Error(parsed.errors[0].message);
        rows = parsed.data;
      } else {
        throw new Error('Papa Parse did not load. Check the network connection and retry.');
      }
      if (!Array.isArray(rows) || !rows.length || typeof rows[0] !== 'object') throw new Error('Choose a CSV or JSON file containing an array of row objects.');
      state.activeData = rows;
      state.activeDatasetName = file.name;
      state.importedData = true;
      renderActiveDataset();
      renderChallengeCurriculum();
      showToast(`Imported ${rows.length} rows from ${file.name}.`);
    } catch (error) {
      showToast(`Import failed: ${error.message}`);
    }
    event.target.value = '';
  };

  function bindPageNavigation() {
    document.querySelectorAll('.nav-link[data-page]').forEach((button) => {
      button.addEventListener('click', () => navigateToPage(button.dataset.page));
    });

    window.addEventListener('hashchange', () => {
      navigateToPage(window.location.hash === '#assignment-page' ? 'assignment' : 'learn', false);
    });

    navigateToPage(window.location?.hash === '#assignment-page' ? 'assignment' : 'learn', false);
  }

  function navigateToPage(page, updateHash = true) {
    const assignmentVisible = page === 'assignment';
    const learnPage = document.getElementById('learn-page');
    const assignmentPage = document.getElementById('assignment-page');
    if (!learnPage || !assignmentPage) return;

    learnPage.hidden = assignmentVisible;
    assignmentPage.hidden = !assignmentVisible;
    learnPage.classList.toggle('is-visible', !assignmentVisible);
    assignmentPage.classList.toggle('is-visible', assignmentVisible);
    document.querySelectorAll('.nav-link[data-page]').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.page === (assignmentVisible ? 'assignment' : 'learn'));
    });

    const nextHash = assignmentVisible ? '#assignment-page' : '#learn-page';
    if (updateHash && window.location && window.location.hash !== nextHash) window.location.hash = nextHash;
  }
  reader.onerror = () => showToast('The selected file could not be read.');
  reader.readAsText(file);
}

function saveCertificationProject(challenge) {
  const project = {
    id: `${challenge.id}-${Date.now()}`,
    name: challenge.title,
    type: 'certification',
    layer: state.layer,
    tool: challenge.tool,
    lesson: challenge.title,
    code: elements.challengeCode.value,
    createdAt: new Date().toISOString(),
    dataset: state.activeData.slice(0, 30)
  };
  const saved = JSON.parse(localStorage.getItem('sunnystudy_projects') || '[]');
  if (!saved.some((item) => item.lesson === challenge.title && item.layer === state.layer)) saved.unshift(project);
  localStorage.setItem('sunnystudy_projects', JSON.stringify(saved.slice(0, 30)));
  saveProjectToIndexedDb(project);
  renderProjectGallery();
  showToast('Certification project completed and saved.');
}

function saveCurrentProject() {
  const project = {
    id: `${Date.now()}`,
    name: state.currentChallenge ? state.currentChallenge.title : 'SunnyStudy project',
    type: 'draft',
    layer: state.layer,
    tool: state.currentChallenge?.tool || state.tool,
    lesson: state.currentChallenge?.title || 'Quick review',
    code: elements.challengeCode.value,
    createdAt: new Date().toISOString(),
    dataset: state.activeData.slice(0, 30)
  };
  const saved = JSON.parse(localStorage.getItem('sunnystudy_projects') || '[]');
  saved.unshift(project);
  localStorage.setItem('sunnystudy_projects', JSON.stringify(saved.slice(0, 30)));
  saveProjectToIndexedDb(project);
  renderProjectGallery();
  showToast('Project saved on this device.');
}

function renderProjectGallery() {
  state.projects = JSON.parse(localStorage.getItem('sunnystudy_projects') || '[]');
  if (!elements.projectGalleryList) return;
  elements.projectGalleryList.replaceChildren();
  if (!state.projects.length) {
    elements.projectGalleryList.textContent = 'Complete a capstone or save a project to see it here.';
    return;
  }
  state.projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    const title = document.createElement('strong');
    title.textContent = project.name;
    const meta = document.createElement('small');
    meta.textContent = `${project.layer} · ${project.tool} · ${project.type === 'certification' ? 'Certified project' : 'Draft'}`;
    const code = document.createElement('pre');
    code.textContent = project.code || 'No saved code';
    card.append(title, meta, code);
    elements.projectGalleryList.append(card);
  });
}

function showProjectGallery() {
  renderProjectGallery();
  elements.projectGalleryModal.classList.remove('hidden');
}

function restoreProjectState() {
  try {
    state.projects = JSON.parse(localStorage.getItem('sunnystudy_projects') || '[]');
  } catch (error) {
    state.projects = [];
  }
}

function exportCurrentCsv() {
  const rows = state.resultTable || [];
  if (!rows.length) {
    showToast('Run a challenge that returns rows before exporting.');
    return;
  }
  const columns = Object.keys(rows[0]);
  const quote = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const csv = [columns.map(quote).join(','), ...rows.map((row) => columns.map((column) => quote(row[column])).join(','))].join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `sunnystudy-${state.layer}-${Date.now()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

window.addEventListener('DOMContentLoaded', init);
