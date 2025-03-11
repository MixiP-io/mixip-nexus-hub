
export interface Campaign {
  id: number;
  title: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  teamSize: number;
  location: string;
  image: string;
  responseRate: number;
}

export const initialCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Summer Collection Launch",
    type: "Photoshoot",
    status: "Active",
    startDate: "2023-07-15",
    endDate: "2023-08-15",
    teamSize: 8,
    location: "Miami, FL",
    image: "/placeholder.svg",
    responseRate: 85
  },
  {
    id: 2,
    title: "Product Showcase",
    type: "Video",
    status: "Planning",
    startDate: "2023-09-01",
    endDate: "2023-09-30",
    teamSize: 5,
    location: "New York, NY",
    image: "/placeholder.svg",
    responseRate: 0
  }
];
