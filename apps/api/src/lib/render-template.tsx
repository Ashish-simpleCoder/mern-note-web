import * as ReactDOMServer from 'react-dom/server'

export function renderView<T extends (props?: any) => JSX.Element>(Template: T, props: Parameters<typeof Template>[0]) {
   return ReactDOMServer.renderToStaticMarkup(<Template {...props} />)
}
