import { useSelector } from 'react-redux'

import { IState } from '../../../store/store'

function useSelection<TSelected>(
  selector: (state: IState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
  return useSelector<IState, TSelected>(selector, equalityFn)
}

export default useSelection
