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

interface Props {
  cocktail: any;
}

export default function CocktailCard({ cocktail }: Props) {
  // Fetch detailed info about cocktail only when user wants to know it.
  const { data: cocktailInfo, refetch } = useQuery({
    queryKey: ["cocktail-info", cocktail.id],
    queryFn: () => getCocktail(cocktail.id),
    enabled: false,
  });

  return (
    <Sheet>
      <SheetTrigger onClick={() => refetch()}>
        <Card className="w-full max-w-sm cocktail-card">
          <div className="cocktail-header">
            <img
              className="cocktail-image"
              src={cocktail.imageUrl}
              alt={cocktail.name}
            />
            <div className="card-title">
              <CardTitle className="title">{cocktail.name}</CardTitle>
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
      </SheetContent>
    </Sheet>
  );
}
