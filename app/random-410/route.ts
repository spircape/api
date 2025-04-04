import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // 随机选择图片源
  const isSourceOne = Math.random() < 0.5 // 50% 概率选择第一个图片源

  let randomId: number
  let randomImageUrl: string

  if (isSourceOne) {
    // 第一个图片源，随机数范围为 0-60（含60）
    randomId = Math.floor(Math.random() * 61)
    randomImageUrl = `https://zh.yuazhi.cn/at410/random/${randomId}.jpg`
  } else {
    // 第二个图片源，随机数范围为 0-40（含40）
    randomId = Math.floor(Math.random() * 41)
    randomImageUrl = `https://zh.yuazhi.cn/at410/random/2-${randomId}.jpg`
  }

  // 重定向到随机图片
  return NextResponse.redirect(randomImageUrl)
}



