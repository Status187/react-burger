import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as React from 'react';
import styles from './IngredientsDeteilsPage.module.css';
import { getSelectedIngredients } from '../../services/selectors';
import { loadIngredients } from '../../services/action/ingredientsAction';
import { useAppDispatch } from '../../services/store';
import { IData } from '../../types'
import { IngredientDetails } from '../../components/IngredientDetails/IngredientDetails';

export const IngredientDetailsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ingredients = useSelector(getSelectedIngredients);
  const [stateIngredient, setStateIngredient] = React.useState<IData>();

  React.useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(loadIngredients());
    }
    if (ingredients.length > 0) {
      const ingredient = ingredients.find((i) => i._id === id);
      setStateIngredient(ingredient);
    }
  }, [dispatch, id, ingredients, navigate]);

  return stateIngredient ? (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <IngredientDetails {...stateIngredient} />
      </div>
    </div>
  ) : null;
};