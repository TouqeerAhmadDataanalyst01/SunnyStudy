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

SunnyStudy is also a work in progress. Its 120 challenges use browser runtimes and test callbacks, but the curriculum is still relatively small and the assignment builder is not connected to the active controller. This book distinguishes working challenge features from unfinished areas.

## 2. The Learning Idea

Data work is easier to understand when a learner can connect three things:

- **The question:** What are we trying to learn?
- **The operation:** What command, formula, or transformation could answer it?
- **The evidence:** What changed in the data, table, or visualization?

SunnyStudy arranges the learning screen around that loop. A learner picks a layer and lesson, looks at a sample table, reads or edits a command, and reviews the resulting sample-based output. The aim is to make the reasoning visible, not to hide it behind a polished chart.

The examples use familiar themes such as sales, student engagement, and event activity. They are bundled demonstration data, not live data about real users.

## 3. Three Ways to Grow

SunnyStudy has three certifications. Each currently contains five courses with eight challenges per course, for 40 challenges per certification. Five challenges in each certification are course-ending projects with blank starter code and no hints or solutions. Six practice challenges per course are generated from reusable templates.

### L1: Analyst

The Analyst track focuses on asking useful questions of data and communicating findings. Example topics include data-quality checks, revenue by month, customer value, retention, and decision summaries.

### L2: Scientist

The Scientist track introduces investigation and modeling concepts: correlations, rolling averages, cohorts, experiment uplift, clustering, regression diagnostics, and anomaly detection. The sample lessons provide a vocabulary and examples for these ideas. The current app does not perform full scientific model training.

### L3: Engineer

The Engineer track follows data as it moves through a workflow. Lessons cover warehouse tables, event normalization, quality checks, timestamps, query design, observability, and deployment readiness. The current app presents these as learning scenarios rather than a production data pipeline.

### Tool modes

SQL, Excel, Python, and Power BI labels organize lessons by the kind of work they illustrate. Selecting a tool changes the editor area and lesson selection. The label is not a guarantee that a matching full-featured engine is active. The present command handler uses simple pattern checks and sample outputs for most lessons.

## 4. A Tour of the Workspace

The Learning Lab is organized as a curriculum sidebar and three work areas:

1. **Instructions:** challenge description, example, hints, and the active dataset preview.
2. **Code editor:** editable textarea with line numbers, Run tests, Reset, Hint, and Solution controls.
3. **Results:** test checklist, returned rows, chart, and runtime output.

The sidebar groups challenges into collapsible courses. The built-in datasets cover sales, student engagement, events, and user records. CSV and JSON files can be imported into the in-memory active dataset. The toolbar provides local project saving, CSV export, certification progress, study streak, and a project gallery.

An Assignment Builder is also present in the page markup, with fields for a student, institution, course, and assignment text. It is not connected to the active page-navigation and challenge controller; its live preview, editor workflow, and print experience are therefore unfinished.

## 5. What Happens When You Run a Lesson

Here is the current flow from selecting a lesson to seeing a result:

1. The browser loads the static app shell and runtime libraries from CDNs.
2. `app.js` expands the certification catalog and restores local progress.
3. Selecting a challenge loads its instructions, starter code, tests, and sample dataset.
4. Run dispatches SQL to sql.js, formulas to HyperFormula, Python to Pyodide, or chart specifications to Chart.js.
5. Test callbacks inspect actual engine results and code requirements, then update the checklist and local certification progress.

This is genuine browser-side execution for the supported challenge types, not a general-purpose data platform. Queries operate on a temporary local table, Python packages may be unavailable, charting is not Microsoft's Power BI service, and user imports may not match the columns expected by a challenge.

### Browser runtimes

Pyodide is loaded on demand and runs challenge Python code with a `rows` value decoded from the active dataset. sql.js creates an in-memory table named `data` and runs the submitted SQL via `db.exec`. HyperFormula calculates submitted formulas. Chart.js renders actual charts from JSON chart specifications and tests the resulting grouped values. Papa Parse reads CSV files; JSON imports use the browser's JSON parser. DuckDB-WASM is referenced by an unused legacy helper and is not part of the active challenge runner.

