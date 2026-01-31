import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDepartmentStats, getEmployees } from "@/app/actions"
import { Building2, Users } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function DepartmentsPage() {
  const [departmentStats, employees] = await Promise.all([
    getDepartmentStats(),
    getEmployees(),
  ])

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Departments</h1>
          <p className="text-muted-foreground">
            Overview of all departments and their workforce distribution.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departmentStats.map((dept: { department: string; count: number }) => {
            const deptEmployees = employees.filter(
              (e: { department: string }) => e.department === dept.department
            )
            const avgSalary =
              deptEmployees.reduce((acc: number, e: { salary: number }) => acc + Number(e.salary), 0) /
              deptEmployees.length

            return (
              <Card key={dept.department} className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    {dept.department}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        Employees
                      </span>
                      <span className="font-semibold text-foreground">{dept.count}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Salary</span>
                      <span className="font-semibold text-foreground">
                        ${Math.round(avgSalary).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
