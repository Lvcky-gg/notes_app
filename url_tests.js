fetch("http://localhost:8000/csrf/", {
  method: "GET",
  credentials: "include",
})
  .then(() => {
    console.log("CSRF cookie set");
  })
  .catch((err) => console.error(err));

fetch("http://localhost:8000/notes/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": "fsVPAlN2IPPCpaVKTFDPXQvd7jGBUBTW",
  },
  body: JSON.stringify({
    title: "Test Title",
    content: "Test Content",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("Success:", data))
  .catch((error) => console.error("Error:", error));

fetch("http://localhost:8000/notes/1", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => console.log("Success:", data))
  .catch((error) => console.error("Error:", error));

fetch("http://localhost:8000/notes/2/", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Updated Title",
    content: "Updated Content",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("Success:", data))
  .catch((error) => console.error("Error:", error));

fetch("http://localhost:8000/notes/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => console.log("Success:", data))
  .catch((error) => console.error("Error:", error));
