
import React from "react";
import { Github, LogIn, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const LoginModal = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState("standard");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!email.includes('@') || password.length < 6) {
        throw new Error(t("login.invalidCredentials"));
      }
      
      // Check if admin login attempted
      if (isAdmin) {
        // In real implementation, this would verify admin credentials and permissions
        if (email.includes('admin')) {
          toast.success(t("login.adminSuccess"), {
            description: t("login.adminWelcomeBack"),
          });
        } else {
          throw new Error(t("login.adminAccessDenied"));
        }
      } else {
        toast.success(t("login.success"), {
          description: t("login.welcomeBack"),
        });
      }
      
      // Close the dialog after successful login
      setIsOpen(false);
      
      // Reset form
      setEmail("");
      setPassword("");
      setIsAdmin(false);
    } catch (error) {
      toast.error(t("login.failed"), {
        description: error instanceof Error ? error.message : t("login.checkCredentials"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(t("login.socialSuccess", { provider }), {
        description: t("login.welcomeBack"),
      });
      
      // Close the dialog after successful login
      setIsOpen(false);
    } catch (error) {
      toast.error(t("login.socialFailed", { provider }), {
        description: t("login.socialError"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <LogIn className="mr-2 h-4 w-4" />
          {t("login.login")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("login.title")}</DialogTitle>
          <DialogDescription>
            {t("login.description")}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="standard">{t("login.standardLogin")}</TabsTrigger>
            <TabsTrigger value="admin">{t("login.adminLogin")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="space-y-4">
            {/* Social login buttons */}
            <div className="flex flex-col gap-3">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleSocialLogin("Google")}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                {t("login.continueWith", { provider: "Google" })}
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleSocialLogin("GitHub")}
                disabled={isLoading}
              >
                <Github className="mr-2 h-4 w-4" />
                {t("login.continueWith", { provider: "GitHub" })}
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t("login.orContinueWith")}
                </span>
              </div>
            </div>
            
            {/* Email login form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="standard-email">{t("login.email")}</Label>
                <Input
                  id="standard-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="standard-password">{t("login.password")}</Label>
                <Input
                  id="standard-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember-me" 
                  checked={rememberMe} 
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("login.rememberMe")}
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? t("login.signingIn") : t("login.signIn")}
              </Button>
              <div className="text-center">
                <Button variant="link" className="p-0 h-auto text-xs">
                  {t("login.forgotPassword")}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="admin" className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
              <div className="flex">
                <Shield className="h-5 w-5 text-amber-500 mr-2" />
                <p className="text-sm text-amber-800">{t("login.adminWarning")}</p>
              </div>
            </div>
            
            {/* Admin login form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="admin-email">{t("login.adminEmail")}</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="admin-password">{t("login.adminPassword")}</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="admin-rights" 
                  checked={isAdmin} 
                  onCheckedChange={(checked) => setIsAdmin(checked === true)}
                />
                <label
                  htmlFor="admin-rights"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("login.requestAdminPrivileges")}
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                variant="default"
              >
                {isLoading ? t("login.signingIn") : t("login.adminSignIn")}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
