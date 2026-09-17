Live Link :- [https://sqlarrowcleaner.netlify.app/](https://sqlarrowcleaner.netlify.app/)

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


