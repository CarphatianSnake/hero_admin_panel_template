import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { filterChange, fetchFilters, selectAll } from './filtersSlice';
import store from '../../store';

import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

  const filters = selectAll(store.getState());
  const { filtersLoadingStatus, choosenFilter } = useSelector(state => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
    // eslint-disable-next-line
  }, [])
  
  if (filtersLoadingStatus === "loading") {
    return <Spinner/>;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>
    }

    return arr.map(({id, cls, name}) => {

      const btnClass = classNames('btn', cls, {
          'active': id === choosenFilter
      });
      
      return <button 
              key={id} 
              id={id} 
              className={btnClass}
              onClick={() => dispatch(filterChange(id))}
              >{name}</button>
    })
  }

  const elements = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {elements}
        </div>
      </div>
    </div>
  )
}

export default HeroesFilters;