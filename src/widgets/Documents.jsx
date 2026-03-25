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

import {
  ArrowUpWideNarrow,
  ArrowDownNarrowWide,
  Plus,
  NotebookPen,
  MoreHorizontal,
  Settings2,
} from "lucide-react";

import { useState } from "react";

import { Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const Documents = () => {
  const [sortOrder, setSortOrder] = useState("asc"); // "desc" || "asc"
  const [sortBy, setSortBy] = useState("count");
  const [showBy, setShowBy] = useState("Все");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [files, setFiles] = useState([
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
  ]);

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
    const updatedFiles = files.map((file) =>
      file.id === fileId
        ? {
            ...file,
            status: file.status === "Отключено" ? "Доступно" : "Отключено",
          }
        : file
    );

    setFiles(updatedFiles);

    setEnabledStates((prev) => ({
      ...prev,
      [fileId]: checked,
    }));
  };

  return (
    <div className="flex flex-col h-full p-[1.5rem]">
      <h2 className="text-[1rem]">Документы</h2>
      <p className="text-[0.875rem]">
        Здесь отображаются все файлы базы знаний, и вся база знаний может быть
        связана с цитатами Dify или проиндексирована с помощью чата.{" "}
        <a href="/">Подробнее</a>
      </p>

      <div className="flex gap-[0.5rem] flex-wrap justify-between">
        <div className="flex gap-[0.5rem] flex-wrap">
          <Select value={showBy} onValueChange={setShowBy}>
            <SelectTrigger className="w-[160px] text-[length:var(--font-size-base)]">
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

          <InputGroup className="max-w-[200px] ">
            <InputGroupInput
              placeholder="Поиск"
              className="text-[length:var(--font-size-base)]"
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
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? (
                <ArrowUpWideNarrow className="h-4 w-4" />
              ) : (
                <ArrowDownNarrowWide className="h-4 w-4" />
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
        <Table>
          <TableHeader>
            <TableRow className="text-[0.75rem] ">
              <TableHead className="w-[50px] ">
                <div className="flex gap-[0.5rem] items-center">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Выбрать всё"
                  />
                  #
                </div>
              </TableHead>
              <TableHead className="max-w-[200px]">НАЗВАНИЕ ФАЙЛА</TableHead>
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
              <TableHead className="w-[50px]">ДЕЙСТВИЕ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[0.875rem]">
            {files.map((file) => (
              <TableRow key={file.id} className="py-0">
                <TableCell>
                  <div className="flex gap-[0.5rem] items-center">
                    <Checkbox
                      checked={selectedFiles.includes(file.id)}
                      onCheckedChange={() => toggleFile(file.id)}
                    />
                    {file.id}
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
      </div>
    </div>
  );
};
export default Documents;
