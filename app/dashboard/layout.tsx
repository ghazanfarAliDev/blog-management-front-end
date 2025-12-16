import { AppSidebar } from "@/components/sideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1 p-6 bg-gray-50 w-full">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
