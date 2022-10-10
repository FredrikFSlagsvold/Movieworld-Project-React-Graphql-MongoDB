import React, { useState } from 'react';

type Shows = [{
  id: String,
  title: String,
  type: String
}]

function App() {
  const [shows, setShows] = useState<Shows>();

  fetch("http://localhost:3001/user", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        query:`
        {
          Users{
            id
            title
            type
          }
        }
        `
    })
})
.then(res => res.json())
.then(data => {
  setShows(data.data.Users)
})
  return (
    <table>
      <thead>Nicolai Opplæring</thead>
      <tbody>
      {shows?.map((show) => {
        return(
        <tr>
          <td>{show.title}</td>
        </tr>  )      
      })}
      </tbody>
    </table>
  );
}

export default App;
