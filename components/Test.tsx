import React, { FC, useState } from "react";

interface ITest {
  selectedFile: (JSONResult: JSON) => void;
}

const Test: FC<ITest> = (props: ITest): JSX.Element => {
  const { selectedFile } = props;

  const [filetypeError, setFiletypeError] = useState(false);
  const [filetype, setFiletype] = useState("");

  const selectedFileHandler = (e: any) => {
    if (e.target.files[0].type !== undefined) {
      if (e.target.files[0].type === "application/json") {
        setFiletypeError(false);
        console.log("JSON1");

        const files = e.target.files;
        var reader = new FileReader();
        reader.readAsText(files[0], "UTF-8");
        reader.onload = function (evt: any) {
          console.log(JSON.parse(evt.target.result));
          // selectedFile(JSON.parse(evt.target.result));
        };
        // const fileReader = new FileReader();
        // fileReader.readAsText(e.target.files[0], "UTF-8");
        // fileReader.onload = (e) => {
        //   e.target && selectedFile(e.target.result);
        // };
        // selectedFile(e.target.files[0]);
        // Do the work
      } else {
        // Do nothing
        setFiletypeError(true);
        setFiletype(e.target.files[0].type);
      }
    }
  };

  return (
    <>
      <input accept=".JSON" type="file" onChange={selectedFileHandler} />
      {filetypeError && (
        <p style={{ color: "red" }}>{filetype} is not supported</p>
      )}
    </>
  );
};

export default Test;
