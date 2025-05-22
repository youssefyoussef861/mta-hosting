"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertCircleIcon,
  CheckCircleIcon,
  DownloadIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  UploadIcon,
} from "lucide-react"

type Resource = {
  id: number
  name: string
  version: string
  author: string
  status: "running" | "stopped" | "error"
  type: "gamemode" | "map" | "script"
}

const initialResources: Resource[] = [
  { id: 1, name: "race", version: "1.3.0", author: "MTA Team", status: "running", type: "gamemode" },
  { id: 2, name: "admin", version: "2.0.1", author: "MTA Team", status: "running", type: "script" },
  { id: 3, name: "custom_map", version: "1.0.0", author: "JohnDoe", status: "error", type: "map" },
  { id: 4, name: "freeroam", version: "1.5.2", author: "MTA Team", status: "stopped", type: "gamemode" },
  { id: 5, name: "vehicles", version: "2.1.0", author: "JaneDoe", status: "running", type: "script" },
  { id: 6, name: "weapons", version: "1.2.3", author: "AdminUser", status: "stopped", type: "script" },
]

export function ResourceManager() {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [searchQuery, setSearchQuery] = useState("")
  const [showOnlyRunning, setShowOnlyRunning] = useState(false)

  const filteredResources = resources.filter(
    (resource) =>
      (resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!showOnlyRunning || resource.status === "running"),
  )

  const toggleResourceStatus = (id: number) => {
    setResources(
      resources.map((resource) =>
        resource.id === id
          ? {
              ...resource,
              status: resource.status === "running" ? "stopped" : "running",
            }
          : resource,
      ),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Manager</CardTitle>
        <CardDescription>Manage scripts, gamemodes, and maps for your server</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-full sm:w-[250px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="show-running" checked={showOnlyRunning} onCheckedChange={setShowOnlyRunning} />
              <Label htmlFor="show-running">Show only running</Label>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Resource
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCwIcon className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Version</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">{resource.name}</TableCell>
                <TableCell className="hidden md:table-cell">{resource.version}</TableCell>
                <TableCell className="hidden md:table-cell">{resource.author}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {resource.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  {resource.status === "running" ? (
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircleIcon className="h-3 w-3" />
                      Running
                    </Badge>
                  ) : resource.status === "stopped" ? (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Stopped
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertCircleIcon className="h-3 w-3" />
                      Error
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant={resource.status === "running" ? "destructive" : "default"}
                      size="sm"
                      onClick={() => toggleResourceStatus(resource.id)}
                      disabled={resource.status === "error"}
                    >
                      {resource.status === "running" ? "Stop" : "Start"}
                    </Button>
                    <Button variant="outline" size="icon">
                      <DownloadIcon className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <UploadIcon className="h-4 w-4" />
                      <span className="sr-only">Update</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
