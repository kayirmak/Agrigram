import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

function Calculate() {
  const [seedsResult, setSeedsResult] = useState("");
  const [seedlingsResult, setSeedlingsResult] = useState("");

  const {
    formState: { isValid },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setValue("numberRowArea", Math.round(data.lengthArea / data.beetRowArea));
    const numberRowArea = Math.round(data.lengthArea / data.beetRowArea);
    setSeedsResult((data.lengthArea / data.beetSeedsArea) * numberRowArea);
    setSeedlingsResult(
      Math.round((data.lengthArea / data.beetSeedlingsArea) * numberRowArea)
    );
  };

  const crop = [
    {
      val: "tomato",
      name: "Помидоры",
      beetSeedsArea: 0,
      beetSeedlingsArea: 0.6,
    },
    {
      val: "cucumber",
      name: "Огурцы",
      beetSeedsArea: 0.25,
      beetSeedlingsArea: 0,
    },
    {
      val: "cabbage",
      name: "Капуста",
      beetSeedsArea: 0.25,
      beetSeedlingsArea: 0.4,
    },
    {
      val: "eggplant",
      name: "Баклажан",
      beetSeedsArea: 0,
      beetSeedlingsArea: 0.5,
    },
    {
      val: "carrot",
      name: "Морковь",
      beetSeedsArea: 0.05,
      beetSeedlingsArea: 0,
    },
    {
      val: "radish",
      name: "Редиска",
      beetSeedsArea: 0.03,
      beetSeedlingsArea: 0,
    },
  ];

  return (
    <div className="calculate">
      <h2 className="text-4xl text-center font-bold mb-16">
        Расчет семян и саженцев
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap gap-x-14 gap-y-14 justify-center"
      >
        <Controller
          name="typeOfSeedling"
          defaultValue=""
          control={control}
          rules={{ required: "Объязательно" }}
          render={({ field }) => (
            <FormControl>
              <InputLabel id="seedling-select-label">
                Название культуры
              </InputLabel>
              <Select
                value={field.value}
                className="w-64"
                labelId="seedling-select-label"
                id="seedling-select"
                label="Название культуры"
                onChange={(e, val) => {
                  console.log(val.props.data);
                  setValue("beetSeedsArea", val.props.data.beetSeedsArea);
                  setValue(
                    "beetSeedlingsArea",
                    val.props.data.beetSeedlingsArea
                  );
                  field.onChange(val.props.value);
                }}
                // onChange={(e) => setSeedling(e.target.value)}
              >
                {crop.map((item) => {
                  return (
                    <MenuItem key={item.val} data={item} value={item.val}>
                      {item.name}
                    </MenuItem>
                  );
                })}
                {/* <MenuItem value="tomato">Помидоры</MenuItem>
                <MenuItem value="cucumber">Огурцы</MenuItem> */}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="lengthArea"
          defaultValue=""
          control={control}
          rules={{ required: "Объязательно" }}
          render={({ field }) => (
            <TextField
              {...field}
              className="w-64"
              id="length-area"
              label="Длина"
              variant="standard"
              // onChange={(e) => setLengthArea(e.target.value)}
            />
          )}
        />

        <Controller
          name="widthArea"
          defaultValue=""
          control={control}
          rules={{ required: "Объязательно" }}
          render={({ field }) => (
            <TextField
              {...field}
              className="w-64"
              id="width-area"
              label="Ширина"
              variant="standard"
              // onChange={(e) => setWidthArea(e.target.value)}
            />
          )}
        />
        <Controller
          name="beetRowArea"
          defaultValue=""
          control={control}
          rules={{ required: "Объязательно" }}
          render={({ field }) => (
            <TextField
              {...field}
              className="w-64"
              id="beet-row-area"
              label="Расстояние между рядами"
              variant="standard"
              // onChange={(e) => setBeetRowArea(e.target.value)}
            />
          )}
        />
        <Controller
          name="numberRowArea"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="w-64"
              id="number-row-area"
              label="Количество строк"
              variant="standard"
              // onChange={(e) => setNumberRowArea(e.target.value)}
              disabled
            />
          )}
        />
        <Controller
          name="beetSeedsArea"
          defaultValue=""
          control={control}
          rules={{ required: "Объязательно" }}
          render={({ field }) => (
            <TextField
              {...field}
              className="w-64"
              id="beet-seeds-area"
              label="Расстояние между семенами"
              variant="standard"
              // onChange={(e) => setBeetSeedsArea(e.target.value)}
            />
          )}
        />
        <Controller
          name="beetSeedlingsArea"
          defaultValue=""
          control={control}
          rules={{ required: "Объязательно" }}
          render={({ field }) => (
            <TextField
              {...field}
              className="w-64"
              id="beet-seedlings-area"
              label="Расстояние между саженцами"
              variant="standard"
              // onChange={(e) => setBeetSeedlingsArea(e.target.value)}
            />
          )}
        />

        <Button
          disabled={!isValid}
          type="submit"
          variant="contained"
          color="success"
        >
          Расчитать
        </Button>
      </form>
      <p className="text-xs mt-12">Значения в метрах</p>

      <hr className="mb-12" />
      <div className="flex gap-x-5">
        <div className="flex w-max p-5 gap-x-8 rounded-xl bg-[#1ab394]">
          <img src="https://calculators.agroinform.asia/images/seeds.png" />
          <div className="flex flex-col gap-y-3">
            <h3 className="text-white text-xs">Количество семян</h3>
            <h2 className="text-white text-2xl">{Math.round(seedsResult)}</h2>
          </div>
        </div>

        <div className="flex w-max p-5 gap-x-8 rounded-xl bg-[#1ab394]">
          <img src="https://calculators.agroinform.asia/images/seedlings.png" />
          <div className="flex flex-col gap-y-3">
            <h3 className="text-white text-xs">Количество саженцев</h3>
            <h2 className="text-white text-2xl">
              {Math.round(seedlingsResult)}
              {console.log(typeof seedlingsResult)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculate;
