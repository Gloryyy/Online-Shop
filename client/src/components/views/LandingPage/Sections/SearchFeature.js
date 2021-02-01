import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerms, setSearchTerms] = useState("");

  const handleOnChange = (e) => {
    setSearchTerms(e.target.value);
    props.refreshFunction(e.target.value);
  };

  return (
    <div>
      <Search
        value={SearchTerms}
        onChange={handleOnChange}
        placeholder="Search By Typing..."
      />
    </div>
  );
}

export default SearchFeature;
