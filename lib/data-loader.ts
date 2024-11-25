export type Data = {
  code: string;
  emoji: string;
  name: string;
  dialCode?: string | null;
};

export async function loadData(): Promise<Data[]> {
  const module = await import("./data.json");
  return module.default;
}
