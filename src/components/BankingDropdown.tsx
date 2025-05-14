
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { CreditCard } from "lucide-react";
import PaymentIntegration from "./PaymentIntegration";

const BankingDropdown = () => {
  const { t } = useTranslation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          <span className="hidden md:inline">{t("banking.title", "Banking")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[400px] p-0">
        <div className="p-2">
          <PaymentIntegration />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BankingDropdown;
