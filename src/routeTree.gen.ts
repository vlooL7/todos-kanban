/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TodosListImport } from './routes/todos/list'
import { Route as TodosColumnsImport } from './routes/todos/columns'

// Create Virtual Routes

const TodosListIndexLazyImport = createFileRoute('/todos/list/')()
const TodosColumnsIndexLazyImport = createFileRoute('/todos/columns/')()

// Create/Update Routes

const TodosListRoute = TodosListImport.update({
  path: '/todos/list',
  getParentRoute: () => rootRoute,
} as any)

const TodosColumnsRoute = TodosColumnsImport.update({
  path: '/todos/columns',
  getParentRoute: () => rootRoute,
} as any)

const TodosListIndexLazyRoute = TodosListIndexLazyImport.update({
  path: '/',
  getParentRoute: () => TodosListRoute,
} as any).lazy(() =>
  import('./routes/todos/list/index.lazy').then((d) => d.Route),
)

const TodosColumnsIndexLazyRoute = TodosColumnsIndexLazyImport.update({
  path: '/',
  getParentRoute: () => TodosColumnsRoute,
} as any).lazy(() =>
  import('./routes/todos/columns/index.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/todos/columns': {
      preLoaderRoute: typeof TodosColumnsImport
      parentRoute: typeof rootRoute
    }
    '/todos/list': {
      preLoaderRoute: typeof TodosListImport
      parentRoute: typeof rootRoute
    }
    '/todos/columns/': {
      preLoaderRoute: typeof TodosColumnsIndexLazyImport
      parentRoute: typeof TodosColumnsImport
    }
    '/todos/list/': {
      preLoaderRoute: typeof TodosListIndexLazyImport
      parentRoute: typeof TodosListImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  TodosColumnsRoute.addChildren([TodosColumnsIndexLazyRoute]),
  TodosListRoute.addChildren([TodosListIndexLazyRoute]),
])

/* prettier-ignore-end */
