// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import "./Homepage.css";
// import { getCharacterList } from "../actions";
// import _ from "lodash";
// import { Link } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import DelDialogue from "./delDialogue";

// const HomePage = (props) => {
//   const loginstate = useSelector((state) => state.login__state);
//   const greeting = new Date().getHours();
//   const dispatch = useDispatch();
//   const charstate = useSelector((state) => state.char__state);
//   const [search, setsearch] = useState("");
//   const [sorting, setSorting] = useState("A-Z");
//   const [pageid, setPageid] = useState(1);

//   const [show, setShow] = useState(false);
//   const [title, setTitle] = useState("Title");
//   const [desc, setDesc] = useState("Description");
//   const [delName, setDelName] = useState("")
//   const perpage = 12;
//   let charlist = Object.values(charstate.data);

//   React.useEffect(() => {
//     if (charlist.length === 0) dispatch(getCharacterList());
//   }, []);

//   function Ascendingcompare(a, b) {
//     if (a.name.toLowerCase() < b.name.toLowerCase()) {
//       return -1;
//     }
//     if (a.name.toLowerCase() > b.name.toLowerCase()) {
//       return 1;
//     }
//     return 0;
//   }

//   let Ascending_list = charlist.sort(Ascendingcompare);
//   const logouthandler = () => {
//     props.history.push("/login");
//     dispatch({
//       type: "logout__done",
//     });
//   };

//   const ShowData = (finallist) => {
//     if (!_.isEmpty(finallist)) {
//       let temp = finallist;
//       let finalised = sorting === "A-Z" ? finallist : temp.reverse();
//       return (
//         <div className={"list-wrapper"}>
//           <div className={"Headings"}>
//             <span className={"Name"}>Name of Character</span>
//             <span className={"Details"}>Details</span>
//           </div>

//           {finalised
//             .slice((pageid - 1) * perpage, pageid * perpage)
//             .map((e0) => {
//               return (
//                 <div key={e0.id} className={"person-item"}>
//                   <p>{e0.name}</p>
//                   <div className="detailsdelete">
//                     <Link to={`/char/${e0.name}`}>Details</Link>
//                     <button
//                       className="del_btn"
//                       onClick={() => {
//                         setShow(!show);
//                         setDelName(e0.name)
//                       }}
//                     >
//                       Delete{" "}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           <ReactPaginate
//             pageCount={finallist.length / perpage}
//             pageRangeDisplayed={2}
//             marginPagesDisplayed={1}
//             initialPage={0}
//             onPageChange={(pageIndex) => {
//               setPageid(pageIndex.selected + 1);
//             }}
//             containerClassName={"pagination"}
//           />
//         </div>
//       );
//     }
//     if (charstate.errorMsg !== "") {
//       return <p>{charstate.errorMsg}</p>;
//     }
//     if (charstate.loading) {
//       return <p>......loading......</p>;
//     }
//     return <span className={"nochar"}>No Such Character Available</span>;
//   };

//   return (
//     <div className="HomePage">
//       <nav>
//         <div className="rightnav">
//           <NavLink to={"/episodes"}>Episodes</NavLink>
//           <NavLink to={"/addchar"}>Add Character</NavLink>
//           <button onClick={() => logouthandler()}>Logout</button>
//         </div>
//       </nav>

//       <div className="Namebar">
//         Welcome {loginstate.data.name}!<br></br>
//         <div className="greeting">
//           {greeting >= 12
//             ? greeting >= 16
//               ? "Good Evening"
//               : "Good Afternoon"
//             : "Good Morning"}
//         </div>
//       </div>

//       {/* Search Wrapper */}
//       <div className="search-wrapper">
//         <input
//           type="text"
//           placeholder={"Search name"}
//           onChange={(e) => setsearch(e.target.value)}
//         ></input>
//       </div>

//       {/* Sorting */}
//       <div className="sortlabel">
//         <label>Sort :</label>
//         <select onChange={(e) => setSorting(e.target.value)}>
//           <option value="A-Z">A-Z</option>
//           <option value="Z-A">Z-A</option>
//         </select>
//       </div>

//       {/* Show Data */}
//       {ShowData(
//         Ascending_list.filter((val) => {
//           if (search === "") {
//             return val;
//           } else if (
//             val.name.toLowerCase().includes(search.toLocaleLowerCase())
//           ) {
//             return val;
//           }
//         })
//       )}  

//       <DelDialogue
//         show={show}
//         title={"Are you sure you want to delete this item?"}
//         description={"You will not be able to access this character details anymore!!"}
//         setShow={setShow}
//         name = {delName}
//       ></DelDialogue>
//     </div>
//   );
// };

// export default HomePage;
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Homepage.css";
import { getCharacterList } from "../actions";
import _ from "lodash";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import DelDialogue from "./delDialogue";
const configs = require("../configs.json");

