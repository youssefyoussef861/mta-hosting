import type { Metadata } from "next"
import Link from "next/link"
import { ServerStatus } from "@/components/server-status"
import { ServerStats } from "@/components/server-stats"
import { PlayerList } from "@/components/player-list"
import { ResourceManager } from "@/components/resource-manager"
import { ServerActions } from "@/components/server-actions"
import { ServerConfiguration } from "@/components/server-configuration"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GamepadIcon, Settings2, Users, Package, Activity, Terminal, FileIcon } from "lucide-react"
import { FileManager } from "@/components/file-manager"
import { ServerIPInfo } from "@/components/server-ip-info"

export const metadata: Metadata = {
  title: "MTA:SA Server Dashboard",
  description: "Manage your Multi Theft Auto: San Andreas server",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <GamepadIcon className="h-6 w-6" />
          <span>MTA:SA Server Dashboard</span>
        </Link>
        <nav className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/docs">Documentation</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/support">Support</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <ServerStatus />
        </div>
        <ServerStats />
        <ServerIPInfo />
        <Tabs defaultValue="players" className="space-y-4">
          <TabsList className="grid grid-cols-6 md:w-[720px]">
            <TabsTrigger value="players" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Players</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2">
              <FileIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Files</span>
            </TabsTrigger>
            <TabsTrigger value="configuration" className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span className="hidden sm:inline">Configuration</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <span className="hidden sm:inline">Logs</span>
            </TabsTrigger>
            <TabsTrigger value="actions" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Actions</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="players" className="space-y-4">
            <PlayerList />
          </TabsContent>
          <TabsContent value="resources" className="space-y-4">
            <ResourceManager />
          </TabsContent>
          <TabsContent value="files" className="space-y-4">
            <FileManager />
          </TabsContent>
          <TabsContent value="configuration" className="space-y-4">
            <ServerConfiguration />
          </TabsContent>
          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Server Logs</CardTitle>
                <CardDescription>View real-time server logs and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] rounded-md border bg-muted p-4 font-mono text-sm overflow-auto">
                  <div className="text-green-500">[INFO] Server started successfully</div>
                  <div className="text-blue-500">[CONNECT] Player "JohnDoe" connected (IP: 192.168.1.1)</div>
                  <div className="text-yellow-500">[RESOURCE] Resource "race" started</div>
                  <div className="text-blue-500">[CONNECT] Player "JaneDoe" connected (IP: 192.168.1.2)</div>
                  <div className="text-red-500">[ERROR] Failed to load resource "custom_map"</div>
                  <div className="text-yellow-500">[RESOURCE] Resource "admin" started</div>
                  <div className="text-blue-500">[DISCONNECT] Player "JohnDoe" disconnected (Reason: Quit)</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="actions" className="space-y-4">
            <ServerActions />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t py-4 px-6">
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MTA:SA Server Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
