"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CopyIcon, GlobeIcon, NetworkIcon, ServerIcon, ShieldIcon } from "lucide-react"

export function ServerIPInfo() {
  const [serverInfo, setServerInfo] = useState({
    ipAddress: "203.0.113.42",
    port: "22003",
    httpPort: "22005",
    domain: "mta.example.com",
    status: "active",
    location: "Frankfurt, Germany",
    provider: "OVH",
    ddosProtection: true,
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server IP Information</CardTitle>
        <CardDescription>Connection details for your MTA:SA server</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ip-address">IP Address</Label>
            <div className="flex">
              <Input id="ip-address" value={serverInfo.ipAddress} readOnly />
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => copyToClipboard(serverInfo.ipAddress)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="game-port">Game Port</Label>
            <div className="flex">
              <Input id="game-port" value={serverInfo.port} readOnly />
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => copyToClipboard(`${serverInfo.ipAddress}:${serverInfo.port}`)}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="http-port">HTTP Port</Label>
            <Input id="http-port" value={serverInfo.httpPort} readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domain (if configured)</Label>
            <div className="flex">
              <Input id="domain" value={serverInfo.domain} readOnly />
              <Button variant="ghost" size="icon" className="ml-2" onClick={() => copyToClipboard(serverInfo.domain)}>
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="flex flex-col items-center p-3 border rounded-md">
            <ServerIcon className="h-5 w-5 mb-1 text-blue-500" />
            <span className="text-xs text-muted-foreground">Provider</span>
            <span className="font-medium">{serverInfo.provider}</span>
          </div>

          <div className="flex flex-col items-center p-3 border rounded-md">
            <GlobeIcon className="h-5 w-5 mb-1 text-green-500" />
            <span className="text-xs text-muted-foreground">Location</span>
            <span className="font-medium">{serverInfo.location}</span>
          </div>

          <div className="flex flex-col items-center p-3 border rounded-md">
            <NetworkIcon className="h-5 w-5 mb-1 text-purple-500" />
            <span className="text-xs text-muted-foreground">Status</span>
            <Badge variant="success" className="mt-1">
              {serverInfo.status}
            </Badge>
          </div>

          <div className="flex flex-col items-center p-3 border rounded-md">
            <ShieldIcon className="h-5 w-5 mb-1 text-amber-500" />
            <span className="text-xs text-muted-foreground">DDoS Protection</span>
            <Badge variant={serverInfo.ddosProtection ? "success" : "destructive"} className="mt-1">
              {serverInfo.ddosProtection ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-md">
          <h4 className="font-medium mb-2">Connection String</h4>
          <div className="flex items-center">
            <code className="text-sm block bg-background p-2 rounded border flex-1">
              mtasa://{serverInfo.ipAddress}:{serverInfo.port}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => copyToClipboard(`mtasa://${serverInfo.ipAddress}:${serverInfo.port}`)}
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
