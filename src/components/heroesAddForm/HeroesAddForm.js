import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uiidv4 } from "uuid";
import { selectAll } from '../heroesFilters/filtersSlice';
import { useCreateHeroMutation } from '../../api/apiSlice';
import store from '../../store';

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState('');
  const [heroDescr, setHeroDescr] = useState('');
  const [heroEl, setHeroEl] = useState('');

  const [createHero, {isLoading, isError}] = useCreateHeroMutation();

  const filters = selectAll(store.getState());
  const { filtersLoadingStatus } = useSelector(state => state.filters);

  const onSumbitHandler = e => {
    e.preventDefault();

    const newHero = {
      id: uiidv4(),
      name: heroName,
      description: heroDescr,
      element: heroEl
    }

    createHero(newHero).unwrap();

    setHeroName('');
    setHeroDescr('');
    setHeroEl('');
  }

  const elementOptions = (filters, status) => {
    if (isLoading) {
      return <option>Загрузка элементов</option>
    } else if (isError) {
      return <option>Ошибка загрузки</option>
    }

    return filters.filter(item => item.id !== 'all')
    .map(({id, name}) => <option key={id} value={id}>{name}</option>);
  }

  return (
    <form onSubmit={onSumbitHandler} className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
        <input
          required
          type="text" 
          name="name"
          id="name"
          className="form-control"
          placeholder="Как меня зовут?"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
          />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label fs-4">Описание</label>
        <textarea
          required
          name="description"
          id="description"
          className="form-control"
          placeholder="Что я умею?"
          value={heroDescr}
          onChange={(e) => setHeroDescr(e.target.value)}
          style={{"height": '130px'}}/>
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
        <select
          required
          className="form-select"
          name="element"
          id="element"
          value={heroEl}
          onChange={(e) => setHeroEl(e.target.value)}>
            <option >Я владею элементом...</option>
            {elementOptions(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">Создать</button>
    </form>
    
  )
}

export default HeroesAddForm;