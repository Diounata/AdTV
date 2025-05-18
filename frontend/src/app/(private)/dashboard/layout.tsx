import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/features/dashboard/components/sidebar/app-sidebar'
import { SiteHeader } from '@/features/dashboard/components/sidebar/site-header'
import { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 md:px-6">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
