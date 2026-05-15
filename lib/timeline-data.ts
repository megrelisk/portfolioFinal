export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  text: string;
  imageUrl: string;
  order: number;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "2025",
    year: "2025",
    title: "Co-Founder & Strategic Leader",
    subtitle: "Youth-Ge Georgia",
    text: "Driving the strategic vision and growth roadmap. Focused on establishing key partnerships and securing crucial funding through effective investor relations.",
    imageUrl: "https://images.unsplash.com/vector-1774594138135-ca05e5eeffe8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    order: 1,
  },
  {
    id: "2024",
    year: "2024",
    title: "Decoline Specialist (Form 2)",
    subtitle: "Present",
    text: "Leading technical documentation and construction compliance. Managing rigorous concrete material specifications and implementing advanced solutions to strictly meet W8 waterproof standards.",
    imageUrl: "https://images.unsplash.com/vector-1774594138131-25023bcc2adb?q=80&w=947&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    order: 2,
  },
  {
    id: "2023",
    year: "2023",
    title: "Road Manager & Operations",
    subtitle: "NUKO+",
    text: "Overseeing construction compliance and operational processes. Specialized in refining core ideas and making financially sound decisions in fast-paced environments.",
    imageUrl: "https://images.unsplash.com/vector-1774594138186-815823cc90bc?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    order: 3,
  },
  {
    id: "2021",
    year: "2021",
    title: "Agile Management & Analysis",
    subtitle: "Space & NUKO+",
    text: "Managed merchant relations applying Agile methodologies and JIRA. Concurrently performed data collection and weekly reporting as an Analyst.",
    imageUrl: "https://images.unsplash.com/vector-1774594138193-58f7758e6209?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    order: 4,
  },
  {
    id: "2020",
    year: "2020",
    title: "Data Analyst & BI Developer",
    subtitle: "Space",
    text: "Handled complex data extraction using SQL. Transformed raw data into actionable insights, creating automated reports and visualizations using Power BI.",
    imageUrl: "https://images.unsplash.com/vector-1774594138137-4233e7bb3a64?q=80&w=1217&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    order: 5,
  },
].sort((a, b) => a.order - b.order);
