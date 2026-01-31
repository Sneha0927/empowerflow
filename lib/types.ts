export interface Employee {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: "Male" | "Female" | "Other"
  date_of_birth: string
  department: string
  position: string
  salary: number
  onboarding_date: string
  status: "active" | "on_leave" | "terminated"
  phone: string | null
  address: string | null
  created_at: string
  updated_at: string
}

export type EmployeeFormData = Omit<Employee, "id" | "created_at" | "updated_at">
