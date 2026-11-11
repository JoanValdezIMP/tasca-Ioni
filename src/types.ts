import type { Dispatch, SetStateAction } from 'react';

export interface DeltaItem {
  id: number;
  Name: string;
  Description: string;
  Effects: string;
  Source: string | string[];
  Buy: string;
  Category: string;
  Image: string;
  Chapter: string;
  [key: string]: number | string | string[];
}

export interface FilterState {
  selectedChapter: string;
  setSelectedChapter: Dispatch<SetStateAction<string>>;
  selectedMainCategory: string;
  setSelectedMainCategory: Dispatch<SetStateAction<string>>;
  selectedWeaponType: string;
  setSelectedWeaponType: Dispatch<SetStateAction<string>>;
  selectedSource: string;
  setSelectedSource: Dispatch<SetStateAction<string>>;
}
