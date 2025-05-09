"use client";

import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextareaAutosize,
  Button,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import { formOptions } from "@/app/data";

const Form = () => {
  const [type, setTipo] = useState("");
  const [price, setPrice] = useState("0.00")
  const [showPrice, setShowPrice] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    size: "",
    material: "",
    doubleSide: false,
    type: "",
    email: "",
    comment: "",
    getEmail: false,
  });

  const handleSelect = (e:any) => {
    setTipo(e.target.value);
    setShowPrice(false);
    if (e.target.value === "postCard") {
      setPrice("5.00")
    }
    if (e.target.value === "posters") {
      setPrice("7.15")
    }
    if (e.target.value === "flayer") {
      setPrice("0.12")
    }
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "doubleSide") {
      if (checked) {
        const newPrice = parseFloat(price) * 2
        setPrice(`${newPrice}`)
      } else {
        const newPrice = parseFloat(price) / 2
        setPrice(`${newPrice}`)
      }
    }


  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData)
    const parsedData = {
      ...formData,
      getEmail: formData.getEmail ? "Yes" : "No",
      doubleSide: formData.doubleSide ? "Yes" : "No",
      type: type
    }

    const response = await fetch("/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsedData }),
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-16">
    <form
      onSubmit={handleSubmit}
      className="bg-[#0f172a] text-white p-6 rounded-xl max-w-xl mx-auto shadow-lg"
    >
      <Typography variant="h5" className="mb-4 text-slate-200">
        Order Form
      </Typography>

      <TextField
        name="name"
        label="Name"
        fullWidth
        variant="outlined"
        margin="normal"
        value={formData.name}
        onChange={handleChange}
        InputLabelProps={{ className: "text-slate-300" }}
        InputProps={{ className: "text-white" }}
      />
      <TextField
        name="lastname"
        label="Lastname"
        fullWidth
        variant="outlined"
        margin="normal"
        value={formData.lastname}
        onChange={handleChange}
        InputLabelProps={{ className: "text-slate-300" }}
        InputProps={{ className: "text-white" }}
      />
      <TextField
        name="email"
        label="Email"
        fullWidth
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ className: "text-slate-300" }}
        InputProps={{ className: "text-white" }}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel className="text-slate-300">Product Type</InputLabel>
        <Select
          value={type}
          onChange={handleSelect}
          label="Product Type"
        >
          {formOptions.type.map((op) => (
            <MenuItem key={op.value} value={op.value}>
              {op.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {(type === "postCard" || type === "posters" || type === "flayer") && (
        <>
          <FormControl component="fieldset" margin="normal">
            <Typography className="text-slate-300 pl-2">Size</Typography>
            <RadioGroup
              row
              name="size"
              className="pl-2"
              value={formData.size}
              onChange={handleChange}
            >
              {formOptions[type]?.size.map((d: any) => (
                <FormControlLabel
                  key={d}
                  value={d}
                  control={<Radio />}
                  label={d}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel className="text-slate-300">Material</InputLabel>
            <Select
              name="material"
              value={formData.material}
              onChange={handleChange}
              label="Material"
            >
              {formOptions[type]?.materials.map((m: any) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}

      {type === "flayer" && (
        <FormControlLabel
          className="pl-2"
          control={
            <Checkbox
              name="doubleSide"
              checked={formData.doubleSide}
              onChange={handleChange}
            />
          }
          label="Double-sided"
        />
      )}

      <TextareaAutosize
        name="comment"
        placeholder="Comment (200 characters max.)"
        value={formData.comment}
        onChange={handleChange}
        maxLength={200}
        className="w-full p-3 mt-4 bg-slate-800 text-white rounded min-h-[100px]"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="getEmail"
            checked={formData.getEmail}
            onChange={handleChange}
          />
        }
        label="I would like to receive emails"
      />

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="contained"
          color="success"
          size="large"
          className="mt-4 bg-blue-700 px-8"
          onClick={() => setShowPrice(true)}
        >
          Calculate Price
        </Button>
        {showPrice && (
          <Box>
            <Typography>${price}</Typography>
          </Box>
        )}
        <Button type="submit" variant="contained" size="large" className="mt-4 bg-blue-700 px-8">
          Send
        </Button>
      </div>
    </form>
    </main>
  );
};

export default Form;
