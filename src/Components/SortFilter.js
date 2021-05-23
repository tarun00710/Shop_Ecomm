import React,{useState} from "react";
import { useSortFilter } from "../Context/SortFilerContext";

const SortFilter = () => {
  const [checked,setChecked]=useState(false);
  const { dispatch } = useSortFilter();
  console.log(checked);
  return (
    <div className="Options">
      <div className="Sort">
        <strong>Sort By:</strong>
        <input
          onClick={() =>
            dispatch({ type: "HIGH_TO_LOW", payload: "HightoLow" })
          }
          name="sort"
          type="radio"
        ></input>
        <label>High to Low</label>
        <input
          onClick={() =>
            dispatch({ type: "LOW_TO_HIGH", payload: "LowtoHigh" })
          }
          name="sort"
          type="radio"
        ></input>
        <label>Low to High</label>
      </div>
      <div className="Filter">
        <strong>Filter By:</strong>
        <input
          onClick={() => dispatch({ type: "INSTOCK", payload: "Instock" })}
          name="filter"
          type="radio"
        ></input>
        <label>InStock</label>
        <input
          onClick={() => dispatch({ type: "OUTSTOCK", payload: "Outofstock" })}
          name="filter"
          type="radio"
        ></input>
        <label>Out of Stock</label>
        <input
          onClick={(e) => {
            console.log(checked);
            setChecked(e.target.checked)
            return checked?dispatch({ type: "DELIVERY", payload: "delivery" }):dispatch({ type: "FASTDELIVERY", payload: "fastdelivery" })
          }}
          name="filter2"
          type="checkbox"
        ></input>
        <label>Fast delivery</label>
      </div>
    </div>
  );
};
export default SortFilter;
