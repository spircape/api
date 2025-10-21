import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
 // 随机ID
 const randomId = Math.floor(Math.random() * 100) + 1
 // 构建随机图片URL
 const randomImageUrl = `https://box.zh.yuazhi.cn/410/random/${randomId}.jpg`

  // 重定向到随机图片
  return NextResponse.redirect(randomImageUrl)
}



