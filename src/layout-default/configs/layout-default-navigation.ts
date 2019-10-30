import { INavigationItem } from '../../shared/components/layout/header/interfaces'

function layoutDefaultNavigation(account: undefined | null): INavigationItem[] {
  let items: INavigationItem[] = []

  if (account) {
    items = items.concat([])
  } else {
    items = items.concat([
      {
        href: `#solutions`,
        name: 'Our Solutions'
      },
      {
        href: `#company`,
        name: 'The Company'
      },
      {
        href: `#contact`,
        name: 'Contact Us'
      }
    ])
  }

  return items
}

export default layoutDefaultNavigation
