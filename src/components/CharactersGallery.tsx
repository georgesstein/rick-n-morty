import './CharactersGallery.scss'

import CharacterCard from './CharacterCard'

import { ICharactersGallery } from '../hooks/useCharactersGallery'
import { DTO } from '../types'

type Props = {
  data: ICharactersGallery.Data
  loadMore: ICharactersGallery.LoadMore
  onCharacterCardClick: (characterId: DTO.CharacterId) => void
}

export default function CharactersGallery(p: Props) {
  if (p.data.status === 'loading') {
    return (
      <div className='CharactersGallery__placeholder'>
        Loading<div className='spinner'></div>
      </div>
    )
  }

  if (p.data.status === 'no-data') {
    return <div className='CharactersGallery__placeholder'>No match found</div>
  }

  if (p.data.status === 'error') {
    return <div className='CharactersGallery__placeholder'>{p.data.errorMessage}</div>
  }

  return (
    <div className='CharactersGallery'>
      {p.data.characters.map(x => (
        <CharacterCard
          onClick={() => p.onCharacterCardClick(x.id)}
          key={x.id}
          name={x.name}
          status={x.status}
          species={x.species}
          characterType={x.type}
          gender={x.gender}
          imageUrl={x.image}
        />
      ))}

      {p.loadMore.status === 'can-load-more' && <button className='loadMoreButton' onClick={p.loadMore.loadMore}>Load more</button>}
      {p.loadMore.status === 'loading-more' && <div className='spinner'></div>}
    </div>
  )
}
