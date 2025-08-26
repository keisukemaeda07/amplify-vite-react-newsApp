import React from "react";
import { useState, useEffect } from "react";
import { Sortby } from "../models/enums";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  fetchEveryNews(): Promise<void>;
}

const SearchForm: React.FC<Props> = ({ setUrl, fetchEveryNews }: Props) => {
  const [keyword, setKeyword] = useState<string>("AI");
  const [sortby, setSortby] = useState<Sortby>(Sortby.Relevancy);
  const yesterday = dayjs().subtract(1, "day");
  const today = dayjs();
  const [fromDate, setFromDate] = React.useState<Dayjs | null>(
    dayjs(yesterday)
  );
  const [toDate, setToDate] = React.useState<Dayjs | null>(dayjs(today));

  const getURL = () => {
    const from: string = fromDate ? fromDate.format("YYYY-MM-DD") : "";
    const to: string = toDate ? toDate.format("YYYY-MM-DD") : "";
    const url = new URL(
      "https://4i3lvtkpt4l6zvqflbe5aryjt40yrnfl.lambda-url.ap-southeast-2.on.aws/"
    );
    url.searchParams.append("keyword", keyword);
    url.searchParams.append("from", from);
    url.searchParams.append("to", to);
    url.searchParams.append("sortBy", sortby);
    setUrl(url.toString());
  };

  const updateSortType = (e: SelectChangeEvent) => {
    setSortby(e.target.value as Sortby);
  };

  useEffect(() => {
    getURL();
  }, [keyword, sortby, toDate, fromDate]);

  return (
    <form className="bg-gray-100 rounded-lg shadow-md my-2 p-4">
      <div className="py-4 grid gap-6  md:grid-cols-2">
        <TextField
          label="Keyword"
          variant="outlined"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Sort Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortby}
            label="Sort Type"
            onChange={updateSortType}
          >
            <MenuItem value={Sortby.PublishedAt}>PublishedAt</MenuItem>
            <MenuItem value={Sortby.Popularity}>Popularity</MenuItem>
            <MenuItem value={Sortby.Relevancy}>Relevancy</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            value={fromDate}
            onChange={(newValue) => setFromDate(newValue)}
          />

          <DatePicker
            label="To"
            value={toDate}
            onChange={(newValue) => setToDate(newValue)}
          />
        </LocalizationProvider>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => fetchEveryNews()}
          variant="contained"
          endIcon={<SearchIcon />}
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
