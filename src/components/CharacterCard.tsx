import './CharacterCard.scss'

type Props = {
  imageUrl: string
  name: string
  status: string
  species: string
  characterType: string
  gender: string
  onClick: () => void
}

export default function CharacterCard(p: Props) {
  return (
    <div className="CharacterCard" onClick={p.onClick}>
      <div className="CharacterCard__image">
        <img src={p.imageUrl} alt={p.name} />
      </div>

      <div className="CharacterCard__meta">
        <h1>{p.name}</h1>
      </div>
    </div>
  )
}
