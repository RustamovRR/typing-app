import { AnalyticsModule, TypingContentModule } from '@/modules/home'

export default function Home() {
  return (
    <main className="p-24">
      <h1 className="text-4xl font-semibold">Typing app</h1>
      <AnalyticsModule />
      <TypingContentModule />
    </main>
  )
}
