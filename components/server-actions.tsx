"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircleIcon, BellIcon, RefreshCwIcon, SendIcon, TerminalIcon, UploadIcon } from "lucide-react"

export function ServerActions() {
  const [announcement, setAnnouncement] = useState("")
  const [command, setCommand] = useState("")
  const [commandOutput, setCommandOutput] = useState("")
  const [backupName, setBackupName] = useState(`backup_${new Date().toISOString().slice(0, 10)}`)

  const sendAnnouncement = () => {
    if (announcement.trim()) {
      alert(`Announcement sent: ${announcement}`)
      setAnnouncement("")
    }
  }

  const executeCommand = () => {
    if (command.trim()) {
      setCommandOutput(`Executed: ${command}\n> Command completed successfully.`)
      setCommand("")
    }
  }

  const createBackup = () => {
    if (backupName.trim()) {
      alert(`Backup created: ${backupName}`)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Server Actions</CardTitle>
          <CardDescription>Perform administrative actions on your server</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="announcements" className="space-y-4">
            <TabsList>
              <TabsTrigger value="announcements" className="flex items-center gap-2">
                <BellIcon className="h-4 w-4" />
                Announcements
              </TabsTrigger>
              <TabsTrigger value="console" className="flex items-center gap-2">
                <TerminalIcon className="h-4 w-4" />
                Console
              </TabsTrigger>
              <TabsTrigger value="backup" className="flex items-center gap-2">
                <UploadIcon className="h-4 w-4" />
                Backup
              </TabsTrigger>
              <TabsTrigger value="restart" className="flex items-center gap-2">
                <RefreshCwIcon className="h-4 w-4" />
                Restart
              </TabsTrigger>
            </TabsList>
            <TabsContent value="announcements">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="announcement">Send Announcement to All Players</Label>
                  <Textarea
                    id="announcement"
                    placeholder="Type your announcement here..."
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button onClick={sendAnnouncement} className="flex items-center gap-2">
                  <SendIcon className="h-4 w-4" />
                  Send Announcement
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="console">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="command">Execute Console Command</Label>
                  <div className="flex gap-2">
                    <Input
                      id="command"
                      placeholder="Type command here..."
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                    />
                    <Button onClick={executeCommand}>Execute</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="output">Command Output</Label>
                  <Textarea id="output" readOnly value={commandOutput} rows={5} className="font-mono text-sm" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="backup">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-name">Backup Name</Label>
                  <Input id="backup-name" value={backupName} onChange={(e) => setBackupName(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Backup Options</Label>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backup-resources" defaultChecked />
                        <label htmlFor="backup-resources">Resources</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backup-config" defaultChecked />
                        <label htmlFor="backup-config">Configuration Files</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backup-logs" />
                        <label htmlFor="backup-logs">Log Files</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backup-database" defaultChecked />
                        <label htmlFor="backup-database">Database</label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Compression</Label>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="compression-none" name="compression" />
                        <label htmlFor="compression-none">None</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="compression-fast" name="compression" defaultChecked />
                        <label htmlFor="compression-fast">Fast</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="compression-best" name="compression" />
                        <label htmlFor="compression-best">Best</label>
                      </div>
                    </div>
                  </div>
                </div>
                <Button onClick={createBackup} className="flex items-center gap-2">
                  <UploadIcon className="h-4 w-4" />
                  Create Backup
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="restart">
              <div className="space-y-4">
                <div className="flex items-center p-4 border rounded-md bg-amber-50 text-amber-800 border-amber-200">
                  <AlertCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Warning</h4>
                    <p className="text-sm">
                      Restarting the server will disconnect all players. Make sure to notify them before proceeding.
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restart-message">Restart Message (optional)</Label>
                  <Input id="restart-message" placeholder="Server restarting in 1 minute..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restart-delay">Delay (seconds)</Label>
                  <Input id="restart-delay" type="number" min="0" max="300" defaultValue="60" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <SendIcon className="h-4 w-4" />
                    Notify Players
                  </Button>
                  <Button variant="destructive" className="flex items-center gap-2">
                    <RefreshCwIcon className="h-4 w-4" />
                    Restart Server
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
