import { getBoardUsers } from "api/gateway";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import Select from "react-select";
interface Props {
  selectedOption?: SelectOption;
  boardId: number;
  setAssignee: (assignee: AppUserBaseResultDTO | null) => void;
  className?: string;
}

const AssigneeSelector = ({ selectedOption, boardId, setAssignee }: Props) => {
  const notAssigned: SelectOption = { label: "Not assigned", value: -1 };
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>([notAssigned]);
  const setOptionsWrapper = (users: AppUserBaseResultDTO[]) => {
    const opts: SelectOption[] = [
      notAssigned,
      ...users.map(
        (x: AppUserBaseResultDTO): SelectOption => ({
          label: x.name,
          value: x.id
        })
      )
    ];
    setOptions(opts);
  };

  const handleInput = (name: string) => {
    getBoardUsers(name, boardId!, setOptionsWrapper, setIsLoading);
  };

  const throttledInputHandler = useCallback(debounce(handleInput, 300), []);
  const handleChange = (changed: SelectOption) => {
    if (changed == null || changed.value < 0) {
      setAssignee(null);
    } else {
      const { value, label } = changed;
      setAssignee({ id: value, name: label });
    }
  };

  return (
    <div className="loki-selector">
      <Select
        className="item-assignee"
        placeholder="Assignee"
        classNamePrefix="select"
        loadingMessage={() => "Loading..."}
        defaultValue={selectedOption}
        onInputChange={throttledInputHandler}
        onChange={handleChange as any}
        isLoading={isLoading}
        isSearchable
        options={options}
      />
    </div>
  );
};
export default AssigneeSelector;
