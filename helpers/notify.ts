import { toast, ToastOptions } from 'react-toastify'
import { ToastContent } from 'react-toastify/dist/types'

export const newError = (message: ToastContent, options?: ToastOptions) => toast(message, { type: 'error', ...options })
export const newSuccess = (message: ToastContent, options?: ToastOptions) => toast(message, { type: 'success', ...options })
export const newInfo = (message: ToastContent, options?: ToastOptions) => toast(message, { type: 'info', ...options })
export const newWarning = (message: ToastContent, options?: ToastOptions) => toast(message, { type: 'warning', ...options })

export const Notify = {
	Error: newError,
	Success: newSuccess,
	Info: newInfo,
	Warning: newWarning
}
