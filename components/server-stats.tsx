"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { CpuIcon, HardDriveIcon, NetworkIcon, UsersIcon } from "lucide-react"

const performanceData = [
  { time: "00:00", cpu: 25, ram: 30, bandwidth: 15, players: 10 },
  { time: "01:00", cpu: 30, ram: 32, bandwidth: 20, players: 15 },
  { time: "02:00", cpu: 35, ram: 40, bandwidth: 25, players: 20 },
  { time: "03:00", cpu: 40, ram: 45, bandwidth: 30, players: 25 },
  { time: "04:00", cpu: 35, ram: 40, bandwidth: 25, players: 22 },
  { time: "05:00", cpu: 30, ram: 35, bandwidth: 20, players: 18 },
  { time: "06:00", cpu: 25, ram: 30, bandwidth: 15, players: 15 },
  { time: "07:00", cpu: 30, ram: 35, bandwidth: 20, players: 20 },
  { time: "08:00", cpu: 35, ram: 40, bandwidth: 25, players: 25 },
]

export function ServerStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
          <CpuIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">35%</div>
          <p className="text-xs text-muted-foreground">+5% from last hour</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">RAM Usage</CardTitle>
          <HardDriveIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1.2 GB</div>
          <p className="text-xs text-muted-foreground">+0.2 GB from last hour</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bandwidth</CardTitle>
          <NetworkIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">25 Mbps</div>
          <p className="text-xs text-muted-foreground">+5 Mbps from last hour</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Players</CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">25/32</div>
          <p className="text-xs text-muted-foreground">+5 from last hour</p>
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Server Performance</CardTitle>
          <CardDescription>Server performance metrics over the last 8 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              cpu: {
                label: "CPU Usage",
                color: "hsl(var(--chart-1))",
              },
              ram: {
                label: "RAM Usage",
                color: "hsl(var(--chart-2))",
              },
              bandwidth: {
                label: "Bandwidth",
                color: "hsl(var(--chart-3))",
              },
              players: {
                label: "Players",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  stroke="var(--color-cpu)"
                  fill="var(--color-cpu)"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="ram"
                  stroke="var(--color-ram)"
                  fill="var(--color-ram)"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="bandwidth"
                  stroke="var(--color-bandwidth)"
                  fill="var(--color-bandwidth)"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="players"
                  stroke="var(--color-players)"
                  fill="var(--color-players)"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
