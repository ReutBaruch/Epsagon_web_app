import React, { useEffect, useState } from "react";

import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";

export const App = () => {
  const [spans, setSpans] = useState([]);
  const [spansColumns, setSpansColumns] = useState([
    { field: "spanId", 
      headerName: "Span Id", 
      width: 250, 
      type: "string",
      sortable: true
    },
    { field: "parentSpanId", 
      headerName: "Parent Span Id", 
      width: 200, 
      sortable: true 
    },
    {
      field: "operationName",
      headerName: "Operation Name",
      width: 350,
      sortable: true,
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 350,
      type: "date",
      sortable: true,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 350,
      type: "number",
      sortable: true,
    },
    {
      field: "logs",
      headerName: "logs",
      type: "json",
      width: 350,
      sortable: false,
    },
  ]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/spans`)
      .then((response) => {
        const spansData = response.data.map((span) => {
          const date = new Date(span.startTime)
          const newTagObject = span.tags.reduce((prev, tag) => {
            if (tag.vStr) {
              return {
                ...prev,
                [tag.key]: tag.vStr,
              };
            }
            if (tag.vBool) {
              return {
                ...prev,
                [tag.key]: tag.vBool,
              };
            }
            if (tag.vDouble) {
              return {
                ...prev,
                [tag.key]: tag.vDouble,
              };
            }
            if (tag.vLong) {
              return {
                ...prev,
                [tag.key]: tag.vLong,
              };
            }
            return prev;
          }, {});
          console.log(newTagObject);
          console.log(date);
          return {
            ...span,
            id: span.spanId,
            ...newTagObject,
            startTime: date,
          };
        });
        setSpans(spansData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fieldNameSet = new Set();
    spans.forEach((span) => {
      const { tags } = span;
      tags.forEach((tag) => {
        if (tag.key) {
          fieldNameSet.add(tag.key);
        }
      });
    });
    const newCols = Array.from(fieldNameSet).map((fieldName) => ({
      field: fieldName,
      headerName: fieldName,
      width: 200,
      sortable: true,
    }));
    setSpansColumns((prevState) => [...prevState, ...newCols]);
  }, [spans]);

  if (!spans || spans.length === 0) {
    return <h1>No spans</h1>;
  }
  console.log("spansColumns", spansColumns);
  return (
    <div
      style={{
        height: "800px",
        width: "100%",
        margin: "20px",
        textAlign: "center",
      }}
    >
      <h1>Spans Table</h1>
      <DataGrid rows={spans} columns={spansColumns} />
    </div>
  );
};