import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItems from "./MealItems";
import classes from "./Meals.module.css";
import MealSummary from "./MealSummary";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMealAPI = async () => {
      const response = await fetch(
        "https://food-98796-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error(
          `Something went error~ Error Code is ${response.status}`
        );
      }

      const data = (await response.json()) ?? false;
      if (!data) {
        throw new Error(`No data found!!`);
      }
      const loadedMeal = Object.entries(data).map((item) => {
        return item[1];
      });
      setMeals(loadedMeal);
      setIsLoading(false);
    };
    fetchMealAPI().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const mealList = meals.map((item) => {
    return (
      <MealItems
        id={item.id}
        name={item.name}
        price={item.price}
        description={item.description}
        key={item.id}
      />
    );
  });

  let content;
  if (isLoading) {
    content = <p className={classes.loading}>Loading...</p>;
  }
  if (httpError) {
    content = <p className={classes.error}>{httpError}</p>;
  }
  if (!isLoading && !httpError) {
    content = <ul>{mealList}</ul>;
  }

  return (
    <div className={classes.meals_container}>
      <MealSummary />
      <section className={classes.meals}>
        <Card>{content}</Card>
      </section>
    </div>
  );
};

export default Meals;
