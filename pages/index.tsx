import { useState } from "react";

export default function Home() {
  // const [files, setFiles] = useState<JSON>();
  const [filetypeError, setFiletypeError] = useState(false);
  const [filetype, setFiletype] = useState("");
  const [content, setContent] = useState("");

  const selectedFileHandler = (e: any) => {
    if (e.target.files[0].type !== undefined) {
      if (e.target.files[0].type === "application/json") {
        setFiletypeError(false);
        console.log("JSON");

        // const files = e.target.files[0];
        // console.log(files.result);
        // const obj = JSON.parse(files);
        // console.log(obj.track.track_name);

        var reader = new FileReader();
        reader.readAsText(e.target.files[0], "UTF-8");
        reader.onload = (evt: any) => {
          console.log(JSON.parse(evt.target.result));
          setContent(evt.target.result);
          console.log(typeof evt.target.result);
        };
      } else {
        // Do nothing
        setFiletypeError(true);
        setFiletype(e.target.files[0].type);
      }
    }
  };

  const getResults = (): [] => {
    const obj = JSON.parse(content);
    {
      return obj.session_results[0].results.map(
        (result: any, index: number) => (
          <p key={index.toString()}>
            {result.display_name} {result.finish_position}
          </p>
        )
      );
    }
  };

  // const getTrack = () => {
  //   const obj = JSON.parse(content);
  //   return <h1>{obj.session_name}</h1>;
  // };

  return (
    <>
      {content === "" && (
        <input accept=".JSON" type="file" onChange={selectedFileHandler} />
      )}
      {filetypeError && (
        <p style={{ color: "red" }}>{filetype} is not supported</p>
      )}
      {/* <p>{content}</p> */}
      {/* <p>{getTrack()}</p> */}
      {content !== "" && getResults()}
    </>
  );
}
