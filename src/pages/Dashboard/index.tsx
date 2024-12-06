import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "../../store/app.store";
import { filmsList } from "../../api/adapters/films";
import { useState } from "react";
import {
  TextInput,
  Button,
  Table,
  Pagination,
  Container,
  Group,
  Center,
  Loader,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { path } from "../../navigation/CommonPaths";
import { getToken } from "../../utils/helpers/cookies.helpers";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<number | "">("");

  const { data: filmsListData, isLoading } = useQuery({
    queryKey: [
      "filmsList",
      currentPage,
      pageSize,
      sortField,
      sortOrder,
      searchQuery,
      yearFilter,
    ],
    queryFn: () =>
      filmsList({
        start: currentPage * pageSize - pageSize,
        length: pageSize,
        draw: 1,
        id: user?.id,
        search: { value: searchQuery },
        columns: [{ data: sortField }],
        order: [{ column: 0, dir: sortOrder }],
        filter: { year: yearFilter ? Number(yearFilter) : undefined },
      }),
    enabled: !!getToken(),
  });

  const films = filmsListData?.data || [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewClick = (id: string) => {
    navigate(`${path.viewFilm}?${id}/page`);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <Container>
      <Group mb="md">
        <TextInput
          placeholder="Search films"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ flex: 1 }}
        />
        <TextInput
          placeholder="Filter by year"
          value={yearFilter}
          onChange={(e) => {
            const value = e.target.value;
            setYearFilter(value === "" ? "" : Number(value));
          }}
          style={{ width: "150px" }}
          type="number"
        />
        <Button
          onClick={() => {
            navigate(path.addFilms);
          }}
        >
          Add
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th
              onClick={() => handleSort("title")}
              style={{ cursor: "pointer" }}
            >
              Title {sortField === "title" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("director")}
              style={{ cursor: "pointer" }}
            >
              Director{" "}
              {sortField === "director" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("producer")}
              style={{ cursor: "pointer" }}
            >
              Producer{" "}
              {sortField === "producer" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("releaseDate")}
              style={{ cursor: "pointer" }}
            >
              Release Date{" "}
              {sortField === "releaseDate" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5}>
                <Center style={{ height: "100vh" }}>
                  <Loader size="lg" />
                </Center>
              </td>
            </tr>
          ) : films.length > 0 ? (
            films.map((film: any) => (
              <tr key={film._id}>
                <td>{film.title}</td>
                <td>{film.director}</td>
                <td>{film.producer}</td>
                <td>{new Date(film.releaseDate).toDateString()}</td>
                <td>
                  <Button
                    variant="outline"
                    onClick={() => handleViewClick(film._id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No films found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination
        total={Math.ceil((filmsListData?.total || 0) / pageSize)}
        value={currentPage}
        onChange={setCurrentPage}
        mt="md"
      />
    </Container>
  );
};

export default Dashboard;
