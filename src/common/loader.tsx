import React, { useEffect, useState } from "react"

type LoaderProps<Request, Response> = {
	request: Request
	load: (request: Request) => Promise<Response>
	children: (response: Response) => JSX.Element
}

export function Loader<Request, Response>(
	{ request, load, children }: LoaderProps<Request, Response>,
) {
	const [response, setResponse] = useState<undefined | Response>()
	const [error, setError] = useState<undefined | any>(undefined)
	useEffect(() => {
		load(request)
			.then(setResponse)
			.catch(setError)
	}, [request, load])
	if (error !== undefined) {
		return <p style={{ color: "red" }}>{extractErrorString(error)}</p>
	}
	if (response === undefined) {
		return <p>loading...</p>
	}
	return children(response)
}

function extractErrorString(error: any): string {
	if (typeof error === "string") {
		return error
	} else if (error instanceof Error) {
		return error.message
	} else {
		return `Unable to extract message from ${JSON.stringify(error)}`
	}
}
