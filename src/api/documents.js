import { useQuery } from "@tanstack/react-query";

const DOCUMENTS = [
    {
      id: 1,
      name: "При отклике.txt",
      mode: "Общее",
      words: "0",
      requests: 0,
      uploadTime: "19.03.2026 06:17",
      status: "Отключено",
    },
    {
      id: 2,
      name: "Документ.txt",
      mode: "Общее",
      words: "1.5k",
      requests: 0,
      uploadTime: "19.03.2026 06:17",
      status: "Отключено",
    },
    {
      id: 3,
      name: "Документ.txt",
      mode: "Общее",
      words: "1.5k",
      requests: 0,
      uploadTime: "19.03.2026 06:17",
      status: "Отключено",
    },
    {
      id: 4,
      name: "Документ.txt",
      mode: "Общее",
      words: "1.5k",
      requests: 0,
      uploadTime: "19.03.2026 06:17",
      status: "Отключено",
    },
    {
      id: 5,
      name: "Документ.txt",
      mode: "Общее",
      words: "1.5k",
      requests: 0,
      uploadTime: "19.03.2026 06:17",
      status: "Отключено",
    },
    {
      id: 6,
      name: "При отклике.txt",
      mode: "Общее",
      words: "0",
      requests: 0,
      uploadTime: "19.03.2026 06:17",
      status: "Отключено",
    },
    {
      id: 7,
      name: "Документ.txt",
      mode: "Общее",
      words: "1.5k",
      requests: 0,
      uploadTime: "19.03.2026 06:17",
      status: "Отключено",
    },
    {
      id: 8,
      name: "Документ.txt",
      mode: "Общее",
      words: "1.5k",
      requests: 0,
      uploadTime: "19.03.2026 06:17",
      status: "Отключено",
    },
    {
      id: 9,
      name: "Документ.txt",
      mode: "Общее",
      words: "1.5k",
      requests: 0,
      uploadTime: "19.03.2026 06:17",
      status: "Отключено",
    },
    {
      id: 10,
      name: "Документ.txt",
      mode: "Общее",
      words: "1.5k",
      requests: 0,
      uploadTime: "19.03.2026 06:17",
      status: "Отключено",
    },
    {
      id: 11,
      name: "Документ.txt",
      mode: "Общее",
      words: "1.5k",
      requests: 0,
      uploadTime: "19.03.2026 06:17",
      status: "Отключено",
    },
  ]

export const useDocument = ({search}) => {
    return useQuery({
        queryKey: ['documents', {search}], 
        queryFn: async () => {
        const filteredDocuments = search ? DOCUMENTS.filter(document => document.name.includes(search)) : DOCUMENTS;
        setTimeout(() => {}, 2000);
        return {result: filteredDocuments, total: filteredDocuments.length};
}});
}