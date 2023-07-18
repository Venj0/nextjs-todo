import { useState } from 'react'

export const useModalStatus = (): [boolean, { [K in 'on' | 'off']: () => void }] => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const switcher = {
		off: () => setIsOpen(false),
		on: () => setIsOpen(true)
	}

	return [isOpen, switcher]
}
