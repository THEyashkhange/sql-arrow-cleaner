# SQL Arrow Cleaner

A small browser-based utility for cleaning SQL copied from terminal sessions.

## What it does

It removes continuation prompt markers such as:

```text
->
=>
```

when they appear at the beginning of a line.

Example:

```sql
UPDATE employee
-> SET salary = salary + (salary * v_increment / 100)
-> WHERE Emp_ID = p_emp_id;
```

becomes:

```sql
UPDATE employee
SET salary = salary + (salary * v_increment / 100)
WHERE Emp_ID = p_emp_id;
```

The transformation happens entirely in the browser. No backend or database is required.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production files are generated in `dist/`.

## Deploy on Netlify

### Option 1: GitHub + Netlify

1. Push this project to GitHub.
2. In Netlify, choose **Add new project → Import an existing project**.
3. Select the GitHub repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy.

### Option 2: Netlify Drop

Run:

```bash
npm install
npm run build
```

Then drag the `dist` folder into Netlify Drop.

## Privacy

The app does not send the SQL anywhere. Cleaning is performed in the browser.
