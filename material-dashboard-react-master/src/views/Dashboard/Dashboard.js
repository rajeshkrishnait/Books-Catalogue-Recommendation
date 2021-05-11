import React from "react";
// react plugin for creating charts
//import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import Regis from '../Dashboard/Recommendation.js';
import Search from "@material-ui/icons/Search";
// core components
// import CustomInput from "components/CustomInput/CustomInput.js";
// import FormControl from "@material-ui/core/FormControl";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Accessibility from "@material-ui/icons/Accessibility";
//import BugReport from "@material-ui/icons/BugReport";
//import Code from "@material-ui/icons/Code";
//import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
//import Tasks from "components/Tasks/Tasks.js";
//import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import UserProfile from 'layouts/UserProfile.js'
//import { bugs, website, server } from "variables/general.js";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart,
// } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  // const [readMore, setReadMore] = useState(false);
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApi] = useState("AIzaSyAgSHBFJnBtmr1iIFMtslpoJPtZKJKhq2Q");
  const [booki, setBookid] = useState("");
  const [thumb, setBookt] = useState("");
  const [bookname, setBookn] = useState("");
  const [bookauthor, setBooka] = useState("");
  const [bookdes, setBookd] = useState("");
  function addHandle(e) {
    e.preventDefault();
    const book = e.currentTarget.getAttribute("data-key");
    setBookn(book);
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          apiKey +
          "&maxResults=1"
      )
      .then((data) => {
        console.log(data);
        const bookid=(data.data.items.[0].id);
        const bookdes=(data.data.items.[0].volumeInfo.description);
        const bookauthor=(data.data.items.[0].volumeInfo.authors);
        const bookthumb=(data.data.items.[0].volumeInfo.imageLinks.smallThumbnail);
        //console.log(booktumbnail);

        axios.post("http://localhost:3001/api/insert", { id:localStorage.getItem('userEmail'),bookid:bookid,bookname: book,bookd:bookdes,bookauthor:bookauthor,booktumbnail:bookthumb }).then((data) => {
      alert("added!");
    });
      });
     //console.log(book);
    
    
  }
  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(book);
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          apiKey +
          "&maxResults=40"
      )
      .then((data) => {
        console.log(data);
        setResult(data.data.items);
      //  console.log(data.data.items.[0].volumeInfo.industryIdentifiers.[1])
      });
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={12}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="success">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>SEARCH FOR BOOKS</p>
              <h3 className={classes.cardTitle}>
                A Lot Of BOOKs,{localStorage.getItem('userName')}! <small></small>
              </h3>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="standard-basic"
                  label="Standard"
                  onChange={handleChange}
                />
                <Button type="submit" color="danger" aria-label="edit" round>
                  <Search />
                </Button>
                <Button type="Button" color="primary">
                  Filters
                </Button>
              </form>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Search For Books
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        {result.map((book) => (
          <GridItem xs={12} sm={6} md={6} key={book.id}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <img
                    radius="2px"
                    height="150px"
                    width="120px"
                    src={
                      book.volumeInfo.imageLinks === undefined
                        ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAM1BMVEXp7vG6vsHs8fS3u77Fycy+wsXc4eTX3N/h5unT2NrHzM7N0tW1ubzu8/W7v8LBxcjl6uwx8f6JAAADy0lEQVR4nO2c23aDIBBFCQheUf//a6vRpEZuJgXj0LNXH7oaK3WXwXEQGAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwGnw9Hz7Et+Ds1ElpxoJaeGsHHqRHlkoKlJ0JbvbKQhRjCSs8FKcY+RuRVKQwqsTlUxShm9f8BGGU53cuvryHeXUyLnTj9++5hC8WJ2kv+2sTkR79Y4y9uuf2papKVYnxcWd8GpV0uj0aaxcnFx9lH04ESeMfLpZ2pLJW/obZzrhcGK2BSdmW3BitkXdyfxYz7mO2hZtJ7yqCznIoVUsXv8h7YSPzZJ2CtENZTQplJ1Mj0CbZ6CuiFUdI+yEt69PhUJGih+6Tni5L7qJJlJbZJ2MZu1A1FHuP2Sd7CPnTh+nLapOKtNIrIyOqhNe28puYvjXThp7KfKAE16FDqDqxF6x7sI1VK26wFCcmRMR6gOTEhG6P+XmJNRPtJrruqL0SSHrxD6ehJxwtZS6vVLIOrFP9wTuO1o95XnCh6qTj/ITrsSRQ8k6Ydbg8YYOV9tDhbO4QNaJbUrd301elXikkHUyZbLGc7F34m4bOI9z2ccUuk6Ybl+liMFXP9GGEme/IuxkfubZXKcofL+vVW8ocYUPZSfThRbdYkUIWftKj3YljjyFtBPGtWplL259UzJfZmoLHPeYQtvJMr0zjsxfnnYrsY4p1J0c+l1H4DzOaByfv5N9XhLsKfk7MfOSkJTsnYSVGANt7k50IHBsZ83ciSsv8faUjJxw821w303YLSUfJ7q+VbvPjit5eRs2Gyfzw0//usTkaODsz5yLk6mXTPTbnhLKS5xSMnGyKJnnMn4j4I3AWeie9e8cnGxmSh/h876S55CShZNtEX8Nn3eG1xyd6Nf59FnKsVQtXyf7qR5R6U96SU5OLG9dVB8pyceJbUJQvpOX5OdElx9dfs5OdMxVgnk4ibtwMgsnvI5oJA8nMceSTJxEHUvycBJ/ETZ5JwnWpZN3Yn1n+H874RJODr4LCidwAic74MQETkzgxAROTODEBE5MzDy2i763VEfcCVOlmr+UMr8J/8DxybpIjKyTlG3BidkWnJhtwYnZFpyYbcGJ2VZBwwkb18SqV6lb4usUyeX3NmTrJozzvy81j7S2Sd8l/4a27XeSFHH5jbqfG4OexvVDx7HjSTqu300Y+91p+BS6NuregKnQjn1gEiBCe6RcBl7K6AUCO0VFRMm89EK1RXKatoq4e+QJJN+N+r4jNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzuIHpk8/wVCHmdcAAAAASUVORK5CYII="
                        : book.volumeInfo.imageLinks.smallThumbnail
                    }
                  />
                </CardIcon>
                <p className={classes.cardCategory}> {book.volumeInfo.title}</p>
                <h6 className={classes.cardTitle}>
                  {" "}
                  {book.volumeInfo.description === undefined
                    ? "Unknown"
                    : book.volumeInfo.description}
                </h6>
              </CardHeader>
              <CardBody>
               
                <Regis Book_id={book.volumeInfo.industryIdentifiers.[0].identifier}/>
              </CardBody>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  {book.volumeInfo.authors === undefined
                    ? "Unknown"
                    : book.volumeInfo.authors}
                  {book.volumeInfo.authors === undefined
                    ? "Unknown"
                    : book.volumeInfo.averageRating}
                  {book.volumeInfo.categories === undefined
                    ? "Unknown"
                    : book.volumeInfo.categories}

                  {book.volumeInfo.publishedDate === undefined
                    ? "Unknown"
                    : book.volumeInfo.publishedDates}
                  {book.volumeInfo.pageCount === undefined
                    ? "Unknown"
                    : book.volumeInfo.pageCount}
                  {book.volumeInfo.subtitle === undefined
                    ? "Unknown"
                    : book.volumeInfo.subtitle}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
        
      </GridContainer>
    </div>
  );
}
