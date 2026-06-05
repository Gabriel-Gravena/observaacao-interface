"use client"

import * as React from "react"
import { DropdownMenu as Primitive } from "radix-ui"
import { cn } from "@/lib/utils"

const DropdownMenu = Primitive.Root
const DropdownMenuTrigger = Primitive.Trigger
const DropdownMenuSeparator = Primitive.Separator

function DropdownMenuContent({ className, sideOffset = 8, ...props }: React.ComponentProps<typeof Primitive.Content>) {
  return <Primitive.Portal><Primitive.Content sideOffset={sideOffset} className={cn("z-50 min-w-52 rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg", className)} {...props} /></Primitive.Portal>
}
function DropdownMenuItem({ className, ...props }: React.ComponentProps<typeof Primitive.Item>) {
  return <Primitive.Item className={cn("flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none hover:bg-muted focus:bg-muted", className)} {...props} />
}
function DropdownMenuLabel({ className, ...props }: React.ComponentProps<typeof Primitive.Label>) {
  return <Primitive.Label className={cn("px-3 py-2 text-xs font-medium text-muted-foreground", className)} {...props} />
}
export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger }
