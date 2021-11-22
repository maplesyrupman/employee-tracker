select count(id) as 'total_employees', role_id where role_id in(select id from roles where dept_id = 4) from employees group by role_id; (didnt work)

select count(id) as 'total_employees', role_id from employees group by role_id; (worked) 

select first_name from employees where role_id in(select id from roles where dept_id = 4); (gets all employees from certain department) 

select count(id) as 'total employees' from employees where role_id in(select id from roles where dept_id = 4); (counts total number of employees dept)



-- all employees with salary and dept_id from a department
select employees.first_name, roles.salary, roles.dept_id
from (select * from employees where role_id in(select id from roles where dept_id = 4)) as employees
left join roles
on employees.role_id = roles.id;




-- total expenditure
select sum(salary) as total_expenditure from (select roles.salary as 'salary'
from (select * from employees where role_id in(select id from roles where dept_id = 4)) as employees
left join roles
on employees.role_id = roles.id) as total;

-- final draft

select sum(salary) as total_expenditure
from (
        select roles.salary as 'salary'
        from (
                select * 
                from employees 
                where role_id in(
                    select id
                    from roles 
                    where dept_id = 4)) 
        as employees
left join roles
on employees.role_id = roles.id) as total;








-- table of salaraies of all employees in a department
select roles.salary as 'salary'
from (select * from employees where role_id in(select id from roles where dept_id = 4)) as employees
left join roles
on employees.role_id = roles.id;

-- experimental!!!!!!!!!!!!!!!!!!!!!!!
select roles.salary as 'salary'
from (select * from employees where role_id in(select id from roles where dept_id = 4)) as employees
left join roles
on employees.role_id = roles.id;

