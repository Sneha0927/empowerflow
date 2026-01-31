-- Create employees table for EmpowerFlow Employee Management System
CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(20),
  department VARCHAR(100),
  position VARCHAR(100),
  salary DECIMAL(12, 2),
  onboarding_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'active',
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);
CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);

-- Insert sample employees
INSERT INTO employees (first_name, last_name, email, phone, date_of_birth, gender, department, position, salary, onboarding_date, status, address)
VALUES 
  ('John', 'Smith', 'john.smith@company.com', '+1-555-0101', '1985-03-15', 'Male', 'Engineering', 'Senior Developer', 95000.00, '2022-01-15', 'active', '123 Tech Street, San Francisco, CA'),
  ('Sarah', 'Johnson', 'sarah.johnson@company.com', '+1-555-0102', '1990-07-22', 'Female', 'Marketing', 'Marketing Manager', 85000.00, '2021-06-01', 'active', '456 Market Ave, New York, NY'),
  ('Michael', 'Williams', 'michael.williams@company.com', '+1-555-0103', '1988-11-08', 'Male', 'Finance', 'Financial Analyst', 78000.00, '2023-02-20', 'active', '789 Finance Blvd, Chicago, IL'),
  ('Emily', 'Brown', 'emily.brown@company.com', '+1-555-0104', '1992-05-30', 'Female', 'Human Resources', 'HR Specialist', 65000.00, '2022-08-10', 'active', '321 HR Lane, Boston, MA'),
  ('David', 'Davis', 'david.davis@company.com', '+1-555-0105', '1987-09-14', 'Male', 'Engineering', 'Tech Lead', 120000.00, '2020-03-01', 'active', '654 Code Drive, Seattle, WA'),
  ('Jessica', 'Miller', 'jessica.miller@company.com', '+1-555-0106', '1994-12-03', 'Female', 'Sales', 'Sales Representative', 55000.00, '2023-05-15', 'active', '987 Sales Road, Austin, TX'),
  ('Christopher', 'Wilson', 'chris.wilson@company.com', '+1-555-0107', '1986-02-28', 'Male', 'Operations', 'Operations Manager', 90000.00, '2021-11-20', 'active', '147 Ops Street, Denver, CO'),
  ('Amanda', 'Taylor', 'amanda.taylor@company.com', '+1-555-0108', '1991-08-17', 'Female', 'Engineering', 'Software Engineer', 88000.00, '2022-04-05', 'active', '258 Dev Avenue, Portland, OR')
ON CONFLICT (email) DO NOTHING;
