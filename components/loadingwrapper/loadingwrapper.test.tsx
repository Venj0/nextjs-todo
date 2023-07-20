import { LoadingWrapper } from '@/components/loadingwrapper/loadingwrapper'
import { render } from '@testing-library/react'

const loadingStatusText = 'some loading text'
const loaderWrapperSomeClassName = 'loader-wrapper-some-cClass-name'
describe('Loading wrapper', () => {
	it('render a turned off component', () => {
		const { container } = render(<LoadingWrapper isLoading={false} />)

		const loader = container.getElementsByClassName('loading')

		expect(loader.length).toBe(1)
	})
	it('render a turned on component', () => {
		const { container } = render(<LoadingWrapper isLoading={true} />)

		const loader = container.getElementsByClassName('loading')

		expect(loader.length).toBe(1)
		expect(loader.item(0)?.className).toBe('loading active ')
		expect(loader.item(0)?.children[0]?.className).toBe('loading-wrapper')
		expect(loader.item(0)?.children[0]?.children[0].tagName).toBe('svg')
	})
	it('render a turned on component with text', () => {
		const { container } = render(<LoadingWrapper isLoading={true} loadingStatus={loadingStatusText} />)

		const spinner = container.getElementsByClassName('loading-wrapper')

		expect(spinner.length).toBe(1)
		expect(spinner.item(0)?.children[1].tagName).toBe('H2')
		expect(spinner.item(0)?.children[1].textContent).toBe(` ${loadingStatusText} `)
	})

	it('render a turned on component fixed, with text and some className', () => {
		const { container } = render(<LoadingWrapper className={loaderWrapperSomeClassName} isLoading={true} isFixed loadingStatus={loadingStatusText} />)

		const loader = container.getElementsByClassName('loading')

		expect(loader.length).toBe(1)
		expect(loader.item(0)?.className).toBe(`loading fixed active ${loaderWrapperSomeClassName}`)
		expect(loader.item(0)?.children[0]?.className).toBe('loading-wrapper')
	})
})
