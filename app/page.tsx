export const dynamic = 'force-dynamic'

export async function GET() {
  return new Response(
    JSON.stringify({
      success: true,
      code: 200,
      message: "所谓的奇迹，要真的发生才有价值。",
      version: "1.6"
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
