import { Sidebar } from "@/components/sidebar"
import { StatsCards } from "@/components/stats-cards"
import { EmployeeTable } from "@/components/employee-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStats, getEmployees, getDepartmentStats } from "@/app/actions"
import { UserPlus, TrendingUp } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const [stats, employees, departmentStats] = await Promise.all([
    getDashboardStats(),
    getEmployees(),
    getDepartmentStats(),
  ])

  const recentEmployees = employees.slice(0, 5)

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s an overview of your workforce.
            </p>
          </div>
          <Link href="/employees/new">
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        </div>

        <StatsCards stats={stats} />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="border-border/50 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Employees</CardTitle>
              <Link href="/employees">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <EmployeeTable employees={recentEmployees} />
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Department Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept: { department: string; count: number }) => {
                  const percentage = Math.round(
                    (Number(dept.count) / Number(stats.active_employees)) * 100
                  )
                  return (
                    <div key={dept.department} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">{dept.department}</span>
                        <span className="text-muted-foreground">
                          {dept.count} ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
