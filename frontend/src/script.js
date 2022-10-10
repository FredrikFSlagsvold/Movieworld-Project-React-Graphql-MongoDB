fetch("http://localhost:3001/user", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        query:`
        {
            Users{
              id
              firstName
              lastName
            }
          }
        `
    })
})
.then(res => res.json())
.then(data => {
    console.log("hallo", data.data)
})