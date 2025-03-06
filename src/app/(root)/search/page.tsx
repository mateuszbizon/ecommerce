import React from 'react'

type Props = {
    searchParams: Promise<{ query: string }>
}

async function page({ searchParams }: Props) {
    const query = (await searchParams).query

  return (
    <div>
        search for {query}
    </div>
  )
}

export default page