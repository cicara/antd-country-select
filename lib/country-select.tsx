import "./style.scss";

import { Select, Spin, type SelectProps } from "antd";
import {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
} from "react";
import type { Data } from "./data-loader";
import { loadOptions } from "./options-loader";

export type CountrySelect<ValueType = any> = ForwardRefExoticComponent<
  CountrySelectProps<ValueType> & RefAttributes<any>
>;
export type CountrySelectOption<ValueType = any> = {
  data: Data;
  label: ReactNode;
  value: ValueType;
};
export type CountrySelectProps<ValueType = any> = {
  valueType?: "code" | "name" | "dialCode" | "record";
  onLoadError?: (err: unknown) => void;
} & Omit<SelectProps<ValueType>, "options" | "loading" | "filterOption" | "notFoundContent">;

const loadingNode = (
  <div style={{ textAlign: "center" }}>
    <Spin size="small" />
  </div>
);

export const CountrySelect = forwardRef<any, CountrySelectProps>((props, ref) => {
  const { valueType, onLoadError, onDropdownVisibleChange, ...selectProps } = props;

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<CountrySelectOption[]>([]);

  const handleDropdownVisibleChange = useCallback(
    async (open: boolean) => {
      onDropdownVisibleChange?.(open);
      if (open && !loaded && !loading) {
        try {
          setLoading(true);
          const options = await loadOptions(valueType);
          setOptions(options);
          setLoaded(true);
        } catch (err) {
          onLoadError?.(err);
        } finally {
          setLoading(false);
        }
      }
    },
    [loaded, loading, onDropdownVisibleChange, onLoadError, valueType]
  );

  const handleFilter = useMemo(
    () => (inputValue: string, option: any) => {
      const data = option.data as Data;
      return `${data.code} ${data.name}`.toLowerCase().includes(inputValue.toLowerCase());
    },
    []
  );

  return (
    <Select
      {...selectProps}
      ref={ref}
      loading={loading}
      options={options}
      filterOption={handleFilter}
      notFoundContent={loading ? loadingNode : undefined}
      onDropdownVisibleChange={handleDropdownVisibleChange}
    />
  );
});

CountrySelect.displayName = "CountrySelect";
