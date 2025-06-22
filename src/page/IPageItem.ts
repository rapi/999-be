export type IPageItem = {
  userId: string;
  link: string;
  title: string;
  price: {
    value: {
      value: number;
      unit: string;
    };
  };
};
export type IPage = {
  adds: IPageItem[];
  count: number;
};
