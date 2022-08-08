import { useEffect, useState, useCallback, useRef } from 'react'
import { debounce } from '../utils'

import * as RickNMortyAPI from '../API'

import { DTO, CharacterFilterParams } from '../types'

export declare namespace ICharactersGallery {
  type Data =
    | { status: 'loading' }
    | { status: 'no-data' }
    | { status: 'success'; characters: DTO.Character[] }
    | { status: 'error'; errorMessage: string }

  type LoadMore =
    | { status: 'can-not-load-more' }
    | { status: 'can-load-more'; loadMore: () => void }
    | { status: 'loading-more' }
}

type PagingContext = {
  lastPage: number
  currentPage: number
  charactersCache: DTO.Character[]
  filterParams: Partial<CharacterFilterParams>
}

const REQUEST_DEBOUNCE_TIMEOUT = 1000

export default function useCharactersGallery(): {
  data: ICharactersGallery.Data
  loadMore: ICharactersGallery.LoadMore
  characterDialog: {
    data: DTO.Character | null
    show: (characterId: DTO.CharacterId) => void
    hide: () => void
  }
  handleFilterChange: (params: CharacterFilterParams) => void
} {
  const pagingContextRef = useRef<PagingContext | null>(null)

  const [characterDialog, setCharacterDialog] = useState<DTO.Character | null>(null)
  const [data, setData] = useState<ICharactersGallery.Data>({ status: 'loading' })
  const [loadMore, setLoadMore] = useState<ICharactersGallery.LoadMore>({ status: 'can-not-load-more' })

  const debouncedCharactersFetchRequest = useCallback(
    debounce(
      async (filterParams: Partial<CharacterFilterParams> & { page: number }, charactersCache?: DTO.Character[]) => {
        try {
          const response = await RickNMortyAPI.fetchCharacters(filterParams)

          const updatedCharacters: DTO.Character[] = [...(charactersCache || []), ...response.results]
          const updatedPagingContext: PagingContext = {
            filterParams,
            lastPage: response.info.pages,
            currentPage: pagingContextRef.current?.currentPage ? pagingContextRef.current.currentPage + 1 : 1,
            charactersCache: updatedCharacters,
          }

          pagingContextRef.current = updatedPagingContext

          const canLoadMore = updatedPagingContext.currentPage !== updatedPagingContext.lastPage

          if (canLoadMore) {
            setLoadMore({
              status: 'can-load-more',
              loadMore: () => {
                setLoadMore({ status: 'loading-more' })
                debouncedCharactersFetchRequest(
                  { ...updatedPagingContext.filterParams, page: updatedPagingContext.currentPage + 1 },
                  updatedPagingContext.charactersCache
                )
              },
            })
          } else {
            setLoadMore({ status: 'can-not-load-more' })
          }

          setData({ status: 'success', characters: updatedCharacters })
        } catch (responseStatusCode) {
          pagingContextRef.current = null
          setLoadMore({ status: 'can-not-load-more' })

          if (responseStatusCode === 404) {
            setData({ status: 'no-data' })
            return
          }

          setData({ status: 'error', errorMessage: 'Unexpected server error' })
        }
      },
      REQUEST_DEBOUNCE_TIMEOUT
    ),
    []
  )

  useEffect(() => {
    debouncedCharactersFetchRequest({ page: 1 })
  }, [debouncedCharactersFetchRequest])

  const handleFilterChange = useCallback(
    (p: CharacterFilterParams) => {
      pagingContextRef.current = null

      if (data.status !== 'loading') setData({ status: 'loading' })

      debouncedCharactersFetchRequest({ ...p, page: 1 })
    },
    [data.status, debouncedCharactersFetchRequest]
  )

  const showCharacterDialog = useCallback(
    (characterId: DTO.CharacterId) => {
      if (data.status !== 'success') throw Error('Attempt to access "DTO.Character" before data loading')
      const character = data.characters.find((x) => x.id === characterId)

      if (!character) throw Error(`Could not find "Character" with id: ${characterId}`)

      setCharacterDialog(character)
    },
    [data]
  )

  const hideCharacterDialog = useCallback(() => setCharacterDialog(null), [])

  return {
    data,
    loadMore,
    handleFilterChange,
    characterDialog: {
      data: characterDialog,
      show: showCharacterDialog,
      hide: hideCharacterDialog,
    },
  }
}
