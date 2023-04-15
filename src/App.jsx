import { useState } from "react";
import data from "./animals.json";
console.log(data);

function cleanData() {
  return data.map((animal) => {
    const [name, , trait, type] = animal.fullname.split(" ");
    return {
      name: name,
      trait: trait,
      type: type,
      age: animal.age,
    };
  });
}

function App() {
  const animals = cleanData();

  const [filter, setFilter] = useState("");

  const [sortKey, setSortKey] = useState("");

  const [sortDirection, setSortDirection] = useState("ASC");

  let filteredAnimals = [...animals];

  if (filter) {
    filteredAnimals = filteredAnimals.filter((ani) => ani.type === filter);
  }

  if (sortKey) {
    filteredAnimals.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return sortDirection === "ASC" ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return sortDirection === "ASC" ? 1 : -1;
      }
      return 0;
    });
  }

  function setSorting(key) {
    if (key === sortKey) {
      setSortDirection((prevState) => (prevState === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortDirection("ASC");
    }
    setSortKey(key);
  }

  return (
    <div className="App">
      <h1>Mini Animal Base</h1>
      <button onClick={() => setFilter("cat")}>Only cats</button>
      <button onClick={() => setFilter("dog")}>Only dogs</button>
      <button onClick={() => setFilter("")}>All animals</button>
      <table>
        <thead>
          <tr>
            <td onClick={() => setSorting("name")}>
              Name {sortKey === "name" && (sortDirection === "ASC" ? "↑" : "↓")}
            </td>
            <td onClick={() => setSorting("trait")}>
              Trait{" "}
              {sortKey === "trait" && (sortDirection === "ASC" ? "↑" : "↓")}
            </td>
            <td onClick={() => setSorting("type")}>
              Type {sortKey === "type" && (sortDirection === "ASC" ? "↑" : "↓")}
            </td>
            <td onClick={() => setSorting("age")}>
              Age {sortKey === "age" && (sortDirection === "ASC" ? "↑" : "↓")}
            </td>
          </tr>
        </thead>

        <tbody>
          {filteredAnimals.map((animal) => (
            <tr key={animal.name}>
              <td>{animal.name}</td>
              <td>{animal.trait}</td>
              <td>{animal.type}</td>
              <td>{animal.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
