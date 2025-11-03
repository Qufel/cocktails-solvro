interface Props {
  ingredients: any;
}

export default function CocktailIngredients({ ingredients }: Props) {
  return (
    <div className="ingredients">
      <h4>Ingredients</h4>
      <ul>
        {ingredients?.map((ingredient: any, index: number) => {
          return (
            <li className="ingredient" key={index}>
              <h5>{ingredient.name}</h5>
              <p className="measure">{ingredient.measure}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
