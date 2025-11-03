import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { getCocktail } from "@/queries";
import { useEffect, useState } from "react";
import LikeCocktailButton from "./LikeCocktailButton";

interface Props {
  cocktail: any;
}

export default function CocktailCard({ cocktail }: Props) {
  // Fetch detailed info about cocktail only when user wants   to know it.
  const { data: cocktailInfo, refetch } = useQuery({
    queryKey: ["cocktail-info", cocktail.id],
    queryFn: () => getCocktail(cocktail.id),
    enabled: false,
  });

  const [favourite, setFavourtie] = useState<boolean>(
    localStorage.getItem("favourites") === null
      ? false
      : JSON.parse(localStorage.getItem("favourites") as string).indexOf(
          cocktail.id
        ) > -1
  );

  useEffect(() => {
    const item = localStorage.getItem("favourites");
    const isFavourite =
      item === null
        ? false
        : JSON.parse(item as string).indexOf(cocktail.id) > -1;
    setFavourtie(isFavourite);
  }, [cocktail.id]);

  const likeCocktail = (id: number) => {
    const item: string | null = localStorage.getItem("favourites");
    var favourites: number[];
    if (item === null) {
      favourites = [];
      favourites.push(id);
      setFavourtie(true);
    } else {
      favourites = JSON.parse(item);
      if (favourites.indexOf(id) > -1) {
        favourites.splice(favourites.indexOf(id), 1);
        setFavourtie(false);
      } else {
        favourites.push(id);
        setFavourtie(true);
      }
    }
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  return (
    <Sheet>
      <SheetTrigger onClick={() => refetch()}>
        <Card className="w-full max-w-sm cocktail-card">
          <div className="cocktail-header">
            <div className="cocktail-image">
              <img
                className="cocktail-image"
                src={cocktail.imageUrl}
                alt={cocktail.name}
              />
              {favourite && (
                <div className="favourite-box">
                  <svg
                    viewBox="0 0 24 24"
                    fill="var(--icon-color)"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
                      stroke="var(--icon-color)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="card-title">
              <CardTitle className="title">
                <h3>{cocktail.name}</h3>
              </CardTitle>
              <CardDescription className="card-description">
                <Badge variant="outline">{cocktail.category}</Badge>
                <Badge variant="outline">{cocktail.glass}</Badge>
              </CardDescription>
            </div>
          </div>
          <CardFooter className="flex-col gap-2"></CardFooter>
        </Card>
      </SheetTrigger>
      <SheetContent className="sheet-content">
        <div className="sheet-body">
          <SheetHeader className="sheet-header">
            <img src={cocktail.imageUrl} alt={cocktail.name} />
            <SheetTitle className="sheet-title">{cocktail.name}</SheetTitle>
            <div className="badges">
              {" "}
              <Badge variant="outline">{cocktail.category}</Badge>
              <Badge variant="outline">{cocktail.glass}</Badge>
            </div>
            <SheetDescription>{cocktail.instructions}</SheetDescription>
          </SheetHeader>
          <div className="ingredients">
            <ul>
              {cocktailInfo?.data.ingredients.map(
                (ingredient: any, index: number) => {
                  return (
                    <li className="ingredient" key={index}>
                      <h5>{ingredient.name}</h5>
                      <p>{ingredient.measure}</p>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
        <LikeCocktailButton
          id={cocktail.id}
          like={likeCocktail}
          favourite={favourite}
        />
      </SheetContent>
    </Sheet>
  );
}
