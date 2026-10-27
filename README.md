# SunnyStudy

**A free, static interactive university for students.** SunnyStudy turns data lessons into certification challenges: read the instructions, write code, run a browser-based engine, and pass tests against the active dataset.

SunnyStudy is built with HTML, CSS, and vanilla JavaScript. It has no application server, account system, build step, or required package installation. The files can be served from a static host such as GitHub Pages or a basic web server.

For the longer introduction to the product and its architecture, read [The SunnyStudy Book](BOOK.md).

## What It Includes

- Three certifications: Data Analyst, Data Scientist, and Data Engineer.
- Five courses and eight challenges per certification course; every course ends with a no-hint project challenge.
- SQL, Excel formulas, Python, and chart-building challenges executed with sql.js, HyperFormula, Pyodide, and Chart.js.
- Built-in datasets plus CSV and JSON import for local practice.
- Pass/fail test lists, certification progress, study streak, hints after failed runs, and gated solutions.
- Local project saving and a Certification Gallery, retaining the existing IndexedDB and localStorage approach.
- A web app manifest and service worker for installability and best-effort caching.

## Run Locally

Service workers require localhost or HTTPS. From the project directory, start Python's built-in static server:

```sh
python3 -m http.server 8000
```

Open <http://127.0.0.1:8000/> in a browser. No build or dependency installation is required.

You can check the JavaScript syntax with:

```sh
node --check app.js
```

## Learn By Building

1. Choose a certification and expand one of its courses in the curriculum.
2. Read the challenge instructions and inspect the active dataset.
3. Edit the starter code in the center editor.
4. Run tests. Results show which requirements passed and failed.
5. After two failed runs, request a hint. After three, a solution is available on regular challenges. Projects are hint-free.
6. Pass challenges to build certification progress. Complete project challenges to add code to the local Certification Gallery.

Challenge code runs in the browser. SQL is evaluated by sql.js against a temporary `data` table, formulas by HyperFormula, Python by Pyodide, and Power BI-style chart specifications by Chart.js. The engines run locally in the browser; this is not a backend service.

## Learning Tracks

| Certification | Courses | Focus |
| --- | --- | --- |
| Data Analyst | Excel for Analysts; SQL Foundations; Python Data Inspection; Power BI Visual Stories; Analyst Portfolio | Summaries, filters, charts, and insight projects |
| Data Scientist | Statistics with Python; Time Series and Trends; Experiments and Cohorts; Machine Learning Foundations; Research Communication | Statistics, cohorts, forecasts, and research findings |
| Data Engineer | Warehouse SQL; Python Data Pipelines; Data Quality and Validation; Data Observability; Engineer Certification Project | Data cleanup, aggregation, validation, and pipeline checks |

Each certification currently contains 40 challenges across five courses, including five course-ending projects. The original 30 lesson ideas remain in the catalog, with additional exercises generated from each course's data and tool. The curriculum schema is generic and includes an empty Full Stack Python track as a future extension point.

## Architecture

- `index.html` provides the application shell, certification sidebar, three-panel challenge workspace, assignment builder, and gallery dialog.
- `styles.css` defines the responsive layout, visual system, and print presentation.
- `app.js` owns the course/challenge catalog, test callbacks, runtime adapters, progress, imports, and project saving.
- `manifest.json` describes the installable web app.
- `sw.js` caches the local app shell and best-effort caches successful runtime requests.

The engine libraries are loaded from jsDelivr. Progress, streak, drafts, hints, and help count use the `sunnystudy_progress` localStorage record. Project entries remain in localStorage and are also written to IndexedDB. Data stays in the current browser profile unless the user exports it.

## Current Capabilities and Limits

SunnyStudy remains an evolving prototype. The current certification engine executes the listed challenges, but this is not a general-purpose data platform:

- Several practice exercises are generated from each course's active tool and dataset; expand these templates with more authored instructions and varied test cases as the curriculum grows.
- Runtime libraries load from jsDelivr. The first visit needs internet access; the service worker caches successful requests on a best-effort basis, but large WASM runtimes and their dependent assets are not guaranteed to be available offline.
- SQL challenges run against a temporary table created from the current dataset. They do not connect to external databases.
- Python challenges execute in the browser sandbox. Pyodide packages beyond its base runtime are not automatically installed.
- Power BI challenges create and test a chart specification using Chart.js; SunnyStudy does not implement Microsoft's Power BI service or DAX engine.
- CSV/JSON imports replace the in-memory active dataset for the current browser session. They are not automatically stored as durable datasets.
- The assignment builder is retained, but its complete navigation and editing flow remains separate from the certification challenge engine.
- A viewed solution marks a later pass as assisted and excludes that challenge from full certification progress. Capstone projects have no hint or solution controls.

These distinctions are intentional documentation of the current code, not promises about completed functionality.

## Privacy and Offline Use

There is no SunnyStudy backend and no account or server-side analytics. Progress, drafts, streak, and help count are local. Imported file contents are processed in the browser and are not uploaded by SunnyStudy. Project names and code snapshots are stored in the browser's local storage/database. Clearing browser site data removes these local records.

The shell can be cached after the first successful load, but the app currently references fonts and libraries hosted by third parties. Full first-load offline operation is therefore not guaranteed. Use HTTPS or localhost for service-worker support.

## Static Deployment

Upload the app files to a static host and serve them over HTTPS. For a site hosted at the domain root, the default manifest start URL is suitable. For a project hosted beneath a path such as `https://example.com/sunnystudy/`, adjust `start_url` in `manifest.json` to a relative path such as `./index.html` and verify the service-worker scope on the host.

No build output is needed. Keep `index.html`, `styles.css`, `app.js`, `manifest.json`, and `sw.js` available from the same directory.

## Roadmap

1. Add richer written instruction, guided examples, and varied test cases to the generated practice challenges.
2. Add runtime startup states, package availability checks, and offline-friendly library loading.
3. Add more CSV schema validation and dataset persistence controls.
4. Finish the assignment-builder navigation, editing, autosave, and print workflow.
5. Add a Full Stack Python certification using the same generic course/challenge schema.

## Project Book

The companion [book](BOOK.md) introduces SunnyStudy for students and explains its layers, page flow, data lifecycle, storage model, offline behavior, and development roadmap.