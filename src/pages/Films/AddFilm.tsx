import { useMutation } from "@tanstack/react-query";
import { addFilms } from "../../api/adapters/films";
import { ICharacter } from "../../utils/helpers/CharacterInterface";
import { notify } from "../../utils/helpers/toaster.helper";
import { useNavigate } from "react-router-dom";
import { path } from "../../navigation/CommonPaths";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  Container,
  Group,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";

type AddFilmsFormValue = {
  title: string;
  description: string;
  director: string;
  producer: string;
  releaseDate: Date | null;
  characters: ICharacter[];
};

const AddFilm = () => {
  const navigate = useNavigate();
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);

  const { mutate: addFilmMutation } = useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      director: string;
      producer: string;
      releaseDate: Date | null;
      characters: ICharacter[];
    }) => addFilms(data),
    onSuccess: (data) => {
      notify("success", data?.message);
      navigate(path.dashboard);
    },
    onError: (error: { message?: string }) => {
      notify("error", error?.message || "An unknown error occurred");
    },
  });

  const {
    register: addFilm,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddFilmsFormValue>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "characters",
  });

  return (
    <>
      <Container>
        <Title order={2} mb="md">
          Add Film
        </Title>
        <Stack>
          <TextInput
            label="Title"
            placeholder="Film title"
            error={errors.title?.message}
            {...addFilm("title", { required: "Title is required" })}
          />
          <TextInput
            label="Description"
            placeholder="Film description"
            error={errors.description?.message}
            {...addFilm("description", { required: "Description is required" })}
          />
          <TextInput
            label="Director"
            placeholder="Director's name"
            error={errors.director?.message}
            {...addFilm("director", { required: "Director is required" })}
          />
          <TextInput
            label="Producer"
            placeholder="Producer's name"
            error={errors.producer?.message}
            {...addFilm("producer", { required: "Producer is required" })}
          />
          <DatePickerInput
            label="Date"
            placeholder="Select a Date"
            value={releaseDate}
            onChange={setReleaseDate}
          />
          <Group position="apart" mt="md">
            <Title order={4}>Characters</Title>
            <Button
              type="button"
              onClick={() =>
                append({
                  name: "",
                  height: 0,
                  mass: 0,
                  hairColor: "",
                  skinColor: "",
                  eyeColor: "",
                  birthYear: "",
                  gender: "",
                  films: [],
                })
              }
            >
              Add Character
            </Button>
          </Group>
          {fields.map((field, index) => (
            <Stack key={field.id} spacing="xs" mt="sm">
              <TextInput
                label="Name"
                placeholder="Character name"
                error={errors.characters?.[index]?.name?.message}
                {...addFilm(`characters.${index}.name`, {
                  required: "Character name is required",
                })}
              />
              <Group grow>
                <TextInput
                  label="Height"
                  placeholder="Height"
                  type="number"
                  error={errors.characters?.[index]?.height?.message}
                  {...addFilm(`characters.${index}.height`, {
                    required: "Character height is required",
                    valueAsNumber: true,
                  })}
                />
                <TextInput
                  label="Mass"
                  placeholder="Mass"
                  type="number"
                  error={errors.characters?.[index]?.mass?.message}
                  {...addFilm(`characters.${index}.mass`, {
                    required: "Character Mass is required",
                    valueAsNumber: true,
                  })}
                />
              </Group>
              <Group grow>
                <TextInput
                  label="Hair Color"
                  placeholder="Hair color"
                  error={errors.characters?.[index]?.hairColor?.message}
                  {...addFilm(`characters.${index}.hairColor`, {
                    required: "Character Hair color is required",
                  })}
                />
                <TextInput
                  label="Skin Color"
                  placeholder="Skin color"
                  error={errors.characters?.[index]?.skinColor?.message}
                  {...addFilm(`characters.${index}.skinColor`, {
                    required: "Character Skin color is required",
                  })}
                />
              </Group>
              <Group grow>
                <TextInput
                  label="Eye Color"
                  placeholder="Eye color"
                  error={errors.characters?.[index]?.eyeColor?.message}
                  {...addFilm(`characters.${index}.eyeColor`, {
                    required: "Character Eye color is required",
                  })}
                />
                <TextInput
                  label="Birth Year"
                  placeholder="Birth year"
                  error={errors.characters?.[index]?.birthYear?.message}
                  {...addFilm(`characters.${index}.birthYear`, {
                    required: "Character Birth year is required",
                  })}
                />
              </Group>
              <Group grow>
                <TextInput
                  label="Gender"
                  placeholder="Gender"
                  error={errors.characters?.[index]?.gender?.message}
                  {...addFilm(`characters.${index}.gender`, {
                    required: "Character gender is required",
                  })}
                />
              </Group>
              <TextInput
                label="Films"
                placeholder="Enter film names"
                error={errors.characters?.[index]?.films?.message}
                {...addFilm(`characters.${index}.films`, {
                  required: "At least one film is required",
                  setValueAs: (value: unknown) => {
                    if (typeof value === "string") {
                      return value.split(",").map((film) => film.trim());
                    }
                    return [];
                  },
                })}
              />
              <Button
                variant="light"
                color="red"
                mt="xs"
                type="button"
                onClick={() => remove(index)}
              >
                Remove Character
              </Button>
            </Stack>
          ))}

          <Group position="right" mt="md">
            <Button
              type="reset"
              variant="light"
              onClick={() => {
                navigate(path.dashboard);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit((data) => {
                addFilmMutation({ ...data, releaseDate });
              })}
            >
              Submit
            </Button>
          </Group>
        </Stack>
      </Container>
    </>
  );
};

export default AddFilm;
