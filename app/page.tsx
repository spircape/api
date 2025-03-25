"use client"

import { useState } from "react"
import { Copy, CheckCheck, ExternalLink, ImageIcon, UserCircle, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null)
  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  const randomImageUrl = `${baseUrl}/random-image`
  const gravatarProxyUrl = `${baseUrl}/gravatar`

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 mb-4">
            API Services
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Connect the world with us
          </p>
        </header>

        <Alert
          variant="destructive"
          className="mb-12 max-w-4xl mx-auto bg-red-50 border border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
        >
          <AlertTriangle className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
          <AlertTitle className="font-medium">Access Restricted</AlertTitle>
          <AlertDescription className="text-sm md:text-base">
            The API is not open to the public. If you need it, please contact us at{" "}
            <a
              href="mailto:10010@spircape.com"
              className="font-medium underline hover:text-red-600 dark:hover:text-red-300 transition-colors"
            >
              10010@spircape.com
            </a>
          </AlertDescription>
        </Alert>

        <Card className="border-none shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-b">
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Integration Guide
            </CardTitle>
            <CardDescription>Follow these examples to integrate our services into your application</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="random-image">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="random-image" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Random Image
                </TabsTrigger>
                <TabsTrigger value="gravatar" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  Gravatar Proxy
                </TabsTrigger>
              </TabsList>

              <TabsContent value="random-image" className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-medium">Random Image API</h3>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      GET
                    </Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    This API randomly serves an image from a predefined collection. Perfect for placeholder images,
                    random backgrounds, or testing purposes.
                  </p>

                  <div className="space-y-6 mt-8">
                    <div>
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <Code className="h-4 w-4 text-primary" />
                        HTML Usage
                      </h4>
                      <div className="relative">
                        <pre className="bg-slate-950 text-slate-100 p-4 rounded-md overflow-x-auto">
                          <code>{`<img src="${randomImageUrl}" alt="Random image" />`}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-800"
                          onClick={() =>
                            copyToClipboard(`<img src="${randomImageUrl}" alt="Random image" />`, "html-random")
                          }
                        >
                          {copied === "html-random" ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <Code className="h-4 w-4 text-primary" />
                        React Usage
                      </h4>
                      <div className="relative">
                        <pre className="bg-slate-950 text-slate-100 p-4 rounded-md overflow-x-auto">
                          <code>{`import { useState } from 'react';\n\nfunction RandomImage() {\n  const [refresh, setRefresh] = useState(0);\n  \n  return (\n    <img \n      src={\`${randomImageUrl || "/placeholder.svg"}?t=\${refresh}\`} \n      alt="Random image" \n      onClick={() => setRefresh(Date.now())}\n      className="cursor-pointer transition-opacity hover:opacity-90"\n    />\n  );\n}`}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-800"
                          onClick={() =>
                            copyToClipboard(
                              `import { useState } from 'react';\n\nfunction RandomImage() {\n  const [refresh, setRefresh] = useState(0);\n  \n  return (\n    <img \n      src={\`${randomImageUrl || "/placeholder.svg"}?t=\${refresh}\`} \n      alt="Random image" \n      onClick={() => setRefresh(Date.now())}\n      className="cursor-pointer transition-opacity hover:opacity-90"\n    />\n  );\n}`,
                              "react-random",
                            )
                          }
                        >
                          {copied === "react-random" ? (
                            <CheckCheck className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gravatar" className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-medium">Gravatar Proxy</h3>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      GET
                    </Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Our Gravatar proxy service improves loading speed and reliability for Gravatar images. It caches and
                    optimizes avatar delivery for your applications.
                  </p>

                  <div className="space-y-6 mt-8">
                    <div>
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <Code className="h-4 w-4 text-primary" />
                        Basic Usage
                      </h4>
                      <div className="relative">
                        <pre className="bg-slate-950 text-slate-100 p-4 rounded-md overflow-x-auto">
                          <code>{`<!-- Replace [EMAIL_HASH] with MD5 hash of the email -->\n<img src="${gravatarProxyUrl}/avatar/[EMAIL_HASH]" alt="User avatar" />`}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-800"
                          onClick={() =>
                            copyToClipboard(
                              `<!-- Replace [EMAIL_HASH] with MD5 hash of the email -->\n<img src="${gravatarProxyUrl}/avatar/[EMAIL_HASH]" alt="User avatar" />`,
                              "html-gravatar",
                            )
                          }
                        >
                          {copied === "html-gravatar" ? (
                            <CheckCheck className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <Code className="h-4 w-4 text-primary" />
                        With Size Parameter
                      </h4>
                      <div className="relative">
                        <pre className="bg-slate-950 text-slate-100 p-4 rounded-md overflow-x-auto">
                          <code>{`<!-- Set size to 200px -->\n<img src="${gravatarProxyUrl}/avatar/[EMAIL_HASH]?s=200" alt="User avatar" />`}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-800"
                          onClick={() =>
                            copyToClipboard(
                              `<!-- Set size to 200px -->\n<img src="${gravatarProxyUrl}/avatar/[EMAIL_HASH]?s=200" alt="User avatar" />`,
                              "size-gravatar",
                            )
                          }
                        >
                          {copied === "size-gravatar" ? (
                            <CheckCheck className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <Code className="h-4 w-4 text-primary" />
                        With Default Image
                      </h4>
                      <div className="relative">
                        <pre className="bg-slate-950 text-slate-100 p-4 rounded-md overflow-x-auto">
                          <code>{`<!-- Use 'identicon' as default if email has no Gravatar -->\n<img src="${gravatarProxyUrl}/avatar/[EMAIL_HASH]?d=identicon" alt="User avatar" />`}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-slate-800"
                          onClick={() =>
                            copyToClipboard(
                              `<!-- Use 'identicon' as default if email has no Gravatar -->\n<img src="${gravatarProxyUrl}/avatar/[EMAIL_HASH]?d=identicon" alt="User avatar" />`,
                              "default-gravatar",
                            )
                          }
                        >
                          {copied === "default-gravatar" ? (
                            <CheckCheck className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t bg-slate-50 dark:bg-slate-900 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <ExternalLink className="h-4 w-4" />
              <span>The above is for example only, please adjust according to the specific development environment</span>
            </div>
          </CardFooter>
        </Card>

        <footer className="text-center text-slate-500 text-sm py-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex justify-center items-center">
            <p>© {new Date().getFullYear()} Spircape. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

