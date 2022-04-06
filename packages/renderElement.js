import { func, any } from '@whitekite/vue-types-extra'
import { isObject } from 'lodash'

export default {
  name: 'Render',
  functional: true,
  props: {
    render: func(),
    param: any(),
    row: any(),
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
