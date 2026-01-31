"use server"

import { sql } from "@/lib/db"
import { revalidateTag } from "next/cache"
import type { EmployeeFormData } from "@/lib/types"

export async function getEmployees() {
  const employees = await sql`
    SELECT * FROM employees ORDER BY created_at DESC
  `
  return employees
}

export async function getEmployee(id: number) {
  const employees = await sql`
    SELECT * FROM employees WHERE id = ${id}
  `
  return employees[0] || null
}

export async function createEmployee(data: EmployeeFormData) {
  await sql`
    INSERT INTO employees (first_name, last_name, email, gender, date_of_birth, department, position, salary, onboarding_date, status, phone, address)
    VALUES (${data.first_name}, ${data.last_name}, ${data.email}, ${data.gender}, ${data.date_of_birth}, ${data.department}, ${data.position}, ${data.salary}, ${data.onboarding_date}, ${data.status}, ${data.phone}, ${data.address})
  `
  revalidateTag("employees", "max")
  return { success: true }
}

export async function updateEmployee(id: number, data: Partial<EmployeeFormData>) {
  await sql`
    UPDATE employees 
    SET 
      first_name = COALESCE(${data.first_name}, first_name),
      last_name = COALESCE(${data.last_name}, last_name),
      email = COALESCE(${data.email}, email),
      gender = COALESCE(${data.gender}, gender),
      date_of_birth = COALESCE(${data.date_of_birth}, date_of_birth),
      department = COALESCE(${data.department}, department),
      position = COALESCE(${data.position}, position),
      salary = COALESCE(${data.salary}, salary),
      onboarding_date = COALESCE(${data.onboarding_date}, onboarding_date),
      status = COALESCE(${data.status}, status),
      phone = COALESCE(${data.phone}, phone),
      address = COALESCE(${data.address}, address),
      updated_at = NOW()
    WHERE id = ${id}
  `
  revalidateTag("employees", "max")
  return { success: true }
}

export async function deleteEmployee(id: number) {
  await sql`DELETE FROM employees WHERE id = ${id}`
  revalidateTag("employees", "max")
  return { success: true }
}

export async function getDashboardStats() {
  const stats = await sql`
    SELECT 
      COUNT(*) as total_employees,
      COUNT(*) FILTER (WHERE status = 'active') as active_employees,
      COUNT(*) FILTER (WHERE status = 'on_leave') as on_leave,
      COUNT(DISTINCT department) as departments,
      AVG(salary)::numeric(10,2) as avg_salary
    FROM employees
  `
  return stats[0]
}

export async function getDepartmentStats() {
  const stats = await sql`
    SELECT department, COUNT(*) as count
    FROM employees
    WHERE status = 'active'
    GROUP BY department
    ORDER BY count DESC
  `
  return stats
}
