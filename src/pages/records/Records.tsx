import { useEffect, useState } from "react";
import "./Records.scss";
import LoadingBar from "@/components/LoadingBar/LoadingBar";
import DataTable from "@/components/dataTable/DataTable";
import { RootState } from "@/interface/general";
import { useSelector } from "react-redux";

const Records = () => {
  const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(true);
  const [tableLoader, setTableLoader] = useState(false);
  // const [dynamicData, setDynamicData] = useState(initialData) // this guy will be used for search operations
  const initialData = useSelector((state: RootState) => {
    return state.auth_reducer.DBdata;
  });

  const column = [
    {
      col2: "Title",
      col3: "Surname",
      col4: "FirstName",
      col5: "Email",
      col6: "Phone Number",
      col7: "Sales",
      col8: "Purchases",
      col9: "Total",
    },
  ];

  useEffect(() => {
    setTableLoader(true);
    setTimeout(() => {
      setTableLoader(false);
    }, 1500);
  }, []);

  return (
    <div className="admin-records">
      <div className="records-header">
        <div className="svgs-container">
          <span className="header-icons">
            <img src="/svg/fields.svg" alt="" />
            Fields
          </span>
          <span className="header-icons">
            <img src="/svg/filter.svg" alt="" />
            Filter
          </span>
          <span className="header-icons">
            <img src="/svg/sort.svg" alt="" />
            Sort
          </span>
          <span className="header-icons">
            <img src="/svg/ellipsis.svg" alt="" />
          </span>
        </div>
        <div className="search-button">
          <img src="/svg/search.svg" alt="" />
          <input
            type="text"
            placeholder="Search User"
            name="username"
            id="username"
            autoFocus
            autoComplete="off"
          />
        </div>
      </div>
      {/* INTRODUCTION HEADER */}
      {isInfoBoxOpen && (
        <div className="records-info">
          <p>
            You can easily edit, store, and modify records within spreadsheets.
            Effortlessly update data, track changes, and manage entries in real
            time. Your spreadsheets are securely stored, accessible anytime, and
            fully customizable to meet your needs, ensuring smooth and efficient
            data management. If there is no data found, proceed to the Add Data
            Section.
          </p>
          <button onClick={() => setIsInfoBoxOpen(false)}>Okay, got it!</button>
        </div>
      )}

      {/* <DataTable /> */}
      <div className="recordsTable">
        {tableLoader ? (
          <LoadingBar height="200px" />
        ) : (
          <DataTable column={column} rows={initialData} />
        )}
      </div>
    </div>
  );
};

export default Records;
