import { type NextRequest, NextResponse } from "next/server"

// Replace with your mirror site's domain
const upstream = "gravatar.com"

// If it's a mobile-specific site, otherwise keep it the same as upstream
const upstream_mobile = "gravatar.com"

// Countries you wish to block from accessing
const blocked_region: string[] = []

// IP addresses you wish to block from accessing
const blocked_ip_address: string[] = []

// Replace the domains in the text response
const replace_dict: Record<string, string> = {
  $upstream: "$custom_domain",
  "//gravatar.com": "",
}

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const url = new URL(request.url)
  const url_host = url.host
  const user_agent = request.headers.get("user-agent") || ""

  // Determine if it's a mobile device
  const is_desktop = await device_status(user_agent)
  const upstream_domain = is_desktop ? upstream : upstream_mobile

  // Construct the upstream URL
  const path = params.path.join("/")
  const upstream_url = `https://${upstream_domain}/avatar/${path}${url.search}`

  try {
    // Fetch from upstream
    const upstream_response = await fetch(upstream_url, {
      headers: {
        Host: upstream_domain,
        "User-Agent": user_agent,
        Referer: url.href,
      },
    })

    // Clone the response so we can read it multiple times
    const original_response = upstream_response.clone()

    // Get the response headers
    const response_headers = new Headers(upstream_response.headers)

    // Set CORS headers
    response_headers.set("access-control-allow-origin", "*")
    response_headers.set("access-control-allow-credentials", "true")

    // Remove security headers that might cause issues
    response_headers.delete("content-security-policy")
    response_headers.delete("content-security-policy-report-only")
    response_headers.delete("clear-site-data")

    // Get the content type
    const content_type = response_headers.get("content-type") || ""

    // Process the response body
    let response_body
    if (content_type.includes("text/html") && content_type.includes("UTF-8")) {
      // If it's HTML, replace text
      const text = await original_response.text()
      response_body = replace_response_text(text, upstream_domain, url_host)
    } else {
      // Otherwise, just pass through the body
      response_body = original_response.body
    }

    // Create and return the new response
    return new NextResponse(response_body, {
      status: upstream_response.status,
      headers: response_headers,
    })
  } catch (error) {
    console.error("Gravatar proxy error:", error)
    return new NextResponse("Error proxying to Gravatar", { status: 500 })
  }
}

// Helper function to determine if the request is from a desktop device
function device_status(user_agent_info: string): boolean {
  const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
  let flag = true
  for (let v = 0; v < agents.length; v++) {
    if (user_agent_info.indexOf(agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

// Helper function to replace text in the response
function replace_response_text(text: string, upstream_domain: string, host_name: string): string {
  for (const [i, j] of Object.entries(replace_dict)) {
    let from = i
    let to = j

    if (from === "$upstream") {
      from = upstream_domain
    } else if (from === "$custom_domain") {
      from = host_name
    }

    if (to === "$upstream") {
      to = upstream_domain
    } else if (to === "$custom_domain") {
      to = host_name
    }

    const re = new RegExp(from, "g")
    text = text.replace(re, to)
  }
  return text
}
