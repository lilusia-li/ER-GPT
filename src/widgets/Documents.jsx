import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  ArrowUpWideNarrow,
  ArrowDownNarrowWide,
  Plus,
  NotebookPen,
  MoreHorizontal,
  Settings2,
  InfoIcon,
} from "lucide-react";

import CustomPagination from "@/components/CustomPagination.jsx";

import { useState } from "react";

import { Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useDocuments } from "@/api/documents";

const Documents = () => {
  const [sortOrder, setSortOrder] = useState("asc"); // "desc" || "asc"
  const [sortBy, setSortBy] = useState("count");
  const [filterOption, setFilterOption] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { data, isLoading } = useDocuments({ searchQuery, filterOption });

  const files = data?.result || [];
  const total = data?.total || 0;
  // const [files, setFiles] = useState([]);

  // Table-column  "checkbox"
  const isAllSelected =
    files.length > 0 && selectedFiles.length === files.length;

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map((f) => f.id));
    }
  };

  const toggleFile = (fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  // Table-column  "ДЕЙСТВИЕ"
  const [enabledStates, setEnabledStates] = useState({});

  files.map((file) => {
    enabledStates[file.id] = enabledStates[file.id] || false;
  });

  const toggleSwitch = (fileId, checked) => {
    // const updatedFiles =
    // ? {
    //   ...file,
    //   status: file.status === "Отключено" ? "Включено" : "Отключено",
    // }
    files.map((file) => {
      if (file.id === fileId)
        file.status === "Отключено" ? "Включено" : "Отключено";
    }); // просто изменяем статус, надеясь на ссылочность объектов

    // setFiles(updatedFiles);

    setEnabledStates((prev) => ({
      ...prev,
      [fileId]: checked,
    }));
  };

  // Sorting
  function parseCustomDate(dateStr) {
    const [date, time] = dateStr.split(" ");
    const [day, month, year] = date.split(".");
    const [hours, minutes] = time.split(":");
    return new Date(year, month - 1, day, hours, minutes);
  }

  const sortedFiles = [...files].sort((a, b) => {
    if (sortBy === "time")
      return sortOrder === "asc"
        ? parseCustomDate(a.uploadTime) - parseCustomDate(b.uploadTime)
        : parseCustomDate(b.uploadTime) - parseCustomDate(a.uploadTime);

    return sortOrder === "asc"
      ? a.requests - b.requests
      : b.requests - a.requests;
  });
  let i = 1;
  sortedFiles.map((file) => {
    file.orderNumber = i;
    i++;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const displayedFiles = sortedFiles.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col h-full p-6 w-full">
      <h2 className="text-[1rem]">Документы</h2>
      <p className="text-[0.875rem]">
        Здесь отображаются все файлы базы знаний, и вся база знаний может быть
        связана с цитатами Dify или проиндексирована с помощью чата.{" "}
        <a href="/">Подробнее</a>
      </p>

      <div className="flex gap-2 flex-wrap justify-between py-4">
        <div className="flex gap-2 flex-wrap">
          <Select value={filterOption} onValueChange={setFilterOption}>
            <SelectTrigger className="w-40 text-(length:--font-size-base)">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem
                value="Все"
                className="text-[length:var(--font-size-base)]"
              >
                Все
              </SelectItem>
              <SelectItem
                value="В очереди"
                className="text-[length:var(--font-size-base)]"
              >
                В очереди
              </SelectItem>
              <SelectItem
                value="Индексация"
                className="text-[length:var(--font-size-base)]"
              >
                Индексация
              </SelectItem>
              <SelectItem
                value="Приостановлено"
                className="text-[length:var(--font-size-base)]"
              >
                Приостановлено
              </SelectItem>
              <SelectItem
                value="Ошибка"
                className="text-[length:var(--font-size-base)]"
              >
                Ошибка
              </SelectItem>
              <SelectItem
                value="Доступно"
                className="text-[length:var(--font-size-base)]"
              >
                Доступно
              </SelectItem>
              <SelectItem
                value="Включено"
                className="text-[length:var(--font-size-base)]"
              >
                Включено
              </SelectItem>
              <SelectItem
                value="Отключено"
                className="text-[length:var(--font-size-base)]"
              >
                Отключено
              </SelectItem>
              <SelectItem
                value="Архивировано"
                className="text-[length:var(--font-size-base)]"
              >
                Архивировано
              </SelectItem>
            </SelectContent>
          </Select>

          <InputGroup className="max-w-50">
            <InputGroupInput
              placeholder="Поиск"
              className="text-(length:--font-size-base) md:text-(length:--font-size-base)"
              value={searchQuery}
              onInput={(event) => setSearchQuery(event.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <div className="flex gap-x-[0.1rem]">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="relative w-[310px] pl-[120px] text-[length:var(--font-size-base)]">
                <span className="absolute left-[0.5rem]">Сортировать по:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="time"
                  className="text-[length:var(--font-size-base)]"
                >
                  Время загрузки
                </SelectItem>
                <SelectItem
                  value="count"
                  className="text-[length:var(--font-size-base)]"
                >
                  Количество извлечений
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                setCurrentPage(1);
              }}
            >
              {sortOrder === "asc" ? (
                <ArrowDownNarrowWide className="h-4 w-4" />
              ) : (
                <ArrowUpWideNarrow className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex gap-[0.5rem]">
          <Button
            variant="outline"
            className="text-[length:var(--font-size-base)]"
          >
            <NotebookPen />
            Метаданные
          </Button>

          <Button
            variant="outline"
            className="text-[length:var(--font-size-base)]"
          >
            <Plus />
            Добавить файл
          </Button>
        </div>
      </div>

      <div className="h-0 grow overflow-auto">
        {sortedFiles.length <= 0 ? (
          files.length <= 0 ? (
            <Alert>
              <InfoIcon />
              <AlertTitle>Файлы не добавлены</AlertTitle>
              <AlertDescription>
                Вы еще не загрузили ни один файл.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <InfoIcon />
              <AlertTitle>Файлы не найдены</AlertTitle>
              <AlertDescription>
                Нет файлов, удовлетворяющих условиям фильтрации и/или поиска.
              </AlertDescription>
            </Alert>
          )
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="text-[0.75rem]">
                <TableHead className="min-w-[3.2rem]">
                  <div className="flex gap-[0.5rem] items-center">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={toggleAll}
                      aria-label="Выбрать всё"
                    />
                    #
                  </div>
                </TableHead>
                <TableHead className="min-w-[12.5rem] max-w-[30%]">
                  НАЗВАНИЕ ФАЙЛА
                </TableHead>
                <TableHead className="whitespace-normal">
                  РЕЖИМ ДРОБЛЕНИЯ
                </TableHead>
                <TableHead>СЛОВА</TableHead>
                <TableHead className="whitespace-normal">
                  КОЛИЧЕСТВО ОБРАЩЕНИЙ
                </TableHead>
                <TableHead className="whitespace-normal">
                  ВРЕМЯ ЗАГРУЗКИ
                </TableHead>
                <TableHead>СТАТУС</TableHead>
                <TableHead className="min-w-[3.2rem]">ДЕЙСТВИЕ</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-[0.875rem]">
              {displayedFiles.map((file) => (
                <TableRow key={file.id} className="py-0">
                  <TableCell>
                    <div className="flex gap-[0.5rem] items-center">
                      <Checkbox
                        checked={selectedFiles.includes(file.id)}
                        onCheckedChange={() => toggleFile(file.id)}
                      />
                      {file?.orderNumber}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{file.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{file.mode}</Badge>
                  </TableCell>
                  <TableCell>{file.words}</TableCell>
                  <TableCell>{file.requests}</TableCell>
                  <TableCell>{file.uploadTime}</TableCell>
                  <TableCell>
                    <div className="flex gap-[0.5rem] items-center">
                      <div
                        className={cn(
                          "h-2 w-2 rounded-[3px]",
                          enabledStates[file.id]
                            ? "bg-green-500"
                            : "border border-solid border-gray-400"
                        )}
                      ></div>
                      {file.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={enabledStates[file.id]}
                      onCheckedChange={(checked) =>
                        toggleSwitch(file.id, checked)
                      }
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Settings2 />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="text-[0.75rem]">
                        <p>Настройки сегментации</p>
                      </TooltipContent>
                    </Tooltip>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <CustomPagination
        totalItems={sortedFiles.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      ></CustomPagination>
    </div>
  );
};
export default Documents;
