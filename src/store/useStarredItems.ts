import { create } from "zustand";
import { getLocalStorage, setLocalStorage } from "~/helpers/localstorage";
import { TStory } from "~/types/story";

interface ItemStore {
  starred: TStory[];
  starStory: (starred: TStory[]) => void;
}

const useStarredItems = create<ItemStore>((set, get) => ({
  starred: getLocalStorage("starred", []) as TStory[],
  starStory: (starred: TStory[]) => {
    setLocalStorage("starred", starred);
    set({ starred });
  },
}));

export default useStarredItems;
