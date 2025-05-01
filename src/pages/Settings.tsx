
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const accountFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.string().min(1, { message: "Please select a role." }),
});

const systemFormSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required." }),
  address: z.string().min(5, { message: "Address is required." }),
  phone: z.string().min(5, { message: "Phone number is required." }),
  taxId: z.string().optional(),
  timezone: z.string().min(1, { message: "Please select a timezone." }),
  dateFormat: z.string().min(1, { message: "Please select a date format." }),
});

const preferenceSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  lowStockAlerts: z.boolean(),
  supplierUpdates: z.boolean(),
  orderNotifications: z.boolean(),
});

const Settings = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const accountForm = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      role: "administrator",
    },
  });

  const systemForm = useForm<z.infer<typeof systemFormSchema>>({
    resolver: zodResolver(systemFormSchema),
    defaultValues: {
      companyName: "ACME Supply Chain Solutions",
      address: "123 Supply Chain Ave, Business District, CA 90210",
      phone: "+1 (123) 456-7890",
      taxId: "12-3456789",
      timezone: "America/Los_Angeles",
      dateFormat: "MM/DD/YYYY",
    },
  });

  const preferencesForm = useForm<z.infer<typeof preferenceSchema>>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      lowStockAlerts: true,
      supplierUpdates: true,
      orderNotifications: true,
    },
  });

  function onSubmit(values: z.infer<typeof accountFormSchema>) {
    console.log(values);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  }

  function onSystemSubmit(values: z.infer<typeof systemFormSchema>) {
    console.log(values);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  }

  function onPreferencesSubmit(values: z.infer<typeof preferenceSchema>) {
    console.log(values);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and system preferences
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your personal account settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...accountForm}>
                <form
                  onSubmit={accountForm.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={accountForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="administrator">
                              Administrator
                            </SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center gap-2">
                    <Button type="submit">Save Changes</Button>
                    {isSuccess && (
                      <p className="text-green-600">Settings saved successfully!</p>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Update your company details and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...systemForm}>
                <form
                  onSubmit={systemForm.handleSubmit(onSystemSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={systemForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={systemForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={systemForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={systemForm.control}
                      name="taxId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax ID</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={systemForm.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timezone</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a timezone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="America/Los_Angeles">
                                Pacific Time (US & Canada)
                              </SelectItem>
                              <SelectItem value="America/Denver">
                                Mountain Time (US & Canada)
                              </SelectItem>
                              <SelectItem value="America/Chicago">
                                Central Time (US & Canada)
                              </SelectItem>
                              <SelectItem value="America/New_York">
                                Eastern Time (US & Canada)
                              </SelectItem>
                              <SelectItem value="UTC">UTC</SelectItem>
                              <SelectItem value="Europe/London">
                                London
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={systemForm.control}
                      name="dateFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Format</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select date format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="MM/DD/YYYY">
                                MM/DD/YYYY
                              </SelectItem>
                              <SelectItem value="DD/MM/YYYY">
                                DD/MM/YYYY
                              </SelectItem>
                              <SelectItem value="YYYY-MM-DD">
                                YYYY-MM-DD
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button type="submit">Save Changes</Button>
                    {isSuccess && (
                      <p className="text-green-600">Settings saved successfully!</p>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure your notification settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...preferencesForm}>
                <form
                  onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={preferencesForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <FormLabel className="text-base">
                            Email Notifications
                          </FormLabel>
                          <FormDescription>
                            Receive notifications via email
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={preferencesForm.control}
                    name="smsNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <FormLabel className="text-base">
                            SMS Notifications
                          </FormLabel>
                          <FormDescription>
                            Receive notifications via SMS
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={preferencesForm.control}
                    name="lowStockAlerts"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <FormLabel className="text-base">
                            Low Stock Alerts
                          </FormLabel>
                          <FormDescription>
                            Get notified when inventory items are low
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={preferencesForm.control}
                    name="supplierUpdates"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <FormLabel className="text-base">
                            Supplier Updates
                          </FormLabel>
                          <FormDescription>
                            Get notified about supplier changes
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={preferencesForm.control}
                    name="orderNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <FormLabel className="text-base">
                            Order Notifications
                          </FormLabel>
                          <FormDescription>
                            Get notified about order status changes
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center gap-2">
                    <Button type="submit">Save Preferences</Button>
                    {isSuccess && (
                      <p className="text-green-600">
                        Preferences saved successfully!
                      </p>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button className="mt-4">Update Password</Button>
              </div>

              <div className="pt-6 border-t space-y-2">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">
                      Use an authenticator app to generate one-time codes
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium">SMS Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Receive a code via SMS to verify your identity
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage API keys and credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">API Keys</h3>
                <p className="text-sm text-muted-foreground">
                  API keys are used to authenticate your API requests
                </p>
                <div className="rounded-md border">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Production Key</p>
                        <p className="text-xs text-muted-foreground">
                          Created: April 15, 2025
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        value="••••••••••••••••••••••••••••••"
                        readOnly
                        className="font-mono"
                      />
                      <Button variant="ghost" size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Development Key</p>
                        <p className="text-xs text-muted-foreground">
                          Created: April 20, 2025
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        value="••••••••••••••••••••••••••••••"
                        readOnly
                        className="font-mono"
                      />
                      <Button variant="ghost" size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t space-y-2">
                <h3 className="text-lg font-medium">Webhooks</h3>
                <p className="text-sm text-muted-foreground">
                  Configure webhooks to receive event notifications
                </p>
                <div className="rounded-md border">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Order Events</p>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      https://example.com/webhooks/orders
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Inventory Events</p>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      https://example.com/webhooks/inventory
                    </p>
                  </div>
                </div>
                <Button className="mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Webhook
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
