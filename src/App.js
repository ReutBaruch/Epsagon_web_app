import React, { useEffect, useState } from "react";

import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";

export const App = () => {
  const [spans, setSpans] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/spans`)
      .then((response) => {
        console.log(response);
        const spansData = response.data.map((span) => {
          return {
            ...span,
            id: span.spanId,
          };
        });
        setSpans(spansData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    { field: "spanId", headerName: "Span Id", width: 200, sortable: true },
    {
      field: "operationName",
      headerName: "Operation Name",
      width: 350,
      sortable: true,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 350,
      type: "number",
      sortable: true,
    },
  ];

  if (!spans || spans.length === 0) {
    return <h1>No spans</h1>;
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={spans} columns={columns} />;
    </div>
  );
};
