"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BanIcon, MessageSquareIcon, MoreHorizontalIcon, ShieldIcon, UserIcon } from "lucide-react"

type Player = {
  id: number
  name: string
  ip: string
  ping: number
  playtime: string
  admin: boolean
}

const initialPlayers: Player[] = [
  { id: 1, name: "JohnDoe", ip: "192.168.1.1", ping: 45, playtime: "2h 15m", admin: false },
  { id: 2, name: "JaneDoe", ip: "192.168.1.2", ping: 60, playtime: "1h 30m", admin: false },
  { id: 3, name: "AdminUser", ip: "192.168.1.3", ping: 30, playtime: "5h 45m", admin: true },
  { id: 4, name: "PlayerOne", ip: "192.168.1.4", ping: 75, playtime: "0h 45m", admin: false },
  { id: 5, name: "PlayerTwo", ip: "192.168.1.5", ping: 90, playtime: "3h 20m", admin: false },
  { id: 6, name: "ModeratorUser", ip: "192.168.1.6", ping: 35, playtime: "4h 10m", admin: true },
]

export function PlayerList() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPlayers = players.filter(
    (player) => player.name.toLowerCase().includes(searchQuery.toLowerCase()) || player.ip.includes(searchQuery),
  )

  const kickPlayer = (id: number) => {
    setPlayers(players.filter((player) => player.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Management</CardTitle>
        <CardDescription>Manage players currently connected to your server</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline">Refresh</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">IP Address</TableHead>
              <TableHead>Ping</TableHead>
              <TableHead className="hidden md:table-cell">Playtime</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.id}</TableCell>
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell className="hidden md:table-cell">{player.ip}</TableCell>
                <TableCell>
                  <Badge variant={player.ping < 50 ? "success" : player.ping < 100 ? "warning" : "destructive"}>
                    {player.ping} ms
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{player.playtime}</TableCell>
                <TableCell>
                  {player.admin ? (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <ShieldIcon className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      <UserIcon className="h-3 w-3 mr-1" />
                      Player
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <MessageSquareIcon className="h-4 w-4 mr-2" />
                        Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ShieldIcon className="h-4 w-4 mr-2" />
                        {player.admin ? "Remove Admin" : "Make Admin"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => kickPlayer(player.id)} className="text-red-600">
                        <BanIcon className="h-4 w-4 mr-2" />
                        Kick Player
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
