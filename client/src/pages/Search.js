import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../utils/API";
// import Wrapper from "../Wrapper";
// import { BookList, BookListItem } from "./components/BookList";
import { Container, Row, Col } from "../components/Grid";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import "./style.css";

function Search() {

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
    <div>
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
    </div>
    // <div className="jumbotron text-center">
    //   <h1>(React) Google Books Search</h1>
    //   <h3>Search for and Save Books of Interest</h3>
    //   {/* <a target="_blank" rel="noopener noreferrer" href="http://www.recipepuppy.com/about/api/">
    //     Powered by Recipe Puppy
    //   </a> */}
    // </div>
  );
}

export default Search;
