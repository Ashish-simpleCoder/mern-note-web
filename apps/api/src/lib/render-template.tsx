import * as ReactDOMServer from 'react-dom/server'

export function renderView<T extends (props?: any) => JSX.Element>(Template: T, props: Parameters<typeof Template>[0]) {
   return ReactDOMServer.renderToStaticMarkup(<Template {...props} />)
      .replace(/<script><\/script>/g, '')
      .replace(
         '<html>',
         `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">`
      )
}
