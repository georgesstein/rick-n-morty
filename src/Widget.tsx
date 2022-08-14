import './Widget.scss'

import useCharactersGallery from './hooks/useCharactersGallery'

import CharacterFilter from './components/CharacterFilter'
import CharactersGallery from './components/CharactersGallery'
import CharacterDialog from './components/CharacterDialog'

export default function Widget() {
  const charactersGallery = useCharactersGallery()

  return (
    <div className='WidgetRickAndMorty__Container'>
      <div className='WidgetRickAndMorty WidgetRickAndMortyCssReset'>
        {charactersGallery.characterDialog.data && (
          <CharacterDialog
            name={charactersGallery.characterDialog.data.name}
            status={charactersGallery.characterDialog.data.status}
            species={charactersGallery.characterDialog.data.species}
            type={charactersGallery.characterDialog.data.type}
            gender={charactersGallery.characterDialog.data.gender}
            originName={charactersGallery.characterDialog.data.origin.name}
            locationName={charactersGallery.characterDialog.data.location.name}
            imageUrl={charactersGallery.characterDialog.data.image}
            hide={charactersGallery.characterDialog.hide}
          />
        )}

        <CharacterFilter onChange={charactersGallery.handleFilterChange} />

        <CharactersGallery
          data={charactersGallery.data}
          loadMore={charactersGallery.loadMore}
          onCharacterCardClick={charactersGallery.characterDialog.show}
        />
      </div>
    </div>
  )
}
