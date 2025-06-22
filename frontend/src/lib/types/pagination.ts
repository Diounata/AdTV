export interface PaginationInput {
  page: number
  itemsPerPage?: number
  query?: string
}

export interface PaginationOutput<Entity> {
  page: number
  itemsPerPage?: number
  items: Entity[]
  totalItems: number
  totalPages: number
}
