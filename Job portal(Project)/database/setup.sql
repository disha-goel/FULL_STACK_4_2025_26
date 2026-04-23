-- Run this in MySQL Workbench or MySQL CLI before starting the backend

CREATE DATABASE IF NOT EXISTS easyjobsdb;
USE easyjobsdb;

-- Tables are auto-created by Spring Boot (ddl-auto=update)
-- This script just creates the database

-- To verify after running the backend, check these tables:
-- SELECT * FROM users;
-- SELECT * FROM jobs;
-- SELECT * FROM applications;
