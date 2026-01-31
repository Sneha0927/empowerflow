import { Sidebar } from "@/components/sidebar"
import { EmployeeForm } from "@/components/employee-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewEmployeePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <Link
            href="/employees"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Employees
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Add New Employee</h1>
          <p className="text-muted-foreground">
            Fill in the information below to onboard a new team member.
          </p>
        </div>

        <EmployeeForm />
      </main>
    </div>
  )
}
