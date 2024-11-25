import type { CountrySelectOption } from "./country-select";
import { loadData, type Data } from "./data-loader";

export async function loadOptions(
  valueType: "code" | "name" | "dialCode" | "record" = "code",
): Promise<CountrySelectOption[]> {
  let data = await loadData();
  if (valueType === "dialCode") {
    data = data.filter((item) => !!item.dialCode);
  }
  return data.map((item) => {
    let value: string | Data = item.code;
    if (valueType === "name") {
      value = item.name;
    } else if (valueType === "dialCode") {
      value = item.dialCode!;
    } else if (valueType === "record") {
      value = item;
    }
    return {
      value: value,
      label: (
        <div className="country-select-option" title={item.name}>
          <span className="country-select-option-icon">{item.emoji}</span>
          <span className="country-select-option-label">{item.name}</span>
        </div>
      ),
      data: item,
    };
  });
}
