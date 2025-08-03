'use client'

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast width={{ md: 'sm' }}>
            {toast.type === 'loading' ? (
              <Spinner size='sm' color='blue.solid' />
            ) : null}
            <Stack gap='1' flex='1' maxWidth='100%'>
              {toast.title && <div>{toast.title}</div>}
              {toast.description && (
                <div>{toast.description}</div>
              )}
            </Stack>
            {toast.action && (
              <button>{toast.action.label}</button>
            )}
            {toast.closable && <button>×</button>}
          </Toast>
        )}
      </ChakraToaster>
    </Portal>
  )
}
