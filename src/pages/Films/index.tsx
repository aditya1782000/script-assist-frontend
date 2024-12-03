import { useQuery } from "@tanstack/react-query";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { viewFilms } from "../../api/adapters/films";
import {
  Card,
  Text,
  Title,
  Table,
  Anchor,
  Group,
  Center,
  Loader,
  Button,
} from "@mantine/core";
import { path } from "../../navigation/CommonPaths";
import { useEffect } from "react";

const ViewFilms = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const id = location.search.substring(1);

  const {
    data: filmsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["filmsDetailQueryKey", id],
    queryFn: () => viewFilms(id),
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && (isError || !filmsData)) {
      navigate("/404");
    }
  }, [isLoading, isError, filmsData, navigate]);

  const film = filmsData?.data;

  if (!film) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2}>{film.title}</Title>
        <Text size="sm" color="dimmed" mt="xs">
          {film.description}
        </Text>

        <Group mt="md" spacing="xl">
          <Text>
            <strong>Director:</strong> {film.director}
          </Text>
          <Text>
            <strong>Producer:</strong> {film.producer}
          </Text>
          <Text>
            <strong>Release Date:</strong>{" "}
            {new Date(film.releaseDate).toDateString()}
          </Text>
        </Group>
        <Title order={3} mt="lg">
          Characters
        </Title>

        {film.characters.length > 0 ? (
          <Table mt="md" highlightOnHover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth Year</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {film.characters.map((character: any) => (
                <tr key={character._id}>
                  <td>
                    <Anchor
                      component={Link}
                      to={`${path.viewCharacter}?${character._id}`}
                    >
                      {character.name}
                    </Anchor>
                  </td>
                  <td>{character.birthYear}</td>
                  <td>{character.gender}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Text>No characters available.</Text>
        )}
      </Card>
    </>
  );
};

export default ViewFilms;
