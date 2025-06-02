-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY,
  ein VARCHAR(20) NOT NULL UNIQUE,
  business_bank_account VARCHAR(50) NOT NULL,
  control_number VARCHAR(50) NOT NULL,
  fed_tax_id VARCHAR(50) NOT NULL,
  state_tax_id VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  position VARCHAR(100) NOT NULL,
  salary NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payrolls table
CREATE TABLE IF NOT EXISTS payrolls (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL,
  pay_period_start DATE NOT NULL,
  pay_period_end DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
