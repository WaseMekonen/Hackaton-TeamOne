import React from "react";
import styles from './searchBar.module.css'

export default function SearchBar({
  setSearch,
  getLines,
  setDetails,
  lines,
  search,
  setRedirectToDetails,
}) {
  return (
    <div className={styles.container} >
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(Number(e.target.value))}
      />
      <div>
        {lines
          .filter((line) => {
            return line.busLine === search;
          })
          .map((line, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setRedirectToDetails(true);
                  let choosenLine = lines.find((line) => {
                    return line.busLine === search;
                  });
                  console.log({choosenLine});
                  setDetails(choosenLine);
                }}
              >
                <p>{line.busLine}</p>
                <p>{line.start}</p>
                <p>{line.end}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
