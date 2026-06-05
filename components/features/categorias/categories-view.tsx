"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { createCategory, deleteCategory, updateCategory } from "@/api/categorias"
import { getApiErrorMessage } from "@/api/client"
import type { Category } from "@/api/types"
import { ConfirmDeleteDialog } from "@/components/features/shared/confirm-delete-dialog"
import { EmptyState } from "@/components/features/shared/empty-state"
import { ErrorState } from "@/components/features/shared/error-state"
import { LoadingState } from "@/components/features/shared/loading-state"
import { PageHeader } from "@/components/features/shared/page-header"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useCategorias } from "@/hooks/use-categorias"
import {
  categorySchema,
  type CategoryFormValues,
} from "@/lib/validations/server"

export function CategoriesView() {
  const { categories, isLoading, error, reload } = useCategorias()
  const [editing, setEditing] = useState<Category | null | undefined>(undefined)
  const [actionError, setActionError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(category: Category) {
    setDeletingId(category.id)
    setActionError("")
    setSuccessMessage("")
    try {
      await deleteCategory(category.id)
      setSuccessMessage("Categoria excluida com sucesso.")
      await reload()
    } catch (deleteError) {
      setActionError(getApiErrorMessage(deleteError))
    } finally {
      setDeletingId(null)
    }
  }

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState onRetry={reload} />

  return (
    <>
      <PageHeader
        title="Categorias"
        description="Organize os tipos de solicitação e suas regras."
        action={
          <Button onClick={() => setEditing(null)}>Nova categoria</Button>
        }
      />
      {actionError && <Alert className="mb-4">{actionError}</Alert>}
      {successMessage && (
        <p className="mb-4 rounded-md border border-status-resolved-foreground/15 bg-status-resolved p-3 text-sm text-status-resolved-foreground shadow-sm">
          {successMessage}
        </p>
      )}
      {categories.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoria</TableHead>
              <TableHead>Regras</TableHead>
              <TableHead>Acoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <p className="font-medium">{category.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    {category.descricao || "Sem descricao"}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {category.sensivel && (
                      <Badge variant="destructive">Sensivel</Badge>
                    )}
                    <Badge variant={category.ativa ? "secondary" : "outline"}>
                      {category.ativa ? "Ativa" : "Inativa"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditing(category)}
                    >
                      Editar
                    </Button>
                    <ConfirmDeleteDialog
                      title="Excluir categoria?"
                      description="Esta ação não pode ser desfeita."
                      isDeleting={deletingId === category.id}
                      onConfirm={() => handleDelete(category)}
                      trigger={
                        <Button variant="destructive" size="sm">
                          Excluir
                        </Button>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState
          title="Nenhuma categoria cadastrada"
          description="Crie a primeira categoria para organizar as solicitações."
        />
      )}
      <Dialog open={editing !== undefined} onOpenChange={(open) => !open && setEditing(undefined)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar categoria" : "Nova categoria"}</DialogTitle>
            <DialogDescription>
              Defina o nome, a disponibilidade e as regras de anonimato.
            </DialogDescription>
          </DialogHeader>
          <CategoryForm
            category={editing ?? undefined}
            onDone={async (message) => {
              setEditing(undefined)
              setSuccessMessage(message)
              await reload()
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

function CategoryForm({
  category,
  onDone,
}: {
  category?: Category
  onDone: (message: string) => void
}) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nome: category?.nome ?? "",
      descricao: category?.descricao ?? "",
      sensivel: category?.sensivel ?? false,
      ativa: category?.ativa ?? true,
    },
  })

  async function save(values: CategoryFormValues) {
    const payload = {
      nome: values.nome.trim(),
      descricao: values.descricao.trim() || undefined,
      sensivel: values.sensivel,
      ativa: values.ativa,
    }

    try {
      if (category) {
        await updateCategory(category.id, payload)
      } else {
        await createCategory(payload)
      }
      onDone(category ? "Categoria atualizada com sucesso." : "Categoria criada com sucesso.")
    } catch (saveError) {
      setError("root", { message: getApiErrorMessage(saveError) })
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(save)} noValidate>
      {errors.root?.message && <Alert>{errors.root.message}</Alert>}
      <div className="space-y-2">
        <Label htmlFor="category-name">Nome</Label>
        <Input
          id="category-name"
          aria-invalid={Boolean(errors.nome)}
          {...register("nome")}
        />
        {errors.nome?.message && (
          <p className="text-sm text-destructive">{errors.nome.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="category-description">Descricao</Label>
        <Textarea
          id="category-description"
          {...register("descricao")}
        />
      </div>
      <Controller
        control={control}
        name="sensivel"
        render={({ field }) => (
          <CategoryCheck
            id="category-sensitive"
            label="Categoria sensivel"
            checked={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="ativa"
        render={({ field }) => (
          <CategoryCheck
            id="category-active"
            label="Categoria ativa"
            checked={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Salvando..." : "Salvar categoria"}
      </Button>
    </form>
  )
}

function CategoryCheck({
  id,
  label,
  checked,
  onChange,
}: {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onChange(Boolean(value))}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}
