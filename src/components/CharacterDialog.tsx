import './CharacterDialog.scss'

type Props = {
  name: string
  status: string
  species: string
  type: string
  gender: string
  originName: string
  locationName: string
  imageUrl: string
  hide: () => void
}

function CharacterDetail(p: { label: string; value: string }) {
  if (p.value === '') return null

  return (
    <>
      <div className="CharacterDialog__label">{p.label}:</div>
      <div className="CharacterDialog__value">{p.value}</div>
    </>
  )
}

export default function CharacterDialog(p: Props) {
  const details: Array<[label: string, value: string]> = [
    ['type', p.type],
    ['status', p.status],
    ['species', p.species],
    ['gender', p.gender],
    ['origin', p.originName],
    ['location', p.locationName],
  ]

  return (
    <>
      <div className="CharacterDialog" onClick={p.hide}>
        <div className="CharacterDialog__body" onClick={(e) => e.stopPropagation()}>
          <div className="CharacterDialog__image">
            <img src={p.imageUrl} alt={p.name} />
          </div>

          <div className="CharacterDialog__title">{p.name}</div>

          <div className="CharacterDialog__details">
            {details.map(([label, value]) => (
              <CharacterDetail key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
