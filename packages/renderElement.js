import { rulesT } from 'tqr'
import { isObject } from 'lodash'

export default {
  name: 'Render',
  functional: true,
  props: {
    render: rulesT.Function,
    param: rulesT.Any,
    row: rulesT.Any,
  },
  render(createElement, context) {
    const { param, row, render } = context.props
    const vnode = render(createElement, { param, row })
    if (isObject(vnode)) {
      return vnode
    }
    return <span>{vnode}</span>
  },
}
