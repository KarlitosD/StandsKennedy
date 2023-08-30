import { renderSVG } from "uqr"

type QueryParams = {
    code: string,
    scale: number,
    margin: number
}

export default defineEventHandler(event => {
    const { code = "", scale = 2, margin = 2 }  = getQuery(event) as QueryParams
    const runtime = useRuntimeConfig()

    const appURL = runtime.application.url

    const svg = renderSVG(`${appURL}/${code}`, {
        pixelSize: scale,
        border: margin
    }) 

    setHeader(event, "content-type", "image/svg+xml")

    return svg
})