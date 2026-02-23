import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const FilterInput = ({ value, onChange, placeholder = "Filter by ID, Service Order, Car ID..." }: FilterInputProps) => {
  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
        },
      }}
      sx={{ minWidth: 300, maxWidth: 400 }}
    />
  );
};

export default FilterInput;
