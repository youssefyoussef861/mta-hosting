"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlayIcon, MonitorStopIcon as StopIcon } from "lucide-react"

export function ServerStatus() {
  const [isRunning, setIsRunning] = useState(true)

  const toggleServer = () => {
    setIsRunning(!isRunning)
  }

  return (
    <div className="flex items-center gap-4">
      <Badge variant={isRunning ? "success" : "destructive"} className="px-3 py-1">
        {isRunning ? "Online" : "Offline"}
      </Badge>
      <Button
        variant={isRunning ? "destructive" : "default"}
        size="sm"
        onClick={toggleServer}
        className="flex items-center gap-2"
      >
        {isRunning ? (
          <>
            <StopIcon className="h-4 w-4" />
            Stop Server
          </>
        ) : (
          <>
            <PlayIcon className="h-4 w-4" />
            Start Server
          </>
        )}
      </Button>
    </div>
  )
}
