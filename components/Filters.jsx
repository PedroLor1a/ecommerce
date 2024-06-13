"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("filter", term);
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mx-10">
      <select
        className="text-black "
        onChange={(e) => {
          handleFilter(e.target.value);
        }}>
        <option
          value="ALL"
          defaultValue={searchParams.get("query")?.toString()}>
          Filter by Price
        </option>
        <option
          value="DESC"
          defaultValue={searchParams.get("query")?.toString()}>
          Desc
        </option>
        <option
          value="ASC"
          defaultValue={searchParams.get("query")?.toString()}>
          Asc
        </option>
      </select>
    </div>
  );
};

export default Filters;
