-- Companies Table
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ein VARCHAR(15) UNIQUE NOT NULL,
    fed_tax_id VARCHAR(20) NOT NULL,
    state_tax_id VARCHAR(20) NOT NULL,
    control_number VARCHAR(50) NOT NULL,
    business_bank_account VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Employees Table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    position VARCHAR(100),
    salary NUMERIC(10, 2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Paystubs Table
CREATE TABLE paystubs (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    pay_date DATE NOT NULL,
    gross_pay NUMERIC(10, 2) NOT NULL,
    taxes NUMERIC(10, 2),
    net_pay NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
