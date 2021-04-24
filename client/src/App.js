import React, { useState } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
import Wrapper from "./components/Wrapper";
import { BookList, BookListItem } from "./components/BookList";
import { Container, Row, Col } from "./components/Grid";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {

  const [recipes, setRecipes] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState("");

  const handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { value } = event.target;
    setRecipeSearch(value);
  };

  const handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.getRecipes(recipeSearch)
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  };

  return (
    <Router>
      <div>
        <Nav />
          <Jumbotron />
          <Wrapper>
            <Route exact path = "/" />
            <Route exact path = "/saved" />
              <Container>
                <Row>
                  <Col size="md-12">
                    <form>
                      <Container>
                        <Row>
                          <Col size="xs-9 sm-10">
                            <Input
                              name="RecipeSearch"
                              value={recipeSearch}
                              onChange={handleInputChange}
                              placeholder="Search For a Book"
                            />
                          </Col>
                          <Col size="xs-3 sm-2">
                            <Button
                              onClick={handleFormSubmit}
                              type="success"
                              className="input-lg"
                            >
                                Search
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </form>
                  </Col>
                </Row>
                <Row>
                  <Col size="xs-12">
                    {!recipes.length ? (
                      <h1 className="text-center">No Books to Display</h1>
                    ) : (
                      <BookList>
                        {recipes.map(recipe => {
                          return (
                            <BookListItem
                              key={recipe.title}
                              title={recipe.title}
                              href={recipe.href}
                              ingredients={recipe.ingredients}
                              thumbnail={recipe.thumbnail}
                            />
                          );
                        })}
                      </BookList>
                    )}
                  </Col>
                </Row>
              </Container>
        </Wrapper>
      </div>
    </Router>
  );
}

export default App;
