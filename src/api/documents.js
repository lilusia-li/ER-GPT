import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const DOCUMENTS = [
  {
    id: 1,
    name: "При отклике.txt",
    mode: "Общее",
    words: "0",
    requests: 5,
    uploadTime: "19.03.2026 06:00",
    enabled: false,
  },
  {
    id: 2,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 10,
    uploadTime: "19.03.2026 06:01",
    enabled: true,
  },
  {
    id: 3,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 7,
    uploadTime: "19.03.2026 06:02",
    enabled: false,
  },
  {
    id: 4,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 3,
    uploadTime: "19.03.2026 06:03",
    enabled: false,
  },
  {
    id: 5,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 4,
    uploadTime: "19.03.2026 06:03",
    enabled: false,
  },
  {
    id: 6,
    name: "При отклике.txt",
    mode: "Общее",
    words: "0",
    requests: 2,
    uploadTime: "19.03.2026 06:04",
    enabled: false,
  },
  {
    id: 7,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 9,
    uploadTime: "19.03.2026 06:05",
    enabled: false,
  },
  {
    id: 8,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 10,
    uploadTime: "19.03.2026 06:06",
    enabled: false,
  },
  {
    id: 9,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 100,
    uploadTime: "19.03.2026 06:07",
    enabled: false,
  },
  {
    id: 10,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 50,
    uploadTime: "19.03.2026 06:08",
    enabled: false,
  },
  {
    id: 11,
    name: "Документ.txt",
    mode: "Общее",
    words: "1.5k",
    requests: 80,
    uploadTime: "19.03.2026 06:10",
    enabled: false,
  },
];

if (!localStorage.getItem("documents")) {
  localStorage.setItem("documents", JSON.stringify(DOCUMENTS));
}

const DocumentsApi = {
  getDocuments: async (
    searchQuery,
    filterOption,
    page = 1,
    pageSize = 10,
    sortBy = "count",
    sortOrder = "asc"
  ) => {
    const parseCustomDate = (dateStr) => {
      const [date, time] = dateStr.split(" ");
      const [day, month, year] = date.split(".");
      const [hours, minutes] = time.split(":");
      return new Date(year, month - 1, day, hours, minutes);
    };

    const rawDocs = localStorage.getItem("documents");

    const docs = rawDocs ? JSON.parse(rawDocs) : DOCUMENTS;
    let filteredDocs = searchQuery
      ? docs.filter((document) =>
          document.name.toLowerCase().includes(searchQuery)
        )
      : docs;

    filteredDocs =
      filterOption === "Все"
        ? filteredDocs
        : filteredDocs.filter((file) => {
            return file.status === filterOption;
          });

    return {
      result: filteredDocs
        .toSorted((a, b) => {
          if (sortBy === "time")
            return sortOrder === "asc"
              ? parseCustomDate(a.uploadTime) - parseCustomDate(b.uploadTime)
              : parseCustomDate(b.uploadTime) - parseCustomDate(a.uploadTime);
          return sortOrder === "asc"
            ? a.requests - b.requests
            : b.requests - a.requests;
        })
        .slice((page - 1) * pageSize, page * pageSize),
      total: filteredDocs.length,
      totalBeforeFilters: docs.length,
    };
  },

  deleteDocument: async (id) => {
    const rawDocs = localStorage.getItem("documents");
    let docs = rawDocs ? JSON.parse(rawDocs) : DOCUMENTS;

    docs = docs.filter((doc) => doc.id !== id);

    localStorage.setItem("documents", JSON.stringify(docs));
  },

  updateDocument: async (id, data) => {
    const rawDocs = localStorage.getItem("documents");
    let docs = rawDocs ? JSON.parse(rawDocs) : DOCUMENTS;

    docs = docs.map((doc) => {
      if (doc.id === id) {
        return {
          ...doc,
          ...data,
        };
      }
      return doc;
    });

    localStorage.setItem("documents", JSON.stringify(docs));
  },
};

export const useDocuments = ({
  searchQuery,
  filterOption,
  currentPage,
  pageSize,
  sortBy,
  sortOrder,
}) => {
  return useQuery({
    queryKey: [
      "documents",
      { searchQuery, filterOption, currentPage, pageSize, sortBy, sortOrder },
    ],
    queryFn: async () => {
      const data = await DocumentsApi.getDocuments(
        searchQuery,
        filterOption,
        currentPage,
        pageSize,
        sortBy,
        sortOrder
      );

      return data;
    },
  });
};

export const useSetDocumentState = () => {
  const queryClient = useQueryClient();

  const setDocumentState = useMutation({
    mutationFn: async ({ id, enabled }) => {
      await DocumentsApi.updateDocument(id, { enabled });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  return setDocumentState;
};
