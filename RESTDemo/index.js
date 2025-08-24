const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method"));

// Tell Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Fake Database using array
let comments = [
  {
    id: uuidv4(),
    username: "Todd",
    comment: "this is Todd",
  },
  {
    id: uuidv4(),
    username: "David",
    comment: "this is David",
  },
  {
    id: uuidv4(),
    username: "Tuan",
    comment: "Hello this is Tuan",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments }); // now Express can find views/comments/index.ejs
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new"); // Express looks at views/comments/new.ejs
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuidv4() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newComment;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  const foundComment = comments.find((c) => c.id === id);
  comments = comments.filter((c) => c.id !== id);
  res.redirect('/comments');
});

app.listen(3000, () => {
  console.log("ON PORT 3000!");
});

// Name	    Path			    Verb	Purpose
// Index	/comments 		    GET	    Display all comments
// New	    /comments/new		GET	    Form to create new comment
// Create	/comments		    POST	Creates new comment on server
// Show	    /comments/:id		GET	    Details for one specific comment
// Edit	    /comments/:id/edit	GET	    Form to edit specific comment
// Update	/comments/:id		PATCH	Updates specific comment on server
// Destroy  /comments/:id		DELETE	Deletes specific item on server
