import React, { useState } from "react";
import { ButtonGroup } from "../ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getGlasses } from "@/queries";
import { Button } from "../ui/button";

interface Props {
  perPage: number;
  category: string | null;
  glass: string | null;
  updatePerPage: (perPage: number) => void;
  updateCategory: (category: string | null) => void;
  updateGlasses: (category: string | null) => void;
  resetPage: () => void;
}

export default function CocktailsOptions({
  perPage,
  category,
  glass,
  updatePerPage,
  updateCategory,
  updateGlasses,
  resetPage,
}: Props) {
  // Get categories from API
  const { data: categories, isFetching: areCategoriesFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  // Same for glasses
  const { data: glasses, isFetching: areGlassesFetching } = useQuery({
    queryKey: ["glasses"],
    queryFn: getGlasses,
  });

  const resetFilters = () => {
    updateCategory(null);
    updateGlasses(null);
    setFiltered(false);
    resetPage();
  };

  const [filtered, setFiltered] = useState<boolean>(false);

  return (
    <ButtonGroup className="cocktails-options">
      {filtered && (
        <ButtonGroup>
          <Button onClick={() => resetFilters()}>Clear</Button>
        </ButtonGroup>
      )}
      <ButtonGroup>
        <Select
          value={category != null ? (category as string | undefined) : ""}
          onValueChange={(value: string) => {
            updateCategory(value);
            setFiltered(true);
            resetPage();
          }}
        >
          <SelectTrigger className="cocktails-select">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {areCategoriesFetching && "Loading..."}
              {categories?.data.map((value: string, index: number) => {
                return (
                  <SelectItem key={index} value={value}>
                    {value}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={glass != null ? (glass as string | undefined) : ""}
          onValueChange={(value: string) => {
            updateGlasses(value);
            setFiltered(true);
            resetPage();
          }}
        >
          <SelectTrigger className="cocktails-select">
            <SelectValue placeholder="Glass" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Glass</SelectLabel>
              {areGlassesFetching && "Loading..."}
              {glasses?.data.map((value: string, index: number) => {
                return (
                  <SelectItem key={index} value={value}>
                    {value}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </ButtonGroup>
      <ButtonGroup>
        <Select
          value={perPage?.toString()}
          onValueChange={(value) => {
            updatePerPage(parseInt(value));
            resetPage();
          }}
        >
          <SelectTrigger className="cocktails-select">
            <SelectValue placeholder="Results" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cocktails per Page</SelectLabel>
              <SelectItem key={0} value="15">
                15
              </SelectItem>
              <SelectItem key={1} value="30">
                30
              </SelectItem>
              <SelectItem key={2} value="50">
                45
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ButtonGroup>
    </ButtonGroup>
  );
}
