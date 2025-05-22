"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { SaveIcon } from "lucide-react"

export function ServerConfiguration() {
  const [serverName, setServerName] = useState("My MTA:SA Server")
  const [serverPassword, setServerPassword] = useState("")
  const [maxPlayers, setMaxPlayers] = useState(32)
  const [serverPort, setServerPort] = useState(22003)
  const [httpPort, setHttpPort] = useState(22005)
  const [serverIP, setServerIP] = useState("0.0.0.0")
  const [aseEnabled, setAseEnabled] = useState(true)
  const [logLevel, setLogLevel] = useState("3")
  const [fpslimit, setFpslimit] = useState(60)
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to my MTA:SA server!")
  const [autoStartResources, setAutoStartResources] = useState("race, admin, freeroam")
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [voiceQuality, setVoiceQuality] = useState(3)
  const [syncInterval, setSyncInterval] = useState(100)
  const [bandwidth, setBandwidth] = useState(50000)

  const handleSave = () => {
    // In a real application, this would save the configuration to the server
    alert("Configuration saved successfully!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Configuration</CardTitle>
        <CardDescription>Configure your MTA:SA server settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="gameplay">Gameplay</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="server-name">Server Name</Label>
                <Input id="server-name" value={serverName} onChange={(e) => setServerName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="server-password">Server Password (leave empty for no password)</Label>
                <Input
                  id="server-password"
                  type="password"
                  value={serverPassword}
                  onChange={(e) => setServerPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-players">Max Players</Label>
                <Input
                  id="max-players"
                  type="number"
                  min="1"
                  max="128"
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="log-level">Log Level</Label>
                <Select value={logLevel} onValueChange={setLogLevel}>
                  <SelectTrigger id="log-level">
                    <SelectValue placeholder="Select log level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 - Errors only</SelectItem>
                    <SelectItem value="1">1 - Errors and warnings</SelectItem>
                    <SelectItem value="2">2 - Errors, warnings and info</SelectItem>
                    <SelectItem value="3">3 - All (including debug)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <Textarea
                  id="welcome-message"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ase-enabled">ASE (Server Browser) Enabled</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="ase-enabled" checked={aseEnabled} onCheckedChange={setAseEnabled} />
                  <Label htmlFor="ase-enabled">{aseEnabled ? "Enabled" : "Disabled"}</Label>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="network" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="server-ip">Server IP</Label>
                <Input id="server-ip" value={serverIP} onChange={(e) => setServerIP(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="server-port">Server Port</Label>
                <Input
                  id="server-port"
                  type="number"
                  min="1"
                  max="65535"
                  value={serverPort}
                  onChange={(e) => setServerPort(Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="http-port">HTTP Port</Label>
                <Input
                  id="http-port"
                  type="number"
                  min="1"
                  max="65535"
                  value={httpPort}
                  onChange={(e) => setHttpPort(Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bandwidth">Bandwidth Limit (bytes/sec)</Label>
                <Input
                  id="bandwidth"
                  type="number"
                  min="10000"
                  max="1000000"
                  value={bandwidth}
                  onChange={(e) => setBandwidth(Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sync-interval">Sync Interval (ms)</Label>
                <Input
                  id="sync-interval"
                  type="number"
                  min="50"
                  max="500"
                  value={syncInterval}
                  onChange={(e) => setSyncInterval(Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="voice-enabled">Voice Chat</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="voice-enabled" checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
                  <Label htmlFor="voice-enabled">{voiceEnabled ? "Enabled" : "Disabled"}</Label>
                </div>
              </div>
              {voiceEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="voice-quality">Voice Quality (1-10)</Label>
                  <div className="pt-2">
                    <Slider
                      id="voice-quality"
                      min={1}
                      max={10}
                      step={1}
                      value={[voiceQuality]}
                      onValueChange={(value) => setVoiceQuality(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="gameplay" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fpslimit">FPS Limit</Label>
                <Input
                  id="fpslimit"
                  type="number"
                  min="30"
                  max="120"
                  value={fpslimit}
                  onChange={(e) => setFpslimit(Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allow-client-scripts">Allow Client Scripts</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="allow-client-scripts" defaultChecked />
                  <Label htmlFor="allow-client-scripts">Enabled</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allow-client-files">Allow Client Files Download</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="allow-client-files" defaultChecked />
                  <Label htmlFor="allow-client-files">Enabled</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="verify-client-files">Verify Client Files</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="verify-client-files" defaultChecked />
                  <Label htmlFor="verify-client-files">Enabled</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allow-spectating">Allow Spectating</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="allow-spectating" defaultChecked />
                  <Label htmlFor="allow-spectating">Enabled</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="friendly-fire">Friendly Fire</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="friendly-fire" defaultChecked />
                  <Label htmlFor="friendly-fire">Enabled</Label>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="resources" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="auto-start">Auto-Start Resources (comma separated)</Label>
              <Textarea
                id="auto-start"
                value={autoStartResources}
                onChange={(e) => setAutoStartResources(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acl-file">ACL File Path</Label>
              <Input id="acl-file" defaultValue="acl.xml" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-folder">Resource Folder Path</Label>
              <Input id="resource-folder" defaultValue="resources" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="module-folder">Module Folder Path</Label>
              <Input id="module-folder" defaultValue="modules" />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <SaveIcon className="h-4 w-4" />
          Save Configuration
        </Button>
      </CardFooter>
    </Card>
  )
}
