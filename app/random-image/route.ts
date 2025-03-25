import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // List of image URLs
  const imageUrls = [
    "https://zh.yuazhi.cn/apipng/18CD3BE92227887D576B2D4B7A9C9960.jpg",
    "https://zh.yuazhi.cn/apipng/1.jpg",
    "https://zh.yuazhi.cn/apipng/2.jpg",
    "https://zh.yuazhi.cn/apipng/3.jpg",
    "https://zh.yuazhi.cn/apipng/4.jpg",
    "https://zh.yuazhi.cn/apipng/5.jpg",
  ]

  // Select a random image URL
  const randomIndex = Math.floor(Math.random() * imageUrls.length)
  const randomImageUrl = imageUrls[randomIndex]

  // Redirect to the random image
  return NextResponse.redirect(randomImageUrl)
}

