
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import LoginModal from "./LoginModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ setSidebarOpen }: HeaderProps) => {
  const { t } = useTranslation();
  
  return (
    <header className="bg-white dark:bg-gray-900 border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder={t("common.search")}
            className="w-64 pl-8 bg-gray-100 dark:bg-gray-800 border-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <LoginModal />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>{t("common.notifications")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div>
                <p className="font-medium">{t("inventory.lowStock")}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("inventory.lowStockDescription", "Product \"Widget X\" is below threshold")}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {t("common.minutesAgo", "2 minutes ago")}
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div>
                <p className="font-medium">{t("orders.orderShipped", "Order #12345 shipped")}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("orders.packageOnWay", "Package is on its way to customer")}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {t("common.hoursAgo", "1 hour ago")}
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div>
                <p className="font-medium">{t("suppliers.newSupplierRequest", "New supplier request")}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("suppliers.supplierWantsToConnect", "Supplier \"ABC Corp\" wants to connect")}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {t("common.daysAgo", "2 days ago")}
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-scm-primary text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{t("user.name", "John Doe")}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("user.role", "Administrator")}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{t("common.profile")}</DropdownMenuItem>
            <DropdownMenuItem>{t("navigation.settings")}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t("common.logout")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
