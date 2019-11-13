import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import Select, { ValueType } from "react-select";
import { HttpResponseType } from "src/api";
import { authHttpGet } from "src/api/methods";
import ApiUrls from "src/api/urls";

interface Props {
  boardId: number | undefined;
  page: number | undefined;
  pageSize: number | undefined;
  setter: (ids: number[]) => void;
}

interface SelectOption {
  value: number;
  label: string;
}

const ParticipantsSelector = ({ setter, boardId, page, pageSize }: Props) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [participants, setParticipants] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (boardId == null) {
        return;
      }
      const { response, type } = await authHttpGet(
        `${ApiUrls.Board.PARTICIPANTS}/${boardId}`
      );
      if (type === HttpResponseType.Ok) {
        const currentParticipants = (response.data as AppUserBaseResultDto[]).map(
          (x): SelectOption => ({ label: x.name, value: x.id })
        );

        setParticipants(currentParticipants);
      }
    })();
  }, []);

  const handleInput = (newValue: string) => {
    if (newValue != null && newValue.length > 0) {
      getOptions(newValue);
    } else {
      setOptions([]);
    }
  };
  const throttledInputHandler = useCallback(_.debounce(handleInput, 300), [
    participants
  ]);

  const getParticipantIds = (opts: SelectOption[]) =>
    (opts || []).map(x => x.value);

  const getOptions = async (name: string) => {
    setLoading(true);
    const params: AppUserBaseRequestDTO = {
      name,
      ignoreUserIds: getParticipantIds(participants),
      boardId,
      page,
      pageSize
    };
    const { type, response } = await authHttpGet(
      ApiUrls.Board.PARTICIPANTS,
      params
    );
    if (type === HttpResponseType.Ok) {
      const opts = (response.data as AppUserBaseResultDTO[]).map(
        (x: AppUserBaseResultDTO): SelectOption => ({
          label: x.name,
          value: x.id
        })
      );
      setOptions(opts);
    }
    setLoading(false);
  };

  const handleChange = (values: ValueType<SelectOption>) => {
    const currentParticipants = values as SelectOption[];
    setParticipants(currentParticipants);
    if (setter) {
      const ids = getParticipantIds(currentParticipants);
      setter(ids);
    }
  };

  return (
    <Select
      isMulti
      options={options}
      isSearchable
      loadingMessage={() => "Loading..."}
      isLoading={loading}
      onInputChange={throttledInputHandler}
      onChange={handleChange}
      value={participants}
    />
  );
};

export default ParticipantsSelector;
