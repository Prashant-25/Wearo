import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

export default function TestUIPage() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-4">UI Components Test Page</h1>
        <p className="text-muted-foreground">
          A showcase of all available shadcn/ui components in this project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Buttons */}
        <div className="space-y-4 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-4 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold">Inputs</h2>
          <div className="space-y-4">
            <Input type="email" placeholder="Email" />
            <Input type="text" placeholder="Text input disabled" disabled />
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold">Card</h2>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content. This is some sample text.</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>

        {/* Dialog */}
        <div className="space-y-4 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold">Dialog</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>This is the dialog content.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Dropdown Menu */}
        <div className="space-y-4 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold">Dropdown Menu</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Dropdown</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Sheet */}
        <div className="space-y-4 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold">Sheet</h2>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <p>Sheet content here.</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Skeleton */}
        <div className="space-y-4 p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold">Skeleton</h2>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
