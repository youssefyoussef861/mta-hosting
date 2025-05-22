"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FileIcon,
  FolderIcon,
  MoreHorizontalIcon,
  UploadIcon,
  DownloadIcon,
  PlusIcon,
  TrashIcon,
  RefreshCwIcon,
  EditIcon,
  ServerIcon,
  KeyIcon,
} from "lucide-react"

type FileItem = {
  name: string
  type: "file" | "directory"
  size: string
  modified: string
  permissions: string
}

const mockFiles: FileItem[] = [
  { name: "resources", type: "directory", size: "-", modified: "2023-05-15 14:30", permissions: "drwxr-xr-x" },
  { name: "mods", type: "directory", size: "-", modified: "2023-05-10 09:15", permissions: "drwxr-xr-x" },
  { name: "logs", type: "directory", size: "-", modified: "2023-05-20 18:45", permissions: "drwxr-xr-x" },
  { name: "mtaserver.conf", type: "file", size: "4.2 KB", modified: "2023-05-01 12:00", permissions: "-rw-r--r--" },
  { name: "acl.xml", type: "file", size: "2.1 KB", modified: "2023-05-01 12:05", permissions: "-rw-r--r--" },
  { name: "vehiclecolors.conf", type: "file", size: "8.5 KB", modified: "2023-04-28 10:30", permissions: "-rw-r--r--" },
  { name: "banlist.xml", type: "file", size: "1.3 KB", modified: "2023-05-18 20:15", permissions: "-rw-r--r--" },
]

export function FileManager() {
  const [currentPath, setCurrentPath] = useState("/")
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [fileContent, setFileContent] = useState("")
  const [sftpDetails, setSftpDetails] = useState({
    host: "your-server-ip",
    port: "22",
    username: "mta-user",
  })

  const handleNavigate = (path: string) => {
    setCurrentPath(path)
    // In a real app, this would fetch files for the new path
  }

  const handleFileAction = (action: string, file: FileItem) => {
    setSelectedFile(file)

    if (action === "open" && file.type === "directory") {
      handleNavigate(`${currentPath}${file.name}/`)
    } else if (action === "edit" && file.type === "file") {
      // In a real app, this would fetch the file content
      setFileContent(`This is the content of ${file.name}`)
    } else if (action === "delete") {
      // In a real app, this would delete the file
      setFiles(files.filter((f) => f.name !== file.name))
    }
  }

  const saveFileContent = () => {
    // In a real app, this would save the file content
    alert(`File ${selectedFile?.name} saved successfully!`)
  }

  const pathParts = currentPath.split("/").filter(Boolean)

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Manager</CardTitle>
        <CardDescription>Manage server files and SFTP connections</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="browser" className="space-y-4">
          <TabsList>
            <TabsTrigger value="browser">File Browser</TabsTrigger>
            <TabsTrigger value="sftp">SFTP Connection</TabsTrigger>
          </TabsList>

          <TabsContent value="browser" className="space-y-4">
            <div className="flex items-center justify-between">
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => handleNavigate("/")}>root</BreadcrumbLink>
                </BreadcrumbItem>
                {pathParts.map((part, index) => (
                  <BreadcrumbItem key={index}>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    <BreadcrumbLink onClick={() => handleNavigate(`/${pathParts.slice(0, index + 1).join("/")}/`)}>
                      {part}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <RefreshCwIcon className="h-4 w-4" />
                  Refresh
                </Button>
                <Button size="sm" className="flex items-center gap-2">
                  <UploadIcon className="h-4 w-4" />
                  Upload
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <PlusIcon className="h-4 w-4" />
                      New
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New</DialogTitle>
                      <DialogDescription>Create a new file or directory</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Type</Label>
                        <div className="col-span-3 flex gap-4">
                          <div className="flex items-center gap-2">
                            <input type="radio" id="type-file" name="type" defaultChecked />
                            <label htmlFor="type-file">File</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="radio" id="type-directory" name="type" />
                            <label htmlFor="type-directory">Directory</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Modified</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.name}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {file.type === "directory" ? (
                          <FolderIcon className="h-4 w-4 text-blue-500" />
                        ) : (
                          <FileIcon className="h-4 w-4 text-gray-500" />
                        )}
                        <span
                          className={file.type === "directory" ? "cursor-pointer hover:underline" : ""}
                          onClick={() => file.type === "directory" && handleFileAction("open", file)}
                        >
                          {file.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{file.type === "directory" ? "Directory" : "File"}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.modified}</TableCell>
                    <TableCell>
                      <code className="text-xs">{file.permissions}</code>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {file.type === "directory" ? (
                            <DropdownMenuItem onClick={() => handleFileAction("open", file)}>
                              <FolderIcon className="h-4 w-4 mr-2" />
                              Open
                            </DropdownMenuItem>
                          ) : (
                            <>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <EditIcon className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle>Edit {file.name}</DialogTitle>
                                  </DialogHeader>
                                  <Textarea
                                    className="font-mono text-sm h-[400px]"
                                    value={fileContent}
                                    onChange={(e) => setFileContent(e.target.value)}
                                  />
                                  <DialogFooter>
                                    <Button onClick={saveFileContent}>Save</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <DropdownMenuItem>
                                <DownloadIcon className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleFileAction("delete", file)}>
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="sftp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SFTP Connection Details</CardTitle>
                <CardDescription>Use these details to connect via SFTP client</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sftp-host">Host</Label>
                    <div className="flex">
                      <Input
                        id="sftp-host"
                        value={sftpDetails.host}
                        onChange={(e) => setSftpDetails({ ...sftpDetails, host: e.target.value })}
                        readOnly
                      />
                      <Button variant="ghost" size="icon" className="ml-2">
                        <ServerIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sftp-port">Port</Label>
                    <Input
                      id="sftp-port"
                      value={sftpDetails.port}
                      onChange={(e) => setSftpDetails({ ...sftpDetails, port: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sftp-username">Username</Label>
                    <Input
                      id="sftp-username"
                      value={sftpDetails.username}
                      onChange={(e) => setSftpDetails({ ...sftpDetails, username: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sftp-auth">Authentication</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <input type="radio" id="auth-password" name="auth" defaultChecked />
                        <label htmlFor="auth-password">Password</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="auth-key" name="auth" />
                        <label htmlFor="auth-key">SSH Key</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Connection String</h4>
                  <code className="text-sm block bg-background p-2 rounded border">
                    sftp://{sftpDetails.username}@{sftpDetails.host}:{sftpDetails.port}
                  </code>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Command Line</h4>
                  <code className="text-sm block bg-background p-2 rounded border">
                    sftp -P {sftpDetails.port} {sftpDetails.username}@{sftpDetails.host}
                  </code>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="flex items-center gap-2">
                  <KeyIcon className="h-4 w-4" />
                  Generate SSH Key
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
