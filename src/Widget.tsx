import './Widget.scss'

import useCharactersGallery from './hooks/useCharactersGallery'

import CharacterFilter from './components/CharacterFilter'
import CharactersGallery from './components/CharactersGallery'
import CharacterDialog from './components/CharacterDialog'

export default function Widget() {
  const charactersGallery = useCharactersGallery()

  return (
    <div className='WidgetRickAndMorty__Container'>
    <div className="WidgetRickAndMorty WidgetRickAndMortyCssReset">
      {charactersGallery.characterDialog.data && (
        <CharacterDialog data={charactersGallery.characterDialog.data} hide={charactersGallery.characterDialog.hide} />
      )}

      <CharacterFilter onChange={charactersGallery.handleFilterChange} />

      <CharactersGallery
        data={charactersGallery.data}
        loadMore={charactersGallery.loadMore}
        showCharacterDialog={charactersGallery.characterDialog.show}
      />
    </div>
    </div>
  )
}
