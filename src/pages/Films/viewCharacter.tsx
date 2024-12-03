import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { viewCharacter } from "../../api/adapters/films";
import {
  Card,
  Title,
  Text,
  Group,
  Badge,
  List,
  Loader,
  Center,
  Stack,
  Button,
} from "@mantine/core";

interface Character {
  name: string;
  birthYear: string;
  gender: string;
  height: string;
  mass: string;
  eyeColor: string;
  hairColor: string;
  skinColor: string;
  films: string[];
}

const ViewCharacter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.search.substring(1);

  const {
    data: characterData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["charactersDetailQueryKey", id],
    queryFn: () => viewCharacter(id),
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && (isError || !characterData)) {
      navigate("/404");
    }
  }, [isLoading, isError, characterData, navigate]);

  const character: Character = characterData?.data?.characters[0];

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (!character) {
    return (
      <Center style={{ height: "100vh" }}>
        <Text color="red" size="lg">
          Failed to load character data.
        </Text>
      </Center>
    );
  }

  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Title order={2} align="center">
          {character.name}
        </Title>
        <Stack spacing="sm" mt="lg">
          <Text>
            <strong>Birth Year:</strong> {character.birthYear}
          </Text>
          <Text>
            <strong>Gender:</strong> {character.gender}
          </Text>
          <Text>
            <strong>Height:</strong> {character.height} cm
          </Text>
          <Text>
            <strong>Mass:</strong> {character.mass} kg
          </Text>
        </Stack>
        <Group mt="md" position="center">
          <Badge color="blue" variant="light">
            Eye Color: {character.eyeColor}
          </Badge>
          <Badge color="cyan" variant="light">
            Hair Color: {character.hairColor}
          </Badge>
          <Badge color="teal" variant="light">
            Skin Color: {character.skinColor}
          </Badge>
        </Group>
        <Title order={3} mt="lg" align="center">
          Films
        </Title>
        {character.films && character.films.length > 0 ? (
          <List withPadding mt="md">
            {character.films.map((film, index) => (
              <List.Item key={index}>{film}</List.Item>
            ))}
          </List>
        ) : (
          <Text align="center" mt="md" color="neutral[5]">
            No films available.
          </Text>
        )}
      </Card>
    </>
  );
};

export default ViewCharacter;
