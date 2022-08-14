import { useState, useCallback } from 'react'

import { isObjEqual } from '../utils'

import './CharacterFilter.scss'

import { CharacterFilterParams } from '../types'

type Props = {
  onChange: (filterParams: CharacterFilterParams) => void
}

type SelectOption<T = string> = [label: string, value: T]

const INITIAL_FILTER_PARAMS: Readonly<CharacterFilterParams> = Object.freeze({
  name: '',
  status: '',
  species: '',
  type: '',
  gender: '',
})

function InputField(p: { onChange: (value: string) => void; value: string; label?: string }) {
  return (
    <div className='CharacterFilter__item'>
      {p.label && <label htmlFor={p.label}>{p.label}</label>}
      <input
        id={p.label}
        type='text'
        value={p.value}
        placeholder={p.label}
        onChange={e => p.onChange(e.target.value)}
      />
    </div>
  )
}

function SelectField<T extends string = string>(p: {
  options: SelectOption<T>[]
  value: T
  label: string
  onChange: (value: T) => void
}) {
  return (
    <div className='CharacterFilter__item'>
      <label htmlFor={p.label}>{p.label}</label>
      <select id={p.label} value={p.value} onChange={e => p.onChange(e.target.value as T)}>
        {p.options.map(([label, value]) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function CharacterFilter(p: Props) {
  const [filterParams, setFilterParams] = useState<Readonly<CharacterFilterParams>>(INITIAL_FILTER_PARAMS)
  const [isFilterPopupVisible, setFilterPopupVisible] = useState<boolean>(false)

  const handleChange = useCallback(
    (params: Partial<CharacterFilterParams>) => {
      setFilterParams(filterParams => {
        const updatedParams: CharacterFilterParams = { ...filterParams, ...params }
        p.onChange(updatedParams)
        return updatedParams
      })
    },
    [p]
  )

  const resetFilter = useCallback(() => handleChange(INITIAL_FILTER_PARAMS), [handleChange])
  const toggleFilterVisibility = useCallback(() => setFilterPopupVisible(x => !x), [])

  return (
    <div className='CharacterFilter'>
      <div className='CharacterFilter__Header'>
        <div className='CharacterFilter__Header-left'>
          <InputField value={filterParams.name} label='name' onChange={name => handleChange({ name })} />
        </div>

        <div className='CharacterFilter__Header-right'>
          <button
            className='ResetButton'
            onClick={resetFilter}
            disabled={isObjEqual(filterParams, INITIAL_FILTER_PARAMS)}
          >
            Reset
          </button>

          <button className='OpenCloseFilterButton' onClick={toggleFilterVisibility}>
            Filters
          </button>
        </div>
      </div>

      {isFilterPopupVisible && (
        <div className='CharacterFilter__Popup'>
          <div className='CharacterFilter__inputs'>
            <InputField value={filterParams.species} label='species' onChange={species => handleChange({ species })} />
            <InputField value={filterParams.type} label='type' onChange={type => handleChange({ type })} />
          </div>

          <div className='CharacterFilter__selects'>
            <SelectField<CharacterFilterParams['status']>
              label='status'
              options={[
                ['all', ''],
                ['alive', 'alive'],
                ['dead', 'dead'],
                ['unknown', 'unknown'],
              ]}
              value={filterParams.status}
              onChange={status => handleChange({ status })}
            />

            <SelectField<CharacterFilterParams['gender']>
              label='gender'
              options={[
                ['all', ''],
                ['male', 'male'],
                ['female', 'female'],
                ['genderless', 'genderless'],
                ['unknown', 'unknown'],
              ]}
              value={filterParams.gender}
              onChange={gender => handleChange({ gender })}
            />
          </div>
        </div>
      )}
    </div>
  )
}
