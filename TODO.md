# SunnyStudy TODO - Real World University

## DONE (v3)
- [x] 120 challenges structure
- [x] Real SQL SUMIF 120k test, Pyodide, HyperFormula
- [x] PWA sunnystudy-v3, manifest relative
- [x] Nav wiring, chart overflow fix

## NEXT - Phase 4 (Your job now)

### Phase 4a status (implemented in this workspace)
- [x] Add 15 primary deterministic domain datasets with at least 200 rows each, plus supporting hospital/retail tables
- [x] Upgrade the hospital, medicine forecast, and gas pipeline ETL capstones with client stories, three task steps, and output-based tests
- [x] Add a local certificate progress page with learner name, date, streak, capstone count, and jsPDF download
- [x] Add responsive stacking below 768px, chart max-height styling, Monaco container styling, and v4 service-worker cache
- [ ] Convert the remaining 12 capstones into multi-step client projects

### A. Editor & UX (Pro look)
- [ ] Replace textarea with Monaco editor (CDN monaco 0.44) for SQL/Python with autocomplete
- [ ] Result pagination: 25 rows + next/prev + search filter
- [x] Chart container max-height 380px + destroy old instance
- [x] Mobile responsive: workspace stack vertically <768px
- [ ] Sticky Run button + auto scroll to results

### B. Certificate & Portfolio (Job hunter)
- [x] Page #certificate: shows current progress out of 120, 15 capstones, streak, name input, date, Download PDF (jsPDF CDN)
- [ ] Export portfolio: button to download all completed projects as ZIP
- [ ] WhatsApp share: share dashboard image

### C. REAL LIFE PROJECTS - Upgrade 15 capstones to multi-step client projects

Replace blank capstones with these 15 real domains - each has 3 tasks + datasets:

**Data Analyst Cert (5 capstones):**
1. HOSPITAL INSTITUTE: Patient records messy CSVs - clean nulls, join admissions+doctors, forecast bed occupancy next month, Power BI dashboard + PDF report
2. GAS PIPELINE: Pipeline sensor data - detect leaks via SQL window functions, Excel forecast pressure drop, Chart anomaly
3. SCHOOL INSTITUTE: Student results 10k rows - grade distribution, fail prediction, parent report letter (mail merge style)
4. RETAIL STORE: Sales + inventory + suppliers 3 CSVs - profit calculation, reorder point, dashboard
5. AGRICULTURE: Crop yield weather data - correlate rain vs yield, forecast next season

**Data Scientist Cert (5 capstones):**
6. MEDICINE FORECAST: COVID/flu dataset - build Python linear regression to predict cases, evaluate accuracy, Chart forecast
7. ENERGY GAS: Gas consumption forecasting - time series Python, seasonal decomposition
8. BANK LOAN: Loan default prediction - Python classification, confusion matrix, risk score
9. TRAFFIC INSTITUTE: Faisalabad traffic data - peak hours, congestion prediction, map chart
10. E-COMMERCE: Customer churn - clustering, LTV prediction

**Data Engineer Cert (5 capstones):**
11. GAS PIPELINE ETL: Ingest IoT sensor JSON -> clean -> SQL DuckDB -> Python alert system
12. HOSPITAL ETL: HL7 medical records pipeline, de-duplicate, normalize, load
13. INSTITUTE ERP: Student + fees + attendance -> unified warehouse, daily sync job
14. SUPPLY CHAIN: Multiple warehouses CSVs -> unified stock, reorder automation
15. WEATHER DATA LAKE: API weather data -> parquet -> SQL analytics -> dashboard

Each capstone must have:
- [x] Real SAMPLE_DATA: 15 primary domains with 200+ rows each, plus supporting tables
- [x] 3 task steps and output-based tests on the first three example capstones
- [ ] Three task steps and output-based tests on the remaining 12 capstones
- Tests that check real output: e.g., test fn checks result contains forecast number, chart spec, cleaned row count
- Story: "Client: Faisalabad Gas Company needs..."

### D. Future Certs (240 total later)
- [ ] Full Stack Python: Flask mock + Pyodide API
- [ ] Freelance Fiverr: 5 real client briefs
- [ ] DuckDB Engineering

### E. Offline & Viral
- [ ] Cache Pyodide WASM in sw.js for offline
- [ ] Urdu hint toggle (store translations)
- [ ] Assignment builder: teacher picks challenges -> generate PDF
