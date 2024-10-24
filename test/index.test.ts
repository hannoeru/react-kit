import { renderHook } from '@testing-library/react-hooks'
import { useMount, useUnmount } from '../src'

describe('useUnmount', () => {
  it('only run once on unmounted', async () => {
    const fn = vi.fn()
    const hook = renderHook(() => useUnmount(fn))
    expect(fn).toHaveBeenCalledTimes(0)
    hook.rerender()
    expect(fn).toHaveBeenCalledTimes(0)
    hook.unmount()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('useMount', () => {
  it('only run once on mounted', async () => {
    const fn = vi.fn()
    const hook = renderHook(() => useMount(fn))
    expect(fn).toHaveBeenCalledTimes(1)
    hook.rerender()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
