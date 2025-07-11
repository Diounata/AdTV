import { PropsWithChildren } from 'react'
import { PageContent } from './page-content'
import { PageHeader } from './page-header'

const Root = ({ children }: PropsWithChildren) => <>{children}</>

export const MainContent = {
  Root,
  Header: PageHeader,
  Content: PageContent,
}
