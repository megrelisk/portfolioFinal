export type TimelineEventId = "2025" | "2024" | "2023" | "2021" | "2020";

export interface TimelineEvent {
  id: TimelineEventId;
  year: string;
  imageUrl: string;
  order: number;
}

export const timelineEvents: TimelineEvent[] = ([
  {
    id: "2025",
    year: "2025",
    imageUrl:
      "https://images.unsplash.com/vector-1774594138135-ca05e5eeffe8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    order: 1,
  },
  {
    id: "2024",
    year: "2024",
    imageUrl:
      "https://images.unsplash.com/vector-1774594138131-25023bcc2adb?q=80&w=947&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    order: 2,
  },
  {
    id: "2023",
    year: "2023",
    imageUrl:
      "https://images.unsplash.com/vector-1774594138186-815823cc90bc?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    order: 3,
  },
  {
    id: "2021",
    year: "2021",
    imageUrl:
      "https://images.unsplash.com/vector-1774594138193-58f7758e6209?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    order: 4,
  },
  {
    id: "2020",
    year: "2020",
    imageUrl:
      "https://images.unsplash.com/vector-1774594138137-4233e7bb3a64?q=80&w=1217&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    order: 5,
  },
] as const satisfies readonly TimelineEvent[])
  .slice()
  .sort((a, b) => a.order - b.order);
