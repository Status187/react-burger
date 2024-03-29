import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './IngredientsDeteilsPage.module.css';
import { getIngredients } from '../../services/selectors';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { IData, IInitialState } from '../../types'
import { IngredientDetails } from '../../components/IngredientDetails/IngredientDetails';
import { useParams } from 'react-router-dom';

export const IngredientDetailsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ingredients: IInitialState = useAppSelector(getIngredients);
  const [stateIngredient, setStateIngredient] = React.useState<IData>();

  React.useEffect(() => {
    if (ingredients.data.length > 0) {
      const ingredient = ingredients.data.find((i) => i._id === id);
      setStateIngredient(ingredient);
    }
  }, [dispatch, id, ingredients, navigate]);

  return stateIngredient ? (
    <div className={styles.wrapper}>
      <div>
        <IngredientDetails {...stateIngredient} />
      </div>
    </div>
  ) : null;
};
