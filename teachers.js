const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cmdsCohort = process.argv.slice(2);

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort, count(assistance_requests) as total_assistances
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${cmdsCohort[0]}'
GROUP BY teacher, cohort
ORDER BY teacher;
`)
.then(res => {
  console.log('connected')
  console.log('-------------SQL Query Result----------');
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.teacher}`);
  });
})
.catch(err => console.log('query error', err.stack));