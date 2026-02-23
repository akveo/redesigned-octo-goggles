import { Chip } from "@mui/material";
import { useMemo } from "react";
import { type ServiceType } from "../../types";

interface ServiceTypeChipProps {
  type: ServiceType;
}

const ServiceTypeChip = ({ type }: ServiceTypeChipProps) => {
  const color = useMemo(() => {
    switch (type) {
      case "maintenance":
        return "primary";
      case "repair":
        return "error";
      case "inspection":
        return "info";
      case "other":
      default:
        return "default";
    }
  }, [type]);
  return (
    <Chip
      label={type.charAt(0).toUpperCase() + type.slice(1)}
      color={color}
      size="small"
    />
  );
};

export default ServiceTypeChip;
