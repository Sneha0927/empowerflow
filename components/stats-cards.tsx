import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, Clock, Building2, DollarSign } from "lucide-react"

interface StatsCardsProps {
  stats: {
    total_employees: number
    active_employees: number
    on_leave: number
    departments: number
    avg_salary: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Employees",
      value: stats.total_employees,
      icon: Users,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Active Employees",
      value: stats.active_employees,
      icon: UserCheck,
      color: "bg-accent/10 text-accent",
    },
    {
      title: "On Leave",
      value: stats.on_leave,
      icon: Clock,
      color: "bg-chart-3/10 text-chart-3",
    },
    {
      title: "Departments",
      value: stats.departments,
      icon: Building2,
      color: "bg-chart-4/10 text-chart-4",
    },
    {
      title: "Avg. Salary",
      value: `$${Number(stats.avg_salary).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-chart-5/10 text-chart-5",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <Card key={card.title} className="border-border/50">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
              <card.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
