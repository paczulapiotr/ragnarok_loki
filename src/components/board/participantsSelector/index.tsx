import { searchNewBoardUsers } from "api/gateway";
import { authHttpGet } from "api/methods";
import { ApiUrls } from "api/urls";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import Select, { ValueType } from "react-select";
import { HttpResponseType } from "src/api";

interface Props {
  boardId?: number;
  page?: number;
  pageSize?: number;
  setter: (ids: number[]) => void;
}

const ParticipantsSelector = ({
  setter,
  boardId,
  page = 0,
  pageSize = 5
}: Props) => {
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
        const currentParticipants = (response.data as AppUserBaseResultDTO[]).map(
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
  const throttledInputHandler = useCallback(debounce(handleInput, 300), [
    participants
  ]);

  const getParticipantIds = (opts: SelectOption[]) =>
    (opts || []).map(x => x.value);

  const setOptionsWrapper = (users: AppUserBaseResultDTO[]) => {
    const opts = users.map(
      (x: AppUserBaseResultDTO): SelectOption => ({
        label: x.name,
        value: x.id
      })
    );
    setOptions(opts);
  };

  const getOptions = async (name: string) => {
    searchNewBoardUsers(name, boardId!, setOptionsWrapper, setLoading);
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
