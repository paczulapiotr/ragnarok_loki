import _ from "lodash";
import React, { useCallback, useState } from "react";
import Select, { ValueType } from "react-select";
import { HttpResponseType } from "src/api";
import { authHttpGet } from "src/api/methods";
import ApiUrls from "src/api/urls";

interface Props {
  ignoreUserIds: number[];
  boardId: number | undefined;
  page: number | undefined;
  pageSize: number | undefined;
  setter: (ids: number[]) => void;
}

interface SelectOption {
  value: number;
  label: string;
}

const ParticipantsSelector = ({
  setter,
  ignoreUserIds,
  boardId,
  page,
  pageSize
}: Props) => {
  const [participants, setParticipants] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInput = (newValue: string) => {
    console.log("INPUT", newValue);
    if (newValue != null && newValue.length > 0) {
      getParticipants(newValue);
    } else {
      setParticipants([]);
    }
  };
  const throttledInputHandler = useCallback(_.debounce(handleInput, 300), []);

  const getParticipants = async (name: string) => {
    setLoading(true);
    const params: AppUserBaseRequestDTO = {
      name,
      ignoreUserIds,
      boardId,
      page,
      pageSize
    };
    const { type, response } = await authHttpGet(
      ApiUrls.Board.PARTICIPANTS,
      params
    );
    if (type === HttpResponseType.Ok) {
      const options = (response.data as AppUserBaseResultDTO[]).map(
        (x: AppUserBaseResultDTO): SelectOption => ({
          label: x.name,
          value: x.id
        })
      );
      setParticipants(options);
    }
    setLoading(false);
  };

  const handleChange = (values: ValueType<SelectOption>) => {
    const options = values as SelectOption[];
    if (setter) {
      setter(options.map(x => x.value));
    }
  };

  return (
    <Select
      isMulti
      options={participants}
      isSearchable
      loadingMessage={() => "Loading..."}
      isLoading={loading}
      onInputChange={throttledInputHandler}
      onChange={handleChange}
    />
  );
};

export default ParticipantsSelector;
