import { Sidebar } from "@/components/sidebar"
import { EmployeeTable } from "@/components/employee-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getEmployees } from "@/app/actions"
import { UserPlus, Search } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function EmployeesPage() {
  const employees = await getEmployees()

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Employees</h1>
            <p className="text-muted-foreground">
              Manage your workforce with ease. View, edit, or add new employees.
            </p>
          </div>
          <Link href="/employees/new">
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-9"
            />
          </div>
        </div>

        <EmployeeTable employees={employees} />
      </main>
    </div>
  )
}
