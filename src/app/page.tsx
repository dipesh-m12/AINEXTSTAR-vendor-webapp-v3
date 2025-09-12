export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Good morning! 👋</h1>
        <p className="text-muted-foreground">Monday, September 8, 2025</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">24</div>
          <div className="text-sm text-muted-foreground">Today&apos;s Appointments</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">$2,840</div>
          <div className="text-sm text-muted-foreground">Today&apos;s Revenue</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">18</div>
          <div className="text-sm text-muted-foreground">Client Visits</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">87%</div>
          <div className="text-sm text-muted-foreground">Staff Utilization</div>
        </div>
      </div>
    </div>
  )
}
