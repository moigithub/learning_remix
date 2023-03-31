import type { PropsWithChildren } from 'react'

interface Props {
  onClose: () => void
}

export const Modal = ({ children, onClose }: PropsWithChildren<Props>) => {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.8,
        background: '#222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <dialog open onClick={e => e.stopPropagation()}>
        {children}
      </dialog>
    </div>
  )
}
