import { TextField, Box, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Search() {
  const search = useSelector((state) => state.movies.search);
  const [text, setText] = useState(search);

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box flexGrow={1}>
        <TextField
          fullWidth
          placeholder="What do you want to watch?"
          defaultValue={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </Box>
      <Button
        color="secondary"
        variant="contained"
        component={RouterLink}
        to={"/search/".concat(encodeURIComponent(text))}
        disabled={!text}
      >
        Search
      </Button>
    </Box>
  );
}
