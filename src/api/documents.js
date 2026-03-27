import { useQuery } from "@tanstack/react-query";

const DOCUMENTS = [
  {
    id: 1,
    name: "При отклике.txt",
    mode: "Общее",
    words: "0",
    requests: 5,
    uploadTime: "19.03.2026 06:00",
    status: "Отключено",
    orderNumber: null,
  },
  {
    id: 2,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 10,
    uploadTime: "19.03.2026 06:01",
    status: "Отключено",
    orderNumber: null,
  },
  {
    id: 3,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 7,
    uploadTime: "19.03.2026 06:02",
    status: "Отключено",
    orderNumber: null,
  },
  {
    id: 4,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 3,
    uploadTime: "19.03.2026 06:03",
    status: "Отключено",
    orderNumber: null,
  },
  {
    id: 5,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 4,
    uploadTime: "19.03.2026 06:03",
    status: "Отключено",
    orderNumber: null,
  },
  {
    id: 6,
    name: "При отклике.txt",
    mode: "Общее",
    words: "0",
    requests: 2,
    uploadTime: "19.03.2026 06:04",
    status: "Отключено",
    orderNumber: null,
  },
  {
    id: 7,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 9,
    uploadTime: "19.03.2026 06:05",
    status: "Отключено",
    orderNumber: null,
  },
  {
    id: 8,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 10,
    uploadTime: "19.03.2026 06:06",
    status: "Отключено",
    orderNumber: null,
  },
  {
    id: 9,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 100,
    uploadTime: "19.03.2026 06:07",
    status: "Отключено",
    orderNumber: null,
  },
  {
    id: 10,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 50,
    uploadTime: "19.03.2026 06:08",
    status: "Отключено",
    orderNumber: null,
  },
  {
    id: 11,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 80,
    uploadTime: "19.03.2026 06:10",
    status: "Отключено",
    orderNumber: null,
  },
];

export const useDocuments = ({ searchQuery }) => {
  return useQuery({
    queryKey: ["documents", { searchQuery }],
    queryFn: async () => {
      const clearSearchQuery = searchQuery.trim().toLowerCase();

      const documentsFilteredBySearchQuery = searchQuery
        ? DOCUMENTS.filter((document) =>
            document.name.toLowerCase().includes(clearSearchQuery)
          )
        : DOCUMENTS;

      setTimeout(() => {}, 2000);
      return {
        result: documentsFilteredBySearchQuery,
        total: documentsFilteredBySearchQuery.length,
      };
    },
  });
};
