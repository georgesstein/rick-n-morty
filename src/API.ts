import { encodeQueryParams } from './utils'
import { CharacterFilterParams, DTO } from './types'

// @DOC: https://rickandmortyapi.com/documentation/#get-all-characters
export const fetchCharacters = (
  params?: Partial<CharacterFilterParams> & { page?: number }
): Promise<DTO.FetchCharacters> => {
  const queryParams = encodeQueryParams(params || {})

  return fetch('https://rickandmortyapi.com/api/character' + queryParams).then((response) =>
    response.ok //
      ? response.json()
      : Promise.reject(response.status)
  )
}
