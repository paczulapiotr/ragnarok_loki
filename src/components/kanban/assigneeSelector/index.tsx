import { getBoardUsers } from "api/gateway";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import Select, { ValueType } from "react-select";
interface Props {
  selectedOption?: SelectOption;
  boardId: number;
  setAssignee: (assignee: AppUserBaseResultDTO | null) => void;
  className?: string;
}

const AssigneeSelector = ({ selectedOption, boardId, setAssignee }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const setOptionsWrapper = (users: AppUserBaseResultDTO[]) => {
    const opts = users.map(
      (x: AppUserBaseResultDTO): SelectOption => ({
        label: x.name,
        value: x.id
      })
    );
    setOptions(opts);
  };

  const handleInput = (name: string) => {
    getBoardUsers(name, boardId!, setOptionsWrapper, setIsLoading);
  };

  const throttledInputHandler = useCallback(debounce(handleInput, 300), []);
  const handleChange = (changed: ValueType<SelectOption>) => {
    if (changed == null) {
      setAssignee(null);
    }
    const { value, label } = changed as SelectOption;
    setAssignee({ id: value, name: label });
  };

  return (
    <div className="loki-selector">
      <Select
        isClearable
        className="item-assignee"
        placeholder="Assignee"
        classNamePrefix="select"
        loadingMessage={() => "Loading..."}
        defaultValue={selectedOption}
        onInputChange={throttledInputHandler}
        onChange={handleChange}
        isLoading={isLoading}
        isSearchable
        options={options}
      />
    </div>
  );
};
export default AssigneeSelector;
