import { useState } from "react";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

function Calculate() {
  const [seedling, setSeedling] = useState("");
  const [lengthArea, setLengthArea] = useState("");
  const [widthArea, setWidthArea] = useState("");
  const [beetRowArea, setBeetRowArea] = useState("");
  const [numberRowArea, setNumberRowArea] = useState("");
  const [beetSeedsArea, setBeetSeedsArea] = useState("");
  const [beetSeedlingsArea, setBeetSeedlingsArea] = useState("");
  const [seedsResult, setSeedsResult] = useState("");
  const [seedlingsResult, setSeedlingsResult] = useState("");

  const calculateByParams = () => {};

  return (
    <div className="calculate">
      <form className="flex flex-wrap gap-x-14 gap-y-14 justify-center">
        <FormControl>
          <InputLabel id="seedling-select-label">Название культуры</InputLabel>
          <Select
            className="w-64"
            labelId="seedling-select-label"
            id="seedling-select"
            value={seedling}
            label="Название культуры"
            onChange={(e) => setSeedling(e.target.value)}
          >
            <MenuItem value="tomato">Помидоры</MenuItem>
            <MenuItem value="cucumber">Огурцы</MenuItem>
          </Select>
        </FormControl>

        <TextField
          value={lengthArea}
          className="w-64"
          id="length-area"
          label="Длина"
          variant="standard"
          onChange={(e) => setLengthArea(e.target.value)}
        />
        <TextField
          value={widthArea}
          className="w-64"
          id="width-area"
          label="Ширина"
          variant="standard"
          onChange={(e) => setWidthArea(e.target.value)}
        />
        <TextField
          value={beetRowArea}
          className="w-64"
          id="beet-row-area"
          label="Расстояние между рядами"
          variant="standard"
          onChange={(e) => setBeetRowArea(e.target.value)}
        />
        <TextField
          value={numberRowArea}
          className="w-64"
          id="number-row-area"
          label="Количество строк"
          variant="standard"
          onChange={(e) => setNumberRowArea(e.target.value)}
        />
        <TextField
          value={beetSeedsArea}
          className="w-64"
          id="beet-seeds-area"
          label="Расстояние между семенами"
          variant="standard"
          onChange={(e) => setBeetSeedsArea(e.target.value)}
        />
        <TextField
          value={beetSeedlingsArea}
          className="w-64"
          id="beet-seedlings-area"
          label="Расстояние между саженцами"
          variant="standard"
          onChange={(e) => setBeetSeedlingsArea(e.target.value)}
        />

        <Button variant="contained" color="success">
          Расчитать
        </Button>
      </form>
    </div>
  );
}

export default Calculate;
