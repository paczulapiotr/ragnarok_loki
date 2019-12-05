import {
  FormGroup,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import "./style.scss";

const selectOptions = {
  owned: { key: 0, name: "Owned" },
  shared: { key: 1, name: "Shared" }
};

interface Props {
  onSearch: (text: string, owned: boolean) => void;
  placeholder: string;
}

const SearchBar = ({ onSearch, placeholder = "" }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const showOwned = (): boolean => selectedOption === selectOptions.owned.key;

  function manageSearchClick() {
    onSearch(searchText, showOwned());
  }

  function invokeSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    const key = event.keyCode || event.which;
    if (key === 13) {
      onSearch(searchText, showOwned());
    }
  }

  const onSelectChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    _: React.ReactNode
  ) => setSelectedOption(Number(event.target.value));

  return (
    <div className="search-bar">
      <Paper style={{ paddingLeft: "10px" }}>
        <FormGroup row>
          <InputBase
            style={{
              width: "min-content",
              margin: "0",
              paddingRight: "10px",
              flex: "auto"
            }}
            onKeyUp={invokeSearch}
            placeholder={placeholder}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Select
            style={{ paddingLeft: "5px" }}
            value={selectedOption}
            onChange={onSelectChange}
          >
            {Object.keys(selectOptions).map(k => (
              <MenuItem key={selectOptions[k].key} value={selectOptions[k].key}>
                <span style={{ margin: "0 5px" }}>{selectOptions[k].name}</span>
              </MenuItem>
            ))}
          </Select>
          <IconButton
            color="primary"
            aria-label="Search"
            onClick={manageSearchClick}
          >
            <SearchOutlined />
          </IconButton>
        </FormGroup>
      </Paper>
    </div>
  );
};

export default SearchBar;
