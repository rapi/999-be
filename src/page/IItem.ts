export type IItem = {
  link: string;
  title: string;
  description: string;
  views: number;
  viewsToday: number;
  price: number;
  noPrice: boolean;
  img: string[];
  mainFeatures: IFeature[];
  secondaryFeatures: IFeature[];
  location: ILocation[];
};
export type IFeature = {
  name: string;
  value: string | boolean;
};
export type ILocation = {
  name: string;
  value: string | boolean;
};