## 6. Projects, Data, and Privacy

### Sample data

The application includes four small JavaScript datasets:

- Sales by month, with revenue, orders, and region.
- Student engagement, with attendance, completed labs, and scores.
- Events, with dates, countries, amounts, and channels.
- Users, with identifiers, email values, and countries for data-quality practice.

The dataset list selects among these in-memory examples. CSV/JSON imports replace the active dataset for the current session; imports are not saved to local storage or IndexedDB, and the learner can restore a bundled sample from the instruction panel.

### Saved projects

When a project is saved or a capstone passes without viewing a solution, SunnyStudy stores the layer, tool, lesson, timestamp, code, and a small dataset snapshot. The gallery reads entries from `localStorage`. Projects are also written to an IndexedDB object store, but the gallery does not currently restore entries by reading IndexedDB.

The app does not send these project records to a SunnyStudy server. Browser storage is local to the current browser profile and can be removed by clearing site data. A saved project is a snapshot, not a collaborative cloud document.

### CSV export

The export control downloads the current result rows as a CSV file. It exports the app's displayed result state, which may be a demonstration result. Avoid treating simulated output as a computed result from your own file.

### Student-help counter

The help counter is stored as part of `sunnystudy_progress` and increases when hints or solutions are revealed. It is not a count of unique students and is not sent to a server. It can be reset by clearing this site's browser data.

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

After a successful visit, the service worker attempts to cache the local application shell and successful GET responses. Its cache uses a versioned name, currently `sunnystudy-v3`. The browser still may need a network connection for third-party fonts and runtime assets, especially on first load. Offline support is best-effort, not a guarantee that every runtime works without a network.

## 9. What Works Today

This table summarizes the current code rather than the eventual product direction.

| Area | Current status |
| --- | --- |
| Certification courses and challenges | 3 certifications, 5 courses × 8 challenges each |
| SQL challenges | Executed locally by sql.js against a temporary table |
| Spreadsheet challenges | Calculated by HyperFormula; generated ranges need care for imported datasets |
| Python challenges | Run in Pyodide; packages beyond its base runtime are not preinstalled |
| Chart challenges | Chart specifications are rendered and checked with Chart.js |
| CSV/JSON import | Connected; parsed data replaces the active in-memory dataset |
| Progress, hints, streak | Stored in `sunnystudy_progress` in localStorage |
| Certification gallery | Saves code and project data in localStorage and writes a secondary IndexedDB copy |
| Assignment builder | Markup remains but active navigation, editing, and print flow are unfinished |
| Offline support | Versioned app-shell cache with best-effort GET caching; CDN/WASM availability is not guaranteed |

## 10. Where SunnyStudy Can Go Next

The most useful next development steps are practical and testable:

1. **Deepen instruction:** author richer lessons for template-generated challenges and expand test coverage beyond code-pattern checks.
2. **Harden imported-data support:** validate schemas and adapt formula ranges and challenge expectations to varying columns and row counts.
3. **Build substantial capstones:** make projects multi-step and portfolio-worthy rather than single-command checks.
4. **Finish the assignment flow:** connect navigation, live cover fields, assignment text, autosave, and print layout.
5. **Strengthen offline behavior:** pin compatible CDN assets, add explicit offline states, and test clean first load and repeat offline use.

The guiding constraint should stay simple: add capability without pretending a simulation is a production engine. A learner should always be able to tell what ran, what data it used, and where the result was stored.

---

## Closing Note

SunnyStudy is a starting place for learning by doing. Its strongest promise is not that every data tool is already inside the browser; it is that the learning path, the examples, and the application itself remain open to inspection. Students can use the current workshop to explore ideas, while contributors can grow it toward real browser-based data work one verifiable feature at a time.