const HomePage = (props) => {
  const perpage = configs.elements_per_page;
  const loginstate = useSelector((state) => state.login__state);
  const greeting = new Date().getHours();
  const dispatch = useDispatch();
  const charstate = useSelector((state) => state.char__state);
  const [search, setsearch] = useState("");
  const [pageid, setPageid] = useState(1);

  const [show, setShow] = useState(false);
  const [delName, setDelName] = useState("");

  const [species, setSpecies] = useState(charstate.species_dropdown);
  const [status, setStatus] = useState(charstate.status_dropdown);

  const [sorting, setSorting] = useState(charstate.sort_checkbox);

  let charlist = Object.values(charstate.data);
  React.useEffect(() => {
    if (charlist.length === 0) dispatch(getCharacterList());
  }, []);

  function Ascendingcompare(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }
  let Ascending_list = charlist.sort(Ascendingcompare);
  const logouthandler = () => {
    dispatch({
      type: "logout"
    });
    props.history.push("/login");
    dispatch({
      type: "logout__done",
    });
  };
  const ShowData = (finallist) => {
    if (!_.isEmpty(finallist)) {
      let temp = finallist;

      if (species === "alien") {
        finallist = finallist.filter((val) => {
          if (val.species.toLowerCase() === "alien") return val;
          else return false;
        });
      } else if (species === "human") {
        finallist = finallist.filter((val) => {
          if (val.species.toLowerCase() === "human") return val;
          else return false;
        });
      }

      if (status === "alive") {
        finallist = finallist.filter((val) => {
          if (val.status.toLowerCase() === "alive") return val;
          else return false;
        });
      } else if (status === "dead") {
        finallist = finallist.filter((val) => {
          if (val.status.toLowerCase() === "dead") return val;
          else return false;
        });
      }

      let finalised = sorting === "A-Z" ? finallist : temp.reverse();
      return (
        <div className="listbox">
          <div className={"list-wrapper"}>
            <div className={"Headings"}>
              <span className={"Name"}>Name of Character</span>
              <span className={"Details"}>Operations</span>
            </div>

            {finalised
              .slice((pageid - 1) * perpage, pageid * perpage)
              .map((e0) => {
                return (
                  <div key={e0.id} className={"person-item"}>
                    <p>{e0.name}</p>
                    <div className="detailsdelete">
                      <Link to={`/char/${e0.name}`}>Details</Link>
                      <button
                        className="del_btn"
                        onClick={() => {
                          setShow(!show);
                          setDelName(e0.name);
                        }}
                      >
                        Delete{" "}
                      </button>
                    </div>
                  </div>
                );
              })}
            <ReactPaginate
              pageCount={finallist.length / perpage}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              initialPage={0}
              onPageChange={(pageIndex) => {
                setPageid(pageIndex.selected + 1);
              }}
              containerClassName={"pagination"}
            />
          </div>
          <div className="filter">
            {/* human||alien */}
            <label>Species</label>
            <select
              value={species}
              onChange={(e) => {
                setSpecies(e.target.value);
                dispatch({
                  type: "filterUpdate",
                  payload: {
                    species: e.target.value,
                    status:status,
                    sort: sorting,
                  },
                });
              }}
            >
              <option value="human">human</option>
              <option value="alien">alien</option>
              <option value="all">all</option>
            </select>

            <label>Status</label>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                dispatch({
                  type: "filterUpdate",
                  payload: {
                    species:species,
                    status: e.target.value,
                    sort: sorting,
                  },
                });
              }}
            >
              <option value="all">all</option>
              <option value="alive">alive</option>
              <option value="dead">dead</option>
            </select>
          </div>
        </div>
      );
    }
    if (charstate.errorMsg !== "") {
      return <p>{charstate.errorMsg}</p>;
    }
    if (charstate.loading) {
      return <p>......loading......</p>;
    }
    return <span className={"nochar"}>No Such Character Available</span>;
  };

  return (
    <div className="HomePage">
      <nav>
        <div className="rightnav">
          <NavLink to={"/episodes"}>Episodes</NavLink>
          <NavLink to={"/addchar"}>Add Character</NavLink>
          <button onClick={() => logouthandler()}>Logout</button>
        </div>
      </nav>

      <div className="Namebar">
        Welcome {loginstate.data.name}!<br></br>
        <div className="greeting">
          {greeting >= 12
            ? greeting >= 16
              ? "Good Evening"
              : "Good Afternoon"
            : "Good Morning"}
        </div>
      </div>

      {/* Search Wrapper */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder={"Search name"}
          onChange={(e) => setsearch(e.target.value)}
        ></input>
      </div>

      {/* Sorting */}
      <div className="sortlabel">
        <label>Sort by : </label>
        <select
          value={sorting}
          onChange={(e) => {
            setSorting(e.target.value);
            dispatch({
              type: "filterUpdate",
              payload: {
                species:species,
                status:status,
                sort: e.target.value,
              },
            });
          }}
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      {/* Show Data */}
      {ShowData(
        Ascending_list.filter((val) => {
          if (search === "") {
            return val;
          } else if (
            val.name.toLowerCase().includes(search.toLocaleLowerCase())
          ) {
            return val;
          }
          return false;
        })
      )}

      <DelDialogue
        show={show}
        title={"Delete this item"}
        description={"you will not be able to access this anymore"}
        setShow={setShow}
        name={delName}
      ></DelDialogue>
    </div>
  );
};

export default HomePage;
