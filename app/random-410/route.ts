import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // 生成1到50之间的随机ID
  const randomId = Math.floor(Math.random() * 50) + 1
  // 构建随机图片URL
  const randomImageUrl = `https://zh.yuazhi.cn/at410/random/${randomId}.jpg`

  // 重定向到随机图片
  return NextResponse.redirect(randomImageUrl)
}


