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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useDocuments({
    searchQuery: searchQuery ? searchQuery.trim() : "",
    filterOption,
    page: currentPage,
    pageSize,
    sortBy,
    sortOrder,
  });
  const files = data?.result || [];
  const total = data?.total || 0;
  const areNoDocuments = data?.total === 0;

  // const [files, setFiles] = useState([]);

  // Table-column  "checkbox"
  const isAllSelected = selectedFiles.length === files.length;

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map((f) => f.id));
    }
  };

  const selectFile = (fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

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
  };

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
            <Select
              value={sortBy}
              onValueChange={(value) => {
                setCurrentPage(1);
                setSortBy(value);
              }}
            >
              <SelectTrigger className="relative w-[310px] pl-[120px] text-[length:var(--font-size-base)]">
                <span className="absolute left-[0.5rem]">Сортировать по:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="time"
                  className="text-(length:--font-size-base)"
                >
                  Время загрузки
                </SelectItem>
                <SelectItem
                  value="count"
                  className="text-(length:--font-size-base)"
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

        <div className="flex gap-2">
          <Button variant="outline" className="text-(length:--font-size-base)">
            <NotebookPen />
            Метаданные
          </Button>

          <Button variant="outline" className="text-(length:--font-size-base)">
            <Plus />
            Добавить файл
          </Button>
        </div>
      </div>

      <div className="h-0 grow overflow-auto">
        {isLoading ? (
          <div>Загрузка</div>
        ) : total <= 0 ? (
          areNoDocuments ? (
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
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={toggleAll}
                      aria-label="Выбрать всё"
                    />
                    #
                  </div>
                </TableHead>
                <TableHead className="min-w-50 max-w-[30%]">
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
              {files.map((file) => (
                <TableRow key={file.id} className="py-0">
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <Checkbox
                        checked={selectedFiles.includes(file.id)}
                        onCheckedChange={() => selectFile(file.id)}
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
                    <div className="flex gap-2 items-center">
                      <div
                        className={cn(
                          "h-2 w-2 rounded-[3px]",
                          file.enabled
                            ? "bg-green-500"
                            : "border border-solid border-gray-400"
                        )}
                      ></div>
                      {file.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={file.enabled}
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
        totalItems={total}
        pageSize={pageSize}
        currentPage={total > 0 ? currentPage : 0}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};
export default Documents;
