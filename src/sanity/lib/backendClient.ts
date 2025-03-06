import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token
})

if (!backendClient.config().token) {
    throw new Error("Write token doesn't exist")
}
