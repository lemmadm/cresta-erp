import { ModuleView } from "./module-view"

export default async function DashboardModulePage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params

  return <ModuleView slug={slug} />
}
