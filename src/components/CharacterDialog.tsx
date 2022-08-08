import './CharacterDialog.scss'
import { DTO } from '../types'

type Props = {
  data: DTO.Character
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
    ['type', p.data.type],
    ['status', p.data.status],
    ['species', p.data.species],
    ['gender', p.data.gender],
    ['origin', p.data.origin.name],
    ['location', p.data.location.name],
  ]

  return (
    <>
      <div className="CharacterDialog" onClick={p.hide}>
        <div className="CharacterDialog__body" onClick={(e) => e.stopPropagation()}>
          <div className="CharacterDialog__image">
            <img src={p.data.image} alt={p.data.name} />
          </div>

          <div className="CharacterDialog__title">{p.data.name}</div>

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
