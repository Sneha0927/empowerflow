import { Sidebar } from "@/components/sidebar"
import { EmployeeForm } from "@/components/employee-form"
import { getEmployee } from "@/app/actions"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const employee = await getEmployee(Number(id))

  if (!employee) {
    notFound()
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <Link
            href={`/employees/${employee.id}`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Edit Employee</h1>
          <p className="text-muted-foreground">
            Update {employee.name}&apos;s information below.
          </p>
        </div>

        <EmployeeForm employee={employee} />
      </main>
    </div>
  )
}
