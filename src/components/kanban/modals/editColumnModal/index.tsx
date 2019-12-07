import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Loader from "src/components/common/loader";
import ModalBase from "src/components/common/modal";
import ModalContent from "src/components/common/modal/content";
import ModalFooter from "src/components/common/modal/footer";

interface Props {
  open: boolean;
  name: string;
  setOpen: (arg: boolean) => void;
  isLoading: boolean;
  editColumn: (columnName: string) => void;
}

const EditColumnModal = ({
  name,
  open,
  setOpen,
  isLoading,
  editColumn
}: Props) => {
  const [columnName, setColumnName] = useState(name);
  useEffect(() => {
    setColumnName(name);
  }, [name]);

  const actions: ModalButton[] = [
    {
      content: "Save",
      onClick: () => {
        editColumn(columnName);
        setColumnName("");
      }
    },
    { content: "Cancel" }
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(e.target.value);
  };

  return (
    <ModalBase open={open} setOpen={setOpen}>
      <ModalContent modalTitle={`Edit ${name} column`}>
        {isLoading ? (
          <Loader />
        ) : (
          <TextField
            value={columnName}
            onChange={onChange}
            placeholder={"Column name"}
            fullWidth
          />
        )}
      </ModalContent>
      <ModalFooter setOpen={setOpen} actions={actions} />
    </ModalBase>
  );
};

export default EditColumnModal;
