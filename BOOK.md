# The SunnyStudy Book

## What SunnyStudy Is and How It Works

### A practical guide for students, educators, and contributors

---

## Contents

1. [Welcome to SunnyStudy](#1-welcome-to-sunnystudy)
2. [The Learning Idea](#2-the-learning-idea)
3. [Three Ways to Grow](#3-three-ways-to-grow)
4. [A Tour of the Workspace](#4-a-tour-of-the-workspace)
5. [What Happens When You Run a Lesson](#5-what-happens-when-you-run-a-lesson)
6. [Projects, Data, and Privacy](#6-projects-data-and-privacy)
7. [The Technology Behind the Workshop](#7-the-technology-behind-the-workshop)
8. [Offline Use and Hosting](#8-offline-use-and-hosting)
9. [What Works Today](#9-what-works-today)
10. [Where SunnyStudy Can Go Next](#10-where-sunnystudy-can-go-next)

---

## 1. Welcome to SunnyStudy

SunnyStudy is a small, free data-learning workshop that runs in a web browser. It is designed to make data practice approachable: choose a lesson, inspect a dataset, try a command, and look at the result.

The project is intentionally static. Its core is made from ordinary web files rather than a server application. That keeps the project easy to host and inspect, and means there is no SunnyStudy account or paid service required to open the local app.

SunnyStudy is also a work in progress. Some parts of the interface are prototypes, and some lessons demonstrate what a tool might do instead of running that tool's full runtime. This book explains the current behavior plainly so learners can explore with the right expectations.

## 2. The Learning Idea

Data work is easier to understand when a learner can connect three things:

- **The question:** What are we trying to learn?
- **The operation:** What command, formula, or transformation could answer it?
- **The evidence:** What changed in the data, table, or visualization?

SunnyStudy arranges the learning screen around that loop. A learner picks a layer and lesson, looks at a sample table, reads or edits a command, and reviews the resulting sample-based output. The aim is to make the reasoning visible, not to hide it behind a polished chart.

The examples use familiar themes such as sales, student engagement, and event activity. They are bundled demonstration data, not live data about real users.

## 3. Three Ways to Grow

SunnyStudy groups lessons into three learning tracks. Each track currently has ten lesson entries in the application code.

### L1: Analyst

The Analyst track focuses on asking useful questions of data and communicating findings. Example topics include data-quality checks, revenue by month, customer value, retention, and decision summaries.

### L2: Scientist

The Scientist track introduces investigation and modeling concepts: correlations, rolling averages, cohorts, experiment uplift, clustering, regression diagnostics, and anomaly detection. The sample lessons provide a vocabulary and examples for these ideas. The current app does not perform full scientific model training.

### L3: Engineer

The Engineer track follows data as it moves through a workflow. Lessons cover warehouse tables, event normalization, quality checks, timestamps, query design, observability, and deployment readiness. The current app presents these as learning scenarios rather than a production data pipeline.

### Tool modes

SQL, Excel, Python, and Power BI labels organize lessons by the kind of work they illustrate. Selecting a tool changes the editor area and lesson selection. The label is not a guarantee that a matching full-featured engine is active. The present command handler uses simple pattern checks and sample outputs for most lessons.

## 4. A Tour of the Workspace

The Learning Lab is organized into three work areas:

1. **Original file:** a preview of the active sample rows and columns.
2. **Command console:** a tool-themed editor and a run control.
3. **Visual result:** a lesson summary, a small output table, a chart, and command feedback.

The left syllabus controls the layer, tool, and lesson. A small dataset list provides three built-in examples: sales, student engagement, and events. The toolbar provides project saving, CSV export, a project gallery, and a local student-help counter.

An Assignment Builder is also present in the page markup, with fields for a student, institution, course, and assignment text. Its print action is connected, but the complete page navigation, live preview, and editor workflow are not yet fully connected in the current JavaScript.

## 5. What Happens When You Run a Lesson

Here is the current flow from selecting a lesson to seeing a result:

1. The browser loads `index.html`, `styles.css`, and `app.js`.
2. `app.js` defines the lesson catalog, sample rows, current layer, current tool, and UI event handlers.
3. Selecting a lesson places its example command in the selected editor and displays the associated sample dataset.
4. The Run control checks the text for familiar patterns such as `SELECT`, `SUM`, `corr`, or `COUNTIF`.
5. A matching demonstration function returns a prepared explanation and sample-based rows. This is not a general SQL parser, spreadsheet engine, Python interpreter, or Power BI model.
6. The result table is refreshed, and Chart.js draws a chart when its CDN script is available.

This teaching simulation makes the current project useful for discussing the shape of an analysis workflow. It should not be used to validate arbitrary code or to produce authoritative results for a real dataset.

### Browser runtimes

Pyodide is referenced from a CDN and requested when a Scientist lesson is run. Its current call reports the command and a sample row count; it does not execute the command as a prepared pandas notebook. A DuckDB-WASM helper is present for the Engineer track, but it does not currently execute the command entered by the learner. The page also references PapaParse, HyperFormula, and sql.js, but the current app logic does not call those libraries.

## 6. Projects, Data, and Privacy

### Sample data

The application includes three small JavaScript datasets:

- Sales by month, with revenue, orders, and region.
- Student engagement, with attendance, completed labs, and scores.
- Events, with dates, countries, amounts, and channels.

The dataset list selects among these in-memory examples. Although the page includes an Import Data file input, CSV and JSON file loading is not yet connected. The starter data is not persisted as an imported dataset.

### Saved projects

When a project is saved, SunnyStudy stores a project name, the selected layer and tool, the lesson title, a timestamp, a small dataset snapshot, and a generated preview image. The gallery reads project entries from `localStorage`. The same project is also written to an IndexedDB object store as an additional local copy.

The app does not send these project records to a SunnyStudy server. Browser storage is local to the current browser profile and can be removed by clearing site data. A saved project is a snapshot, not a collaborative cloud document.

### CSV export

The export control downloads the current result rows as a CSV file. It exports the app's displayed result state, which may be a demonstration result. Avoid treating simulated output as a computed result from your own file.

### Student-help counter

The counter is a local interaction tally kept in `localStorage`. It is not a count of unique students and is not sent to a server. It can be reset by clearing this site's browser data.

## 7. The Technology Behind the Workshop

SunnyStudy uses a deliberately small foundation:

- **HTML** describes the page and its controls.
- **CSS** provides the layout, responsive styling, and print styles.
- **Vanilla JavaScript** manages lessons, sample data, UI state, and browser storage.
- **Chart.js** draws the dashboard chart when loaded from its CDN.
- **Web Storage APIs** save project entries and the local counter.
- **IndexedDB** stores a second local copy of saved projects.
- **Service Worker and Web App Manifest** support caching and installability in compatible browsers.

The project does not require npm, a compile step, or a backend server. A local static server is useful for development because service workers are restricted to secure contexts such as HTTPS and localhost.

CDN scripts and the remote font are external dependencies. They may require internet access, and their availability is outside the static app's control. The local shell cache does not make every CDN dependency reliably available offline.

## 8. Offline Use and Hosting

### Run the project locally

From the SunnyStudy directory:

```sh
python3 -m http.server 8000
```

Then visit <http://127.0.0.1:8000/>. Node.js can be used for a syntax check, but it is not needed to run the app:

```sh
node --check app.js
```

### Static hosting

The files can be served by GitHub Pages or another static host. Place the app files together and serve them over HTTPS. When publishing under a repository path rather than at the domain root, review `start_url` in `manifest.json`; a relative `./index.html` may be appropriate. Check the service worker's scope and cached paths on the chosen host.

### What offline means here

After a successful visit, the service worker attempts to cache the local application shell. Its cache uses a versioned name, currently `sunnystudy-v1`. The browser still may need a network connection for third-party fonts and scripts, especially on the first visit. Offline support is therefore partial rather than a guarantee that every feature works without a network.

## 9. What Works Today

This table summarizes the current code rather than the eventual product direction.

| Area | Current status |
| --- | --- |
| Layer and lesson selection | Implemented for the bundled lesson catalog |
| Sample dataset previews | Implemented for the bundled examples |
| Command practice | Pattern-based demonstration results, not full language execution |
| Charts | Chart.js visualization when the CDN dependency loads |
| Project gallery | Local project entries stored in `localStorage` |
| Project backup | Project entries are also written to IndexedDB |
| CSV output export | Implemented for the current result rows |
| CSV/JSON input import | File input is present; parsing and loading are not wired |
| Python runtime | Pyodide load hook is present; lesson commands are not executed as notebook code |
| DuckDB runtime | Helper is incomplete; entered SQL is not executed by DuckDB |
| Spreadsheet engine | HyperFormula is referenced but not integrated |
| Assignment builder | Interface and print button exist; full interaction flow is incomplete |
| Offline support | Local shell caching is implemented; CDN assets may still need a network |

## 10. Where SunnyStudy Can Go Next

The most useful next development steps are practical and testable:

1. **Import real data:** parse CSV and JSON, validate row shapes, show a preview, and make the imported dataset the one used by the lesson.
2. **Execute real commands:** integrate each browser runtime behind a small adapter, and make clear which engine is active. Start with one tool and a safe, narrow lesson set.
3. **Finish the assignment flow:** connect navigation, live cover fields, assignment text, autosave, and print layout.
4. **Strengthen offline behavior:** pin compatible CDN assets, add explicit offline states, and test a clean first load and a repeat offline load.
5. **Add learner-facing explanations:** show how a command maps to each output and let students compare their expected result with the demonstration.

The guiding constraint should stay simple: add capability without pretending a simulation is a production engine. A learner should always be able to tell what ran, what data it used, and where the result was stored.

---

## Closing Note

SunnyStudy is a starting place for learning by doing. Its strongest promise is not that every data tool is already inside the browser; it is that the learning path, the examples, and the application itself remain open to inspection. Students can use the current workshop to explore ideas, while contributors can grow it toward real browser-based data work one verifiable feature at a time.