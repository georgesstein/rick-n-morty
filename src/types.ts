export declare namespace DTO {
  type Character = {
    id: number & { __idFor: 'DTO.Character' }
    name: string
    status: 'alive' | 'dead' | 'unknown'
    species: string
    type: string // distinct character characteristic, like "Human with antennae"
    gender: 'male' | 'female' | 'genderless' | 'unknown'
    image: string // image url

    origin: {
      name: string // example: Earth
      url: string
    }

    location: {
      name: string // example Earth
      url: string
    }
    episode: string[] // URLs
    url: string
    created: string // datetime string ISO 8601, example: "2017-11-04T18:50:21.651Z"
  }

  type CharacterId = Character['id']

  type FetchCharacters = {
    info: {
      count: number
      pages: number
      next: string
      prev: string
    }
    results: Character[]
  }
}

export type CharacterFilterParams = Pick<DTO.Character, 'name' | 'type' | 'species'> & {
  status: DTO.Character['status'] | '' // empty string means "all" or no filter
  gender: DTO.Character['gender'] | '' // empty string means "all" or no filter
}
