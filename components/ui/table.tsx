import * as React from "react"
import { cn } from "@/lib/utils"
export const Table = ({ className, ...p }: React.ComponentProps<"table">) => <div className="surface-panel w-full overflow-auto"><table className={cn("w-full text-sm", className)} {...p} /></div>
export const TableHeader = (p: React.ComponentProps<"thead">) => <thead className="bg-muted/70" {...p} />
export const TableBody = (p: React.ComponentProps<"tbody">) => <tbody {...p} />
export const TableRow = ({ className, ...p }: React.ComponentProps<"tr">) => <tr className={cn("border-b transition-colors hover:bg-muted/45 last:border-0", className)} {...p} />
export const TableHead = ({ className, ...p }: React.ComponentProps<"th">) => <th className={cn("h-12 px-5 text-left text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground", className)} {...p} />
export const TableCell = ({ className, ...p }: React.ComponentProps<"td">) => <td className={cn("px-5 py-4", className)} {...p} />